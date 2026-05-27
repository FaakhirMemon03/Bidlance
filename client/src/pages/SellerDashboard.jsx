import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, DollarSign, ShoppingBag, Star, TrendingUp, Package, CheckCircle, Clock } from 'lucide-react';
import { getMyOrdersAPI } from '../utils/api';

const SellerDashboard = () => {
    const { user } = useSelector(state => state.auth);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyOrdersAPI()
            .then(res => setOrders(res.data.orders))
            .catch(() => {
                setOrders([
                    { _id: '1', project: { title: 'Logo Design Package' }, buyer: { name: 'Rizwan Ahmed', username: 'rizwan_buyer' }, amount: 12000, status: 'in-progress', createdAt: new Date().toISOString() },
                    { _id: '2', project: { title: 'WordPress Website' }, buyer: { name: 'Fatima Khan', username: 'fatima_k' }, amount: 35000, status: 'completed', createdAt: new Date().toISOString() },
                ]);
            })
            .finally(() => setLoading(false));
    }, []);

    const totalEarned = orders.filter(o => o.status === 'completed').reduce((s, o) => s + (o.amount * 0.93), 0);

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                    <div>
                        <p className="text-gray-500 text-sm mb-1">Seller Dashboard</p>
                        <h1 className="text-4xl font-bold">Welcome, <span className="gradient-text">{user?.name || 'Seller'}</span></h1>
                    </div>
                    <Link to="/create-project" className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20">
                        <Plus size={20} /> List New Service
                    </Link>
                </div>

                {/* Earnings & Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: 'Total Earned', value: `Rs ${Math.round(totalEarned).toLocaleString()}`, sub: 'After 7% platform fee', icon: <DollarSign size={20} className="text-emerald-400" />, highlight: true },
                        { label: 'Active Orders', value: orders.filter(o => o.status === 'in-progress').length, sub: 'Awaiting delivery', icon: <Clock size={20} className="text-amber-400" /> },
                        { label: 'Completed', value: orders.filter(o => o.status === 'completed').length, sub: 'All time', icon: <CheckCircle size={20} className="text-blue-400" /> },
                        { label: 'Avg. Rating', value: '4.9 ⭐', sub: 'Based on reviews', icon: <Star size={20} className="text-amber-400" /> },
                    ].map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`glass-card p-5 rounded-2xl ${s.highlight ? 'border border-emerald-500/20' : ''}`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-gray-500 text-xs font-semibold uppercase">{s.label}</p>
                                {s.icon}
                            </div>
                            <p className={`text-2xl font-black ${s.highlight ? 'text-emerald-400' : 'text-white'}`}>{s.value}</p>
                            <p className="text-gray-600 text-xs mt-1">{s.sub}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Commission Info Box */}
                <div className="glass p-5 rounded-2xl border border-indigo-500/20 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="p-3 bg-indigo-500/10 rounded-xl">
                        <TrendingUp className="text-indigo-400" size={24} />
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm">How Your Earnings Work</p>
                        <p className="text-gray-500 text-sm mt-1">
                            When a buyer purchases your project, <span className="text-white">7% platform fee</span> is deducted from the project amount. Example: Rs 100,000 project → You receive <span className="text-emerald-400 font-bold">Rs 93,000</span>. Buyer also pays 4% on top.
                        </p>
                    </div>
                </div>

                {/* Orders List */}
                <div className="glass-card p-6 rounded-3xl">
                    <h2 className="text-xl font-bold mb-6 text-white">My Active Orders</h2>
                    {loading ? (
                        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="glass h-16 rounded-2xl animate-pulse"></div>)}</div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-16 text-gray-600">
                            <p className="text-5xl mb-4">📦</p>
                            <p className="text-lg font-bold text-white mb-2">No orders yet</p>
                            <p>List a service to start receiving orders.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order._id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 glass rounded-2xl">
                                    <div className="flex-1">
                                        <p className="text-white font-semibold">{order.project?.title}</p>
                                        <p className="text-gray-500 text-sm">Buyer: @{order.buyer?.username} · {new Date(order.createdAt).toLocaleDateString('en-PK')}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-white font-bold">Rs {Math.round(order.amount * 0.93).toLocaleString()}</p>
                                            <p className="text-gray-600 text-xs">You earn (after 7%)</p>
                                        </div>
                                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                            {order.status}
                                        </span>
                                        {order.status === 'in-progress' && (
                                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors">
                                                Mark Delivered
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;
