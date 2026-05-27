const Bid = require('../models/Bid');
const Project = require('../models/Project');
const Order = require('../models/Order');
const Wallet = require('../models/Wallet');

// @desc    Place a bid on a project
// @route   POST /api/bids
const placeBid = async (req, res) => {
    try {
        const { projectId, amount, message } = req.body;

        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
        if (!project.biddingEnabled) return res.status(400).json({ success: false, message: 'Bidding is not enabled for this project.' });
        if (project.seller.toString() === req.user.id) return res.status(400).json({ success: false, message: 'Sellers cannot bid on their own projects.' });

        // Check if bid is higher than current highest
        const topBid = await Bid.findOne({ project: projectId, status: 'pending' }).sort({ amount: -1 });
        if (topBid && Number(amount) <= topBid.amount) {
            return res.status(400).json({ success: false, message: `Bid must be higher than current top bid of Rs ${topBid.amount.toLocaleString()}` });
        }

        const bid = await Bid.create({ project: projectId, buyer: req.user.id, amount: Number(amount), message });

        // Emit real-time event
        if (global.io) {
            global.io.to(`project_${projectId}`).emit('newBid', {
                bidder: req.user.name,
                amount: Number(amount),
                bidderId: req.user.id,
            });
        }

        res.status(201).json({ success: true, message: 'Bid placed successfully!', bid });
    } catch (error) {
        console.error('Place Bid Error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// @desc    Get all bids for a project (live)
// @route   GET /api/bids/:projectId
const getProjectBids = async (req, res) => {
    try {
        const bids = await Bid.find({ project: req.params.projectId })
            .populate('buyer', 'name username avatar')
            .sort({ amount: -1 });
        res.status(200).json({ success: true, bids });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// @desc    Get all bids on projects owned by the seller
// @route   GET /api/bids/seller/active
const getSellerBids = async (req, res) => {
    try {
        const sellerProjects = await Project.find({ seller: req.user.id }).select('_id');
        const projectIds = sellerProjects.map(p => p._id);

        const bids = await Bid.find({ project: { $in: projectIds }, status: 'pending' })
            .populate('buyer', 'name username avatar email')
            .populate('project', 'title price')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, bids });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// @desc    Respond to a bid (Accept/Reject)
// @route   PUT /api/bids/:id/respond
const respondToBid = async (req, res) => {
    try {
        const { status } = req.body; // 'accepted' or 'rejected'
        const bid = await Bid.findById(req.params.id).populate('project');

        if (!bid) return res.status(404).json({ success: false, message: 'Bid not found.' });
        if (bid.project.seller.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Not authorized.' });
        }

        if (status === 'rejected') {
            bid.status = 'rejected';
            await bid.save();
            return res.status(200).json({ success: true, message: 'Bid rejected.' });
        }

        if (status === 'accepted') {
            // 1. Check if buyer has enough balance
            const buyerWallet = await Wallet.findOne({ user: bid.buyer });
            const totalRequired = bid.amount + (bid.amount * 0.04); // bid + 4% buyer fee

            if (buyerWallet.balance < totalRequired) {
                return res.status(400).json({ success: false, message: "Buyer doesn't have enough balance for this bid." });
            }

            // 2. Accept this bid
            bid.status = 'accepted';
            await bid.save();

            // 3. Reject all other bids for this project
            await Bid.updateMany(
                { project: bid.project._id, _id: { $ne: bid._id } },
                { status: 'rejected' }
            );

            // 4. Create an Order
            const sellerFee = bid.amount * 0.07;
            const buyerFee = bid.amount * 0.04;

            const order = await Order.create({
                buyer: bid.buyer,
                seller: req.user.id,
                project: bid.project._id,
                amount: bid.amount,
                buyerFee,
                sellerFee,
                totalAmount: bid.amount + buyerFee,
                status: 'in-progress'
            });

            // 5. Update Project status
            await Project.findByIdAndUpdate(bid.project._id, { status: 'sold' });

            // 6. Hold funds in Escrow (Deduct from buyer)
            buyerWallet.balance -= (bid.amount + buyerFee);
            await buyerWallet.save();

            return res.status(200).json({ success: true, message: 'Bid accepted! Order has been created.', order });
        }

        res.status(400).json({ success: false, message: 'Invalid status.' });
    } catch (error) {
        console.error('Respond Bid Error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = { placeBid, getProjectBids, getSellerBids, respondToBid };
