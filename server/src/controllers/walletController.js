const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');

// @desc    Get user's wallet
// @route   GET /api/wallet
const getWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ user: req.user.id });
        if (!wallet) return res.status(404).json({ success: false, message: 'Wallet not found.' });
        res.status(200).json({ success: true, wallet });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// @desc    Get wallet transaction history
// @route   GET /api/wallet/transactions
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .limit(50);
        res.status(200).json({ success: true, transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// @desc    Deposit funds into wallet (simulation)
// @route   POST /api/wallet/deposit
const deposit = async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount.' });
        }

        const wallet = await Wallet.findOneAndUpdate(
            { user: req.user.id },
            { $inc: { balance: Number(amount), withdrawableBalance: Number(amount) } },
            { new: true }
        );

        await Transaction.create({
            user: req.user.id,
            amount: Number(amount),
            type: 'deposit',
            status: 'completed',
            description: `Wallet deposit of Rs ${amount}`,
        });

        res.status(200).json({ success: true, message: 'Deposit successful!', wallet });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// @desc    Request withdrawal
// @route   POST /api/wallet/withdraw
const withdraw = async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount.' });
        }

        const wallet = await Wallet.findOne({ user: req.user.id });
        if (!wallet || wallet.withdrawableBalance < Number(amount)) {
            return res.status(400).json({ success: false, message: 'Insufficient withdrawable balance.' });
        }

        wallet.withdrawableBalance -= Number(amount);
        wallet.balance -= Number(amount);
        await wallet.save();

        await Transaction.create({
            user: req.user.id,
            amount: Number(amount),
            type: 'withdrawal',
            status: 'pending',
            description: `Withdrawal request of Rs ${amount} — Pending admin review`,
        });

        res.status(200).json({ success: true, message: 'Withdrawal request submitted! Pending admin approval.', wallet });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = { getWallet, getTransactions, deposit, withdraw };
