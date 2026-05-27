const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Socket.io initialization
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// Make io accessible globally for controllers
global.io = io;

// Live Bidding Rooms via Socket.IO
io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // Join a project bidding room
    socket.on('joinBidRoom', (projectId) => {
        socket.join(`project_${projectId}`);
        console.log(`🔥 Socket ${socket.id} joined bid room: project_${projectId}`);
    });

    // Leave a project bidding room
    socket.on('leaveBidRoom', (projectId) => {
        socket.leave(`project_${projectId}`);
    });

    socket.on('disconnect', () => {
        console.log(`❌ User disconnected: ${socket.id}`);
    });
});

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected...');
    } catch (err) {
        console.error('❌ Database connection error:', err.message);
        process.exit(1);
    }
};

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`🚀 Bidlance Server running on http://localhost:${PORT}`);
    });
});
