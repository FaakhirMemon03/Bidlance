import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'buyer'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Account simulation created!");
        console.log(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-dark-bg to-dark-bg">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card w-full max-w-xl p-8 lg:p-12 rounded-[2rem] relative overflow-hidden"
            >
                {/* Background mesh */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                    <p className="text-gray-500">Join the elite network of Bidlance</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Role Selector */}
                        <div
                            onClick={() => setFormData({ ...formData, role: 'buyer' })}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${formData.role === 'buyer' ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 hover:border-white/10'}`}
                        >
                            <CheckCircle2 size={24} className={`mb-2 ${formData.role === 'buyer' ? 'text-primary' : 'text-gray-600'}`} />
                            <h4 className="font-bold">I'm a Buyer</h4>
                            <p className="text-xs text-gray-500">I want to hire professionals</p>
                        </div>
                        <div
                            onClick={() => setFormData({ ...formData, role: 'seller' })}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${formData.role === 'seller' ? 'border-secondary bg-secondary/10' : 'border-white/5 bg-white/5 hover:border-white/10'}`}
                        >
                            <CheckCircle2 size={24} className={`mb-2 ${formData.role === 'seller' ? 'text-secondary' : 'text-gray-600'}`} />
                            <h4 className="font-bold">I'm a Seller</h4>
                            <p className="text-xs text-gray-500">I want to offer services</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-colors text-white"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-colors text-white"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="password"
                                placeholder="Create Password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-colors text-white"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Create {formData.role === 'buyer' ? 'Buyer' : 'Seller'} Account
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                    </p>
                </div>

                <p className="mt-8 text-xs text-center text-gray-600 leading-relaxed">
                    By signing up, you agree to our Terms of Service and Privacy Policy. Bidlance ensures your data is protected.
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
