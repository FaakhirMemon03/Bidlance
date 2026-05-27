import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="glass border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">B</span>
                            </div>
                            <span className="text-xl font-bold gradient-text">Bidlance</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Bidlance is the premier marketplace for freelancers and clients to connect, bid, and grow together with trust and transparency.
                        </p>
                        <div className="flex space-x-4">
                            <Link to="#" className="p-2 glass rounded-lg hover:bg-primary transition-colors text-gray-400 hover:text-white">
                                <Twitter size={18} />
                            </Link>
                            <Link to="#" className="p-2 glass rounded-lg hover:bg-primary transition-colors text-gray-400 hover:text-white">
                                <Linkedin size={18} />
                            </Link>
                            <Link to="#" className="p-2 glass rounded-lg hover:bg-primary transition-colors text-gray-400 hover:text-white">
                                <Github size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">For Buyers</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link to="/explore" className="hover:text-primary transition-colors">Browse Services</Link></li>
                            <li><Link to="#" className="hover:text-primary transition-colors">Post a Project</Link></li>
                            <li><Link to="#" className="hover:text-primary transition-colors">Secure Escrow</Link></li>
                            <li><Link to="#" className="hover:text-primary transition-colors">Buyer Protection</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">For Sellers</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link to="#" className="hover:text-primary transition-colors">Become a Seller</Link></li>
                            <li><Link to="#" className="hover:text-primary transition-colors">Live Bidding Tips</Link></li>
                            <li><Link to="#" className="hover:text-primary transition-colors">Seller Dashboard</Link></li>
                            <li><Link to="#" className="hover:text-primary transition-colors">Earnings & Wallet</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link to="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:row items-center justify-between gap-4">
                    <p className="text-gray-600 text-xs">
                        © 2026 Bidlance Platform. All rights reserved. Built for professional growth.
                    </p>
                    <div className="flex space-x-6 text-xs text-gray-600 font-medium">
                        <span>7% Seller Fee</span>
                        <span>4% Buyer Fee</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
