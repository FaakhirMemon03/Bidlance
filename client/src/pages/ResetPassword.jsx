import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Lock, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { resetPasswordAPI } from '../utils/api';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return toast.error('Passwords do not match.');
        if (password.length < 8) return toast.error('Password must be at least 8 characters.');

        setLoading(true);
        try {
            await resetPasswordAPI(token, { password });
            toast.success('Password updated! You can now login.');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Token is invalid or has expired.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-dark">
            <div className="absolute inset-0 -z-10">
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 blur-[150px] rounded-full"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card w-full max-w-md p-8 lg:p-12 rounded-[2.5rem] relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>

                <div className="mb-10 text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Lock className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2">New Password</h1>
                    <p className="text-gray-500 text-sm">Please choose a strong password to secure your account.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-xs font-black uppercase mb-2 tracking-widest px-1">New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary text-white text-sm transition-all"
                                required
                                minLength={8}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-xs font-black uppercase mb-2 tracking-widest px-1">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary text-white text-sm transition-all"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-secondary hover:bg-secondary-dark disabled:opacity-60 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 mt-4 shadow-xl shadow-secondary/20"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <><CheckCircle size={16} /> Update Password</>}
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-500 text-xs font-bold">
                    Remembered your password?{' '}
                    <Link to="/login" className="text-white hover:underline">Sign In Instead</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
