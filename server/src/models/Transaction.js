const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: { type: Number, required: true },
    fee: { type: Number, default: 0 },
    type: {
        type: String,
        enum: ['deposit', 'withdrawal', 'payment_sent', 'payment_received', 'admin_commission'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
