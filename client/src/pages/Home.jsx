import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ShieldCheck, Zap, ArrowRight, DollarSign, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="pt-24 pb-20">
            {/* Hero Section */}
            <section className="container mx-auto px-6 pt-12 lg:pt-20">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
                            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">Next-Gen Marketplace</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                            Empowering <span className="gradient-text">Top Freelancers</span> & Secure Bidding
                        </h1>
                        <p className="text-gray-400 text-lg lg:text-xl mb-10 max-w-xl">
                            Buy, sell, and bid on elite digital services. The only platform with a transparent wallet system and live real-time auctioning.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link to="/explore" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2 group">
                                Browse Projects <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/10 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                                Join as Seller
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 flex items-center gap-8 border-t border-white/5 pt-8">
                            <div>
                                <p className="text-3xl font-bold text-white">4.9/5</p>
                                <p className="text-gray-500 text-sm">User Rating</p>
                            </div>
                            <div className="w-px h-10 bg-white/10"></div>
                            <div>
                                <p className="text-3xl font-bold text-white">10k+</p>
                                <p className="text-gray-500 text-sm">Active Users</p>
                            </div>
                            <div className="w-px h-10 bg-white/10"></div>
                            <div>
                                <p className="text-3xl font-bold text-white">Rs 0</p>
                                <p className="text-gray-500 text-sm">Withdrawal Fee</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Hero Image/Illustration Area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full"></div>

                        {/* Floating Cards Mockup */}
                        <div className="relative">
                            <div className="glass-card p-6 rounded-3xl animate-float">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gray-700"></div>
                                        <div>
                                            <h3 className="font-bold">Next.js Dashboard</h3>
                                            <p className="text-gray-500 text-xs text-left">Published by @pixel_pro</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full font-bold">LIVE BIDS</span>
                                </div>
                                <div className="h-48 bg-gray-800/50 rounded-2xl mb-4 overflow-hidden relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-black text-4xl opacity-20">PREVIEW</div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-gray-500 text-xs">Current Bid</p>
                                        <p className="text-2xl font-bold text-white">Rs 45,000</p>
                                    </div>
                                    <button className="px-6 py-2 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">Place Bid</button>
                                </div>
                            </div>

                            {/* Smaller floating element */}
                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -bottom-6 -left-12 glass p-4 rounded-2xl flex items-center gap-3 border border-white/10"
                            >
                                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Secure Escrow</p>
                                    <p className="font-bold text-sm">Payment Protected</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="mt-32 container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Why Choose <span className="gradient-text">Bidlance</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Experience a marketplace built on trust, transparency, and innovation.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Timer className="text-primary" size={32} />,
                            title: "Live Bidding",
                            desc: "Participate in real-time auctions for high-value projects and get the best market rates."
                        },
                        {
                            icon: <ShieldCheck className="text-secondary" size={32} />,
                            title: "Escrow Wallet",
                            desc: "Money is held securely in escrow and released only when you approve the delivered work."
                        },
                        {
                            icon: <Zap className="text-accent" size={32} />,
                            title: "Fair Exposure",
                            desc: "Our AI-driven ranking ensures both elite sellers and rising stars get the visibility they deserve."
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all"
                        >
                            <div className="mb-6">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
