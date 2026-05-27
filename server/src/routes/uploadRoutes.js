const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { protect } = require('../middlewares/authMiddleware');
const { uploadToCloudinary } = require('../utils/cloudinaryHelper');
const User = require('../models/User');

// @desc    Upload user avatar
// @route   POST /api/upload/avatar
router.post('/avatar', protect, upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded.' });

        const result = await uploadToCloudinary(req.file.buffer, 'bidlance/avatars', {
            transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }],
        });

        // Update user avatar URL
        await User.findByIdAndUpdate(req.user.id, { avatar: result.secure_url });

        res.status(200).json({
            success: true,
            message: 'Avatar uploaded!',
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (err) {
        console.error('Avatar upload error:', err);
        res.status(500).json({ success: false, message: 'Upload failed. Check Cloudinary credentials.' });
    }
});

// @desc    Upload project images (up to 5)
// @route   POST /api/upload/project-images
router.post('/project-images', protect, upload.array('images', 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No files uploaded.' });
        }

        const uploadPromises = req.files.map(file =>
            uploadToCloudinary(file.buffer, 'bidlance/projects', {
                transformation: [{ width: 1280, height: 720, crop: 'fill' }],
            })
        );

        const results = await Promise.all(uploadPromises);
        const urls = results.map(r => ({ url: r.secure_url, public_id: r.public_id }));

        res.status(200).json({ success: true, images: urls });
    } catch (err) {
        console.error('Project image upload error:', err);
        res.status(500).json({ success: false, message: 'Upload failed.' });
    }
});

// @desc    Upload CV/portfolio PDF
// @route   POST /api/upload/cv
router.post('/cv', protect, upload.single('cv'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded.' });

        const result = await uploadToCloudinary(req.file.buffer, 'bidlance/cvs', {
            resource_type: 'raw',
            format: 'pdf',
        });

        // Save CV URL to user profile
        await User.findByIdAndUpdate(req.user.id, { cv: result.secure_url });

        res.status(200).json({
            success: true,
            message: 'CV uploaded!',
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (err) {
        console.error('CV upload error:', err);
        res.status(500).json({ success: false, message: 'Upload failed.' });
    }
});

module.exports = router;
