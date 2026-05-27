const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    amount: { type: Number, required: true },
    buyerFee: { type: Number, required: true },
    sellerFee: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'delivered', 'completed', 'disputed', 'cancelled'],
        default: 'pending'
    },
    escrowStatus: {
        type: String,
        enum: ['held', 'released', 'refunded'],
        default: 'held'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
