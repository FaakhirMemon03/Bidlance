const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            "style-src": ["'self'", "'unsafe-inline'"],
            "img-src": ["'self'", "data:", "res.cloudinary.com"],
            "connect-src": ["'self'", "ws://localhost:5173", "ws://localhost:5174", "ws://localhost:5175", "http://localhost:5005"],
        },
    },
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// Routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const walletRoutes = require('./routes/walletRoutes');
const orderRoutes = require('./routes/orderRoutes');
const bidRoutes = require('./routes/bidRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/upload', uploadRoutes);

// Health Check
app.get('/', (req, res) => {
    res.json({ message: '🚀 Bidlance API is running!', version: '1.0.0' });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

module.exports = app;
