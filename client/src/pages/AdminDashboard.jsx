import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Briefcase,
    DollarSign,
    ShieldAlert,
    TrendingUp,
    CheckCircle,
    XCircle,
    Eye,
    Filter,
    Search,
    Loader2,
    ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProjects: 0,
        totalVolume: 0,
        pendingDisputes: 0
    });
    const [loading, setLoading] = useState(true);

    // Mock data for initial UI (Replace with real API later)
    const [recentUsers, setRecentUsers] = useState([
        { id: 1, name: 'Ahmed Khan', email: 'ahmed@example.com', role: 'seller', status: 'verified' },
        { id: 2, name: 'Sara Malik', email: 'sara@example.com', role: 'seller', status: 'pending' },
        { id: 3, name: 'John Doe', email: 'john@example.com', role: 'buyer', status: 'verified' },
    ]);

    useEffect(() => {
        // Simulate loading stats
        setTimeout(() => {
            setStats({
                totalUsers: 1420,
                totalProjects: 380,
                totalVolume: 1250000,
                pendingDisputes: 5
            });
            setLoading(false);
        }, 1000);
    }, []);

    const statCards = [
        { label: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: <Users />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Total Volume (Rs)', value: stats.totalVolume.toLocaleString(), icon: <DollarSign />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Active Projects', value: stats.totalProjects, icon: <Briefcase />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'Open Disputes', value: stats.pendingDisputes, icon: <ShieldAlert />, color: 'text-red-500', bg: 'bg-red-500/10' },
    ];

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={48} />
        </div>
    );

    return (
        <div className="pt-24 pb-20 container mx-auto px-6">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-white">Platform <span className="gradient-text">Command Center</span></h1>
                <p className="text-gray-500">Monitor activity, manage disputes, and oversee marketplace health.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 rounded-3xl border border-white/5"
                    >
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                            {React.cloneElement(stat.icon, { size: 24 })}
                        </div>
                        <p className="text-gray-500 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                        <h3 className="text-3xl font-black text-white mt-1">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* User Management Table */}
                <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-8 overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Users className="text-primary" size={24} /> User Management
                        </h2>
                        <div className="flex gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                                <input type="text" placeholder="Search users..." className="bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs outline-none focus:border-primary transition-all w-40" />
                            </div>
                            <button className="p-2 glass rounded-xl hover:bg-white/10 transition-colors">
                                <Filter size={14} className="text-gray-400" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-gray-600 text-[10px] font-black uppercase tracking-widest border-b border-white/5">
                                    <th className="pb-4 px-4">User</th>
                                    <th className="pb-4 px-4">Role</th>
                                    <th className="pb-4 px-4">Status</th>
                                    <th className="pb-4 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {recentUsers.map((u) => (
                                    <tr key={u.id} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs font-black text-white">
                                                    {u.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-white font-bold">{u.name}</p>
                                                    <p className="text-gray-500 text-xs">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${u.role === 'seller' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-1.5">
                                                {u.status === 'verified' ? (
                                                    <CheckCircle className="text-emerald-500" size={14} />
                                                ) : (
                                                    <ShieldAlert className="text-amber-500" size={14} />
                                                )}
                                                <span className={`text-[10px] font-bold uppercase ${u.status === 'verified' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                    {u.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 glass rounded-lg hover:bg-primary/20 text-primary transition-colors">
                                                    <Eye size={14} />
                                                </button>
                                                <button className="p-2 glass rounded-lg hover:bg-red-500/20 text-red-500 transition-colors">
                                                    <XCircle size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Dispute & Alerts Sidebar */}
                <div className="space-y-6">
                    <div className="glass-card p-8 rounded-[2.5rem] border border-red-500/10">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <ShieldAlert className="text-red-500" size={20} /> Critical Disputes
                        </h3>

                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl relative overflow-hidden group hover:bg-red-500/10 transition-all cursor-pointer">
                                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight className="text-red-500" size={16} />
                                    </div>
                                    <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest mb-1">High Priority</p>
                                    <p className="text-white text-sm font-bold mb-2">Order #8292 Disputed</p>
                                    <div className="flex justify-between items-center text-[10px] font-bold text-gray-500">
                                        <span>Buyer: @john_d</span>
                                        <span>Rs 15,000</span>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-3 glass rounded-xl text-gray-400 text-xs font-bold hover:text-white transition-all">
                                View All Disputes
                            </button>
                        </div>
                    </div>

                    <div className="glass-card p-8 rounded-[2.5rem]">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <TrendingUp className="text-secondary" size={20} /> Revenue Forecast
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-gray-500 text-[10px] font-black uppercase">Admin Profit (7%)</p>
                                    <p className="text-2xl font-black text-white">Rs 87,500</p>
                                </div>
                                <span className="text-emerald-500 text-xs font-bold">+12.5%</span>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '65%' }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-secondary"
                                ></motion.div>
                            </div>
                            <p className="text-[10px] text-gray-500 italic text-center">Monthly goal: Rs 150,000</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
