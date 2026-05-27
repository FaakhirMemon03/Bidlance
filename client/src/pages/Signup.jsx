import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, CheckCircle2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { signupAPI } from '../utils/api';
import { setUser, setLoading, setError } from '../store/authSlice';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'buyer' });
    const [loading, setLocalLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalLoading(true);
        try {
            const res = await signupAPI(formData);
            dispatch(setUser({ user: res.data.user, token: res.data.token }));
            toast.success(`Welcome to Bidlance, ${res.data.user.name}! 🎉`);
            navigate(formData.role === 'seller' ? '/dashboard/seller' : '/dashboard');
        } catch (err) {
            const msg = err.response?.data?.message || 'Signup failed. Please try again.';
            toast.error(msg);
            dispatch(setError(msg));
        } finally {
            setLocalLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-20">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 blur-[120px] rounded-full"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card w-full max-w-xl p-8 lg:p-12 rounded-[2rem] relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-emerald-500 to-amber-500"></div>

                <div className="text-center mb-10">
                    <Link to="/" className="inline-block mb-6">
                        <img src="/logo.png" alt="BidLance" className="w-16 h-16 mx-auto object-contain" />
                    </Link>
                    <h1 className="text-2xl font-bold mb-2 text-white">Create Your Account</h1>
                    <p className="text-gray-500 text-sm">Join thousands of professionals on Bidlance</p>
                </div>

                {/* Role Selector */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'buyer' })}
                        className={`p-4 rounded-2xl border-2 transition-all text-left ${formData.role === 'buyer' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 bg-white/5 hover:border-white/10'}`}
                    >
                        <CheckCircle2 size={22} className={`mb-2 ${formData.role === 'buyer' ? 'text-indigo-400' : 'text-gray-600'}`} />
                        <h4 className="font-bold text-white text-sm">I'm a Buyer</h4>
                        <p className="text-xs text-gray-500 mt-1">Hire top freelancers</p>
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'seller' })}
                        className={`p-4 rounded-2xl border-2 transition-all text-left ${formData.role === 'seller' ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/5 bg-white/5 hover:border-white/10'}`}
                    >
                        <CheckCircle2 size={22} className={`mb-2 ${formData.role === 'seller' ? 'text-emerald-400' : 'text-gray-600'}`} />
                        <h4 className="font-bold text-white text-sm">I'm a Seller</h4>
                        <p className="text-xs text-gray-500 mt-1">Offer your skills</p>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-indigo-500 transition-colors text-white placeholder:text-gray-600 text-sm"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-indigo-500 transition-colors text-white placeholder:text-gray-600 text-sm"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="password"
                            placeholder="Create Password (min 8 chars)"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-indigo-500 transition-colors text-white placeholder:text-gray-600 text-sm"
                            minLength={8}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 mt-2"
                    >
                        {loading ? <><Loader2 size={20} className="animate-spin" /> Creating Account...</> : `Create ${formData.role === 'buyer' ? 'Buyer' : 'Seller'} Account`}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-500 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-400 font-bold hover:underline">Sign In</Link>
                </p>
                <p className="mt-4 text-xs text-center text-gray-600">
                    Platform charges: 4% buyer fee · 7% seller fee · Escrow protected
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
