import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Wallet, ShoppingBag, LayoutDashboard, LogOut, ChevronDown, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully.');
        navigate('/');
        setIsUserMenuOpen(false);
    };

    const dashboardPath = user?.role === 'seller' ? '/dashboard/seller' : user?.role === 'admin' ? '/dashboard/admin' : '/dashboard';

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-2xl shadow-black/20' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 shrink-0">
                    <img src="/logo.png" alt="BidLance" className="w-10 h-10 object-contain" />
                    <span className="text-xl font-black gradient-text hidden sm:block">BidLance</span>
                </Link>

                {/* Desktop Center Links */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/explore" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Explore</Link>
                    <div className="h-4 w-px bg-white/10"></div>
                    <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                        <Search size={15} className="text-gray-500" />
                        <input type="text" placeholder="Search services..." className="bg-transparent border-none outline-none text-sm w-36 placeholder:text-gray-600 text-white" />
                    </div>
                </div>

                {/* Auth Section */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/wallet" className="flex items-center gap-1.5 px-4 py-2 glass rounded-xl text-sm text-gray-300 hover:text-white transition-colors">
                                <Wallet size={16} /> Wallet
                            </Link>

                            {/* User Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2.5 glass px-4 py-2 rounded-xl hover:bg-white/10 transition-colors"
                                >
                                    <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-xs font-black text-white">
                                        {user.name?.[0]?.toUpperCase()}
                                    </div>
                                    <span className="text-sm text-white font-medium max-w-[90px] truncate">{user.name}</span>
                                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 5, scale: 0.97 }}
                                            className="absolute right-0 top-full mt-2 w-52 glass-card rounded-2xl p-2 border border-white/5 shadow-xl"
                                        >
                                            <div className="px-3 py-2 mb-1">
                                                <p className="text-white text-sm font-bold">{user.name}</p>
                                                <p className="text-gray-500 text-xs capitalize">{user.role} Account</p>
                                            </div>
                                            <div className="border-t border-white/5 my-1"></div>
                                            <Link to={dashboardPath} onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white text-sm transition-colors">
                                                <LayoutDashboard size={15} /> Dashboard
                                            </Link>
                                            <Link to="/profile" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white text-sm transition-colors">
                                                <User size={15} /> My Profile
                                            </Link>
                                            <Link to="/wallet" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white text-sm transition-colors">
                                                <Wallet size={15} /> My Wallet
                                            </Link>
                                            <div className="border-t border-white/5 my-1"></div>
                                            <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-red-400 text-sm transition-colors">
                                                <LogOut size={15} /> Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Sign In</Link>
                            <Link to="/signup" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20">
                                Join Free
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/5 overflow-hidden"
                    >
                        <div className="px-6 py-6 flex flex-col gap-4">
                            <Link to="/explore" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 text-lg font-medium">Explore</Link>
                            {user ? (
                                <>
                                    <Link to={dashboardPath} onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 text-lg">Dashboard</Link>
                                    <Link to="/wallet" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 text-lg">My Wallet</Link>
                                    <button onClick={handleLogout} className="text-left text-red-400 text-lg">Sign Out</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 text-lg">Sign In</Link>
                                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 bg-indigo-600 text-center text-white rounded-xl font-bold">Join Free</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
