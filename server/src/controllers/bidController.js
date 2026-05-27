const Bid = require('../models/Bid');
const Project = require('../models/Project');

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

        // Emit real-time event via global io instance (set in index.js)
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

module.exports = { placeBid, getProjectBids };
