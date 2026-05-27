const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Models
const User = require('./src/models/User');
const Project = require('./src/models/Project');
const Wallet = require('./src/models/Wallet');
const Bid = require('./src/models/Bid');

dotenv.config();

const seedData = async () => {
    try {
        console.log('⏳ Connecting to MongoDB for seeding...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected.');

        // Clear existing data (optional - be careful)
        console.log('🧹 Cleaning database...');
        await User.deleteMany({ email: { $ne: 'admin@bidlance.com' } });
        await Project.deleteMany({});
        await Wallet.deleteMany({});
        await Bid.deleteMany({});

        console.log('👥 Creating sample users...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const users = [
            { name: 'Ahmed Khan', username: 'ahmed_web', email: 'ahmed@example.com', password: hashedPassword, role: 'seller', bio: 'Expert Full Stack Developer with 5 years of experience.' },
            { name: 'Sara Malik', username: 'sara_design', email: 'sara@example.com', password: hashedPassword, role: 'seller', bio: 'Creative UI/UX Designer specialized in brand identity.' },
            { name: 'John Doe', username: 'john_buyer', email: 'john@example.com', password: hashedPassword, role: 'buyer' },
            { name: 'Rizwan Ahmed', username: 'rizwan_admin', email: 'admin@bidlance.com', password: hashedPassword, role: 'admin' },
        ];

        const createdUsers = await User.insertMany(users);
        console.log(`✅ ${createdUsers.length} users created.`);

        // Create wallets for each user
        for (const u of createdUsers) {
            await Wallet.create({ user: u._id, balance: 100000 }); // Give everyone 1 Lakh for testing
        }

        console.log('🚀 Creating sample projects...');
        const ahmed = createdUsers.find(u => u.username === 'ahmed_web');
        const sara = createdUsers.find(u => u.username === 'sara_design');

        const projects = [
            {
                title: 'Premium SaaS Dashboard with Next.js & Tailwind',
                description: 'I will build a fully responsive, enterprise-grade SaaS dashboard with real-time analytics and dark mode.',
                category: 'Web Development',
                price: 45000,
                deliveryTime: '7 Days',
                seller: ahmed._id,
                biddingEnabled: true,
                tags: ['nextjs', 'react', 'dashboard', 'saas']
            },
            {
                title: 'Professional Brand Identity & Logo Package',
                description: 'Complete branding solution including logo, color palette, typography and social media kit.',
                category: 'Design & Branding',
                price: 15000,
                deliveryTime: '3 Days',
                seller: sara._id,
                biddingEnabled: false,
                tags: ['branding', 'logo', 'design']
            },
            {
                title: 'Custom WordPress E-commerce Website',
                description: 'SEO optimized WordPress store with WooCommerce integration and premium theme customization.',
                category: 'Web Development',
                price: 35000,
                deliveryTime: '5 Days',
                seller: ahmed._id,
                biddingEnabled: true,
                tags: ['wordpress', 'ecommerce', 'seo']
            },
            {
                title: 'Full Brand Redesign for Tech Startups',
                description: 'Modern, minimalist redesign focusing on conversion and tech aesthetics.',
                category: 'Design & Branding',
                price: 65000,
                deliveryTime: '10 Days',
                seller: sara._id,
                biddingEnabled: true,
                tags: ['ux', 'ui', 'startup']
            }
        ];

        const createdProjects = await Project.insertMany(projects);
        console.log(`✅ ${createdProjects.length} projects created.`);

        console.log('🔥 Placing initial bids...');
        const biddingProject = createdProjects.find(p => p.biddingEnabled);
        const john = createdUsers.find(u => u.username === 'john_buyer');

        const bids = [
            { project: biddingProject._id, buyer: john._id, amount: 46000 },
            { project: biddingProject._id, buyer: john._id, amount: 48000 },
        ];

        await Bid.insertMany(bids);
        console.log('✅ Sample bids placed.');

        console.log('🎉 Seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
};

seedData();
