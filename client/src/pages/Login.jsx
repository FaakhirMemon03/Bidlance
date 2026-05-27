import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginAPI } from '../utils/api';
import { setUser, setError } from '../store/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await loginAPI(formData);
            dispatch(setUser({ user: res.data.user, token: res.data.token }));
            toast.success(`Welcome back, ${res.data.user.name}! 👋`);
            const role = res.data.user.role;
            if (role === 'admin') navigate('/dashboard/admin');
            else if (role === 'seller') navigate('/dashboard/seller');
            else navigate('/dashboard');
        } catch (err) {
            const msg = err.response?.data?.message || 'Login failed. Please try again.';
            toast.error(msg);
            dispatch(setError(msg));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-20">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card w-full max-w-md p-8 lg:p-12 rounded-[2rem] relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                <div className="text-center mb-10">
                    <Link to="/" className="inline-block mb-6">
                        <img src="/logo.png" alt="BidLance" className="w-16 h-16 mx-auto object-contain" />
                    </Link>
                    <h1 className="text-2xl font-bold mb-2 text-white">Welcome Back</h1>
                    <p className="text-gray-500 text-sm">Sign in to your professional portal</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-indigo-500 transition-colors text-white placeholder:text-gray-600 text-sm"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm pt-1">
                        <label className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-gray-300">
                            <input type="checkbox" className="accent-indigo-500 w-4 h-4" />
                            Remember me
                        </label>
                        <Link to="/forgot-password" className="text-indigo-400 hover:underline text-sm">Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 mt-2"
                    >
                        {loading ? <><Loader2 size={20} className="animate-spin" /> Signing In...</> : <><LogIn size={18} /> Sign In</>}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-500 text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-indigo-400 font-bold hover:underline">Create Account</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
