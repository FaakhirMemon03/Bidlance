import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { forgotPasswordAPI } from '../utils/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await forgotPasswordAPI({ email });
            setSubmitted(true);
            toast.success('Recovery link sent to your email!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-dark">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card w-full max-w-md p-8 lg:p-12 rounded-[2.5rem] relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500"></div>

                {!submitted ? (
                    <>
                        <div className="mb-8">
                            <Link to="/login" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-6 group">
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Login
                            </Link>
                            <h1 className="text-3xl font-black text-white mb-2">Forgot Password?</h1>
                            <p className="text-gray-500 text-sm italic">Enter your email and we'll send you a recovery link.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-400 text-xs font-black uppercase mb-2 tracking-widest px-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary text-white text-sm transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-primary hover:bg-primary-dark disabled:opacity-60 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                            >
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <><Send size={16} /> Send Recovery Link</>}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-10">
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Mail className="text-emerald-500" size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-3">Check Your Inbox</h2>
                        <p className="text-gray-500 text-sm mb-8">
                            We've sent a recovery link to <strong className="text-white">{email}</strong>. Please check your spam folder if you don't see it.
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-primary font-bold hover:underline"
                        >
                            Didn't get the email? Try again
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
