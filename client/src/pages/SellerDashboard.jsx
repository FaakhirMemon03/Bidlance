import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Plus,
    DollarSign,
    Star,
    TrendingUp,
    CheckCircle,
    Clock,
    Handshake,
    Gavel,
    User,
    X,
    Target
} from 'lucide-react';
import {
    getMyOrdersAPI,
    getMyProjectsAPI,
    getSellerBidsAPI,
    respondToBidAPI
} from '../utils/api';
import toast from 'react-hot-toast';

const SellerDashboard = () => {
    const { user } = useSelector(state => state.auth);
    const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'projects', 'bids'
    const [orders, setOrders] = useState([]);
    const [projects, setProjects] = useState([]);
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [ordersRes, projectsRes, bidsRes] = await Promise.all([
                getMyOrdersAPI(),
                getMyProjectsAPI(),
                getSellerBidsAPI()
            ]);
            setOrders(ordersRes.data.orders);
            setProjects(projectsRes.data.projects);
            setBids(bidsRes.data.bids);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load dashboard data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRespondBid = async (bidId, status) => {
        try {
            const res = await respondToBidAPI(bidId, status);
            toast.success(res.data.message);
            fetchData(); // Refresh everything
        } catch (err) {
            toast.error(err.response?.data?.message || 'Action failed.');
        }
    };

    const totalEarned = orders.filter(o => o.status === 'completed').reduce((s, o) => s + o.amount, 0);

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                    <div>
                        <p className="text-gray-500 text-sm mb-1 uppercase tracking-widest font-black">Freelancer Console</p>
                        <h1 className="text-4xl font-black text-white">Shabb-ba-khair, <span className="gradient-text">{user?.name || 'Seller'}</span></h1>
                    </div>
                    <Link to="/create-project" className="flex items-center gap-2 px-6 py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-primary/20">
                        <Plus size={20} /> List New Project
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Net Income', value: `Rs ${Math.round(totalEarned * 0.93).toLocaleString()}`, sub: 'After 7% platform fee', icon: <DollarSign size={20} className="text-emerald-400" />, highlight: true },
                        { label: 'Escrow Held', value: `Rs ${Math.round(orders.filter(o => o.status === 'in-progress').reduce((s, o) => s + o.amount, 0) * 0.93).toLocaleString()}`, sub: 'Awaiting completion', icon: <Clock size={20} className="text-amber-400" /> },
                        { label: 'Active Bids', value: bids.length, sub: 'Responses needed', icon: <Gavel size={20} className="text-purple-400" /> },
                        { label: 'Success Rate', value: '100%', sub: 'Last 30 days', icon: <Target size={20} className="text-blue-400" /> },
                    ].map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`glass-card p-6 rounded-3xl ${s.highlight ? 'border-emerald-500/30' : 'border-white/5'}`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{s.label}</p>
                                <div className="p-2 bg-white/5 rounded-lg">{s.icon}</div>
                            </div>
                            <p className={`text-2xl font-black ${s.highlight ? 'text-emerald-400' : 'text-white'}`}>{s.value}</p>
                            <p className="text-gray-600 text-[10px] mt-1 font-bold">{s.sub}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Custom Tabs */}
                <div className="flex gap-2 mb-8 bg-white/5 p-1 rounded-2xl w-fit">
                    {[
                        { id: 'orders', label: 'Active Orders', icon: <Handshake size={16} /> },
                        { id: 'bids', label: 'Incoming Bids', icon: <Gavel size={16} />, count: bids.length },
                        { id: 'projects', label: 'My Listings', icon: <Package size={16} /> },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                        >
                            {tab.icon} {tab.label}
                            {tab.count > 0 && <span className="bg-white/20 px-2 py-0.5 rounded-md text-[10px]">{tab.count}</span>}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="glass-card rounded-[2.5rem] p-8 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 py-10">
                                {[...Array(3)].map((_, i) => <div key={i} className="h-20 glass rounded-3xl animate-pulse"></div>)}
                            </motion.div>
                        ) : activeTab === 'orders' ? (
                            <motion.div
                                key="orders"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                {orders.length === 0 ? (
                                    <EmptyState icon="📦" title="No Active Orders" sub="Your accepted bids and direct orders will appear here." />
                                ) : (
                                    orders.map(order => <OrderRow key={order._id} order={order} />)
                                )}
                            </motion.div>
                        ) : activeTab === 'bids' ? (
                            <motion.div
                                key="bids"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                {bids.length === 0 ? (
                                    <EmptyState icon="⚖️" title="No Active Bids" sub="Enable bidding on your projects to receive auction offers." />
                                ) : (
                                    bids.map(bid => (
                                        <div key={bid._id} className="glass p-6 rounded-[2rem] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary">
                                                    <User size={24} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-white font-black">@{bid.buyer?.username}</p>
                                                        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-500 uppercase tracking-tighter">Verified Buyer</span>
                                                    </div>
                                                    <p className="text-gray-400 text-sm italic mt-1">" {bid.message || 'I am interested in this project.'} "</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col md:items-end">
                                                <p className="text-xs text-gray-500 uppercase font-black tracking-widest mb-1">On: {bid.project?.title}</p>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <p className="text-2xl font-black text-white">Rs {bid.amount.toLocaleString()}</p>
                                                        <p className="text-[10px] text-emerald-500 font-bold">You earn: Rs {Math.round(bid.amount * 0.93).toLocaleString()}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleRespondBid(bid._id, 'accepted')}
                                                            className="p-3 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-xl transition-all"
                                                            title="Accept Bid"
                                                        >
                                                            <CheckCircle size={20} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleRespondBid(bid._id, 'rejected')}
                                                            className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all"
                                                            title="Reject Bid"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="projects"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {projects.length === 0 ? (
                                    <div className="col-span-full"><EmptyState icon="📁" title="No Listings" sub="Start earning by creating your first service listing." /></div>
                                ) : (
                                    projects.map(project => (
                                        <div key={project._id} className="glass p-6 rounded-[2rem] border border-white/5 flex items-center justify-between group hover:border-primary/20 transition-all">
                                            <div>
                                                <h3 className="text-white font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Rs {project.price.toLocaleString()}</span>
                                                    <div className="w-1 h-1 rounded-full bg-white/10"></div>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${project.status === 'active' ? 'text-emerald-500' : 'text-amber-500'}`}>{project.status}</span>
                                                </div>
                                            </div>
                                            <Link to={`/projects/${project._id}`} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                                                <Plus size={18} className="text-gray-400 rotate-45" />
                                            </Link>
                                        </div>
                                    ))
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const OrderRow = ({ order }) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 glass rounded-3xl border border-white/5 hover:bg-white/[0.02] transition-all group">
        <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
                <p className="text-white font-black text-lg">{order.project?.title}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-black uppercase ${order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {order.status}
                </span>
            </div>
            <p className="text-gray-500 text-sm">Buyer: <span className="text-white italic">@{order.buyer?.username}</span> · ID: {order._id.slice(-6).toUpperCase()}</p>
        </div>
        <div className="flex items-center gap-8">
            <div className="text-right">
                <p className="text-xl font-black text-white">Rs {Math.round(order.amount * 0.93).toLocaleString()}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">Proceeds (93%)</p>
            </div>
            {order.status === 'in-progress' && (
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-blue-600/20">
                    Deliver
                </button>
            )}
        </div>
    </div>
);

const EmptyState = ({ icon, title, sub }) => (
    <div className="text-center py-20">
        <p className="text-7xl mb-6 grayscale opacity-40">{icon}</p>
        <h3 className="text-2xl font-black text-white mb-2">{title}</h3>
        <p className="text-gray-500 max-w-xs mx-auto italic">{sub}</p>
    </div>
);

export default SellerDashboard;
