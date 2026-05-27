import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, User, Bell, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <span className="text-white font-bold text-xl">B</span>
                    </div>
                    <span className="text-2xl font-bold gradient-text tracking-tight">Bidlance</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/explore" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Explore</Link>
                    <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">How it Works</Link>
                    <div className="relative group">
                        <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full cursor-pointer group-hover:bg-white/10 transition-all">
                            <Search size={18} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Find services..."
                                className="bg-transparent border-none outline-none text-sm w-40 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/login" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Sign In</Link>
                    <Link to="/signup" className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/25 hover:scale-105 active:scale-95">
                        Join Bidlance
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden glass absolute top-full left-0 w-full py-6 px-6 border-t border-white/5"
                >
                    <div className="flex flex-col space-y-4">
                        <Link to="/explore" className="text-gray-300 text-lg">Explore</Link>
                        <Link to="/how-it-works" className="text-gray-300 text-lg">How it Works</Link>
                        <hr className="border-white/5" />
                        <Link to="/login" className="text-gray-300 text-lg">Sign In</Link>
                        <Link to="/signup" className="w-full py-3 bg-primary text-center text-white rounded-xl font-semibold">Join Bidlance</Link>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
