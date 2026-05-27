const Order = require('../models/Order');
const Project = require('../models/Project');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const { calculatePaymentBreakdown } = require('../utils/paymentHelper');

// @desc    Create an order (Buy a project)
// @route   POST /api/orders
const createOrder = async (req, res) => {
    try {
        const { projectId } = req.body;

        const project = await Project.findById(projectId).populate('seller');
        if (!project || project.status !== 'active') {
            return res.status(404).json({ success: false, message: 'Project not found or unavailable.' });
        }
        if (project.seller._id.toString() === req.user.id) {
            return res.status(400).json({ success: false, message: 'You cannot buy your own project.' });
        }

        const breakdown = calculatePaymentBreakdown(project.price);
        const buyerWallet = await Wallet.findOne({ user: req.user.id });

        if (!buyerWallet || buyerWallet.balance < breakdown.totalBuyerPays) {
            return res.status(400).json({
                success: false,
                message: `Insufficient balance. You need Rs ${breakdown.totalBuyerPays.toLocaleString()} (includes 4% platform fee).`,
            });
        }

        // Deduct from buyer's wallet (escrow hold)
        buyerWallet.balance -= breakdown.totalBuyerPays;
        buyerWallet.withdrawableBalance -= breakdown.totalBuyerPays;
        await buyerWallet.save();

        // Create the order with escrow held
        const order = await Order.create({
            buyer: req.user.id,
            seller: project.seller._id,
            project: projectId,
            amount: breakdown.projectAmount,
            buyerFee: breakdown.buyerFee,
            sellerFee: breakdown.sellerFee,
            totalAmount: breakdown.totalBuyerPays,
            status: 'in-progress',
            escrowStatus: 'held',
        });

        // Log transactions
        await Transaction.create({ user: req.user.id, amount: breakdown.totalBuyerPays, type: 'payment_sent', order: order._id, status: 'completed', description: `Payment for: "${project.title}"` });

        res.status(201).json({
            success: true,
            message: 'Order placed! Funds held in escrow until delivery.',
            order,
            breakdown,
        });
    } catch (error) {
        console.error('Create Order Error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// @desc    Approve delivery & release payment
// @route   PUT /api/orders/:id/approve
const approveOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });
        if (order.buyer.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized.' });
        if (order.status !== 'delivered') return res.status(400).json({ success: false, message: 'Order has not been delivered yet.' });

        const breakdown = calculatePaymentBreakdown(order.amount);

        // Credit seller wallet
        const sellerWallet = await Wallet.findOne({ user: order.seller });
        sellerWallet.balance += breakdown.sellerReceives;
        sellerWallet.withdrawableBalance += breakdown.sellerReceives;
        await sellerWallet.save();

        // Credit admin wallet (find admin user)
        const adminWallet = await Wallet.findOneAndUpdate(
            { user: { $exists: true } }, // simplification: in real app grab actual admin id
            { $inc: { balance: breakdown.totalAdminProfit } },
            { new: true }
        );

        // Update order
        order.status = 'completed';
        order.escrowStatus = 'released';
        await order.save();

        // Log transactions
        await Transaction.create({ user: order.seller, amount: breakdown.sellerReceives, type: 'payment_received', order: order._id, status: 'completed', description: `Payment released for completed order` });
        await Transaction.create({ user: order.seller, amount: breakdown.totalAdminProfit, fee: breakdown.totalAdminProfit, type: 'admin_commission', order: order._id, status: 'completed', description: `Admin commission: 7% seller + 4% buyer fees` });

        res.status(200).json({
            success: true,
            message: 'Order approved! Payment released to seller.',
            breakdown,
        });
    } catch (error) {
        console.error('Approve Order Error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// @desc    Seller marks order as delivered
// @route   PUT /api/orders/:id/deliver
const deliverOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });
        if (order.seller.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized.' });

        order.status = 'delivered';
        await order.save();

        res.status(200).json({ success: true, message: 'Order marked as delivered. Awaiting buyer approval.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// @desc    Get all orders for current user
// @route   GET /api/orders
const getMyOrders = async (req, res) => {
    try {
        const query = req.user.role === 'seller'
            ? { seller: req.user.id }
            : { buyer: req.user.id };

        const orders = await Order.find(query)
            .populate('project', 'title images deliveryTime')
            .populate('buyer', 'name username avatar')
            .populate('seller', 'name username avatar')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = { createOrder, approveOrder, deliverOrder, getMyOrders };
