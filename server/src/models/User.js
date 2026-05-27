const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    role: {
        type: String,
        enum: ['buyer', 'seller', 'admin'],
        default: 'buyer'
    },
    isVerified: { type: Boolean, default: false },
    bio: { type: String, default: '' },
    skills: [String],
    cv: { type: String }, // URL to CV file
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
