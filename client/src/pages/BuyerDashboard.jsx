import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, CheckCircle, AlertTriangle, Package } from 'lucide-react';
import { getMyOrdersAPI } from '../utils/api';

const statusConfig = {
    'pending': { label: 'Pending', color: 'text-gray-400', bg: 'bg-gray-500/10', icon: <Clock size={14} /> },
    'in-progress': { label: 'In Progress', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: <Clock size={14} /> },
    'delivered': { label: 'Delivered', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: <Package size={14} /> },
    'completed': { label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: <CheckCircle size={14} /> },
    'disputed': { label: 'Disputed', color: 'text-red-400', bg: 'bg-red-500/10', icon: <AlertTriangle size={14} /> },
};

const BuyerDashboard = () => {
    const { user } = useSelector(state => state.auth);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyOrdersAPI()
            .then(res => setOrders(res.data.orders))
            .catch(() => {
                // Demo data
                setOrders([
                    { _id: '1', project: { title: 'Premium Logo Design', deliveryTime: '2 Days' }, seller: { name: 'Sara Khan', username: 'sara_design', avatar: '' }, totalAmount: 13000, amount: 12500, status: 'completed', createdAt: new Date().toISOString() },
                    { _id: '2', project: { title: 'React.js E-commerce', deliveryTime: '15 Days' }, seller: { name: 'Ali Raza', username: 'ali_dev', avatar: '' }, totalAmount: 52000, amount: 50000, status: 'in-progress', createdAt: new Date().toISOString() },
                ]);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="mb-10">
                    <p className="text-gray-500 text-sm mb-1">Buyer Dashboard</p>
                    <h1 className="text-4xl font-bold">Welcome, <span className="gradient-text">{user?.name || 'Buyer'}</span></h1>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: 'Total Orders', value: orders.length, icon: <ShoppingBag size={20} className="text-indigo-400" /> },
                        { label: 'In Progress', value: orders.filter(o => o.status === 'in-progress').length, icon: <Clock size={20} className="text-amber-400" /> },
                        { label: 'Completed', value: orders.filter(o => o.status === 'completed').length, icon: <CheckCircle size={20} className="text-emerald-400" /> },
                        { label: 'Disputed', value: orders.filter(o => o.status === 'disputed').length, icon: <AlertTriangle size={20} className="text-red-400" /> },
                    ].map((s, i) => (
                        <div key={i} className="glass-card p-5 rounded-2xl">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-gray-500 text-xs font-semibold uppercase">{s.label}</p>
                                {s.icon}
                            </div>
                            <p className="text-3xl font-black text-white">{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Orders Table */}
                <div className="glass-card p-6 rounded-3xl">
                    <h2 className="text-xl font-bold mb-6 text-white">My Orders</h2>
                    {loading ? (
                        <div className="space-y-3">
                            {[...Array(3)].map((_, i) => <div key={i} className="glass h-16 rounded-2xl animate-pulse"></div>)}
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-16 text-gray-600">
                            <p className="text-5xl mb-4">🛒</p>
                            <p className="text-lg font-bold text-white mb-2">No orders yet</p>
                            <p>Start exploring and buy your first service!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => {
                                const st = statusConfig[order.status] || statusConfig['pending'];
                                return (
                                    <motion.div
                                        key={order._id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 glass rounded-2xl"
                                    >
                                        <div className="flex-1">
                                            <p className="text-white font-semibold">{order.project?.title}</p>
                                            <p className="text-gray-500 text-sm">Seller: @{order.seller?.username} · {new Date(order.createdAt).toLocaleDateString('en-PK')}</p>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-2 sm:min-w-[140px]">
                                            <p className="text-white font-bold">Rs {order.totalAmount?.toLocaleString()}</p>
                                            <span className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-semibold ${st.bg} ${st.color}`}>
                                                {st.icon} {st.label}
                                            </span>
                                        </div>
                                        {order.status === 'delivered' && (
                                            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors">
                                                Approve & Release
                                            </button>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BuyerDashboard;
