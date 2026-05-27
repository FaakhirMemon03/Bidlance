const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: [String],
    price: { type: Number, required: true },
    deliveryTime: { type: String, required: true },
    biddingEnabled: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['active', 'paused', 'completed', 'deleted'],
        default: 'active'
    },
    tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
