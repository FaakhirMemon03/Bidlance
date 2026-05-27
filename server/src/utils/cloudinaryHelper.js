const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

/**
 * Upload a file buffer to Cloudinary with Fallback for Dev
 */
const uploadToCloudinary = (buffer, folder = 'bidlance', options = {}) => {
    // If keys are missing, return a placeholder instead of crashing
    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_CLOUD_NAME) {
        console.warn(`⚠️ [DEV MODE] Cloudinary keys missing in .env. Using placeholder image.`);
        return Promise.resolve({
            secure_url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000',
            public_id: 'dev_placeholder'
        });
    }

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'auto',
                ...options,
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};

const deleteFromCloudinary = async (publicId) => {
    if (!publicId || publicId === 'dev_placeholder') return;
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (err) {
        console.error('Cloudinary Delete Error:', err);
    }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
