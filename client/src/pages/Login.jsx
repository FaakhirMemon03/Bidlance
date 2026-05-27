import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Welcome back to Bidlance!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-dark-bg to-dark-bg">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card w-full max-w-md p-8 lg:p-12 rounded-[2rem] relative"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                    <p className="text-gray-500">Sign in to your Bidlance portal</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-colors text-white"
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-colors text-white"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer text-gray-400">
                            <input type="checkbox" className="accent-primary" />
                            <span>Remember me</span>
                        </label>
                        <Link to="#" className="text-primary hover:underline">Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                    >
                        <LogIn size={20} /> Sign In
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Create Account</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
