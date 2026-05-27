import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    Clock,
    Star,
    ShieldCheck,
    ArrowRight,
    DollarSign,
    MapPin,
    User,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    Loader2
} from 'lucide-react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getProjectAPI, getProjectBidsAPI, placeBidAPI, createOrderAPI } from '../utils/api';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useSelector(state => state.auth);

    const [project, setProject] = useState(null);
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bidAmount, setBidAmount] = useState('');
    const [placingBid, setPlacingBid] = useState(false);
    const [buying, setBuying] = useState(false);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const socketRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projRes, bidsRes] = await Promise.all([
                    getProjectAPI(id),
                    getProjectBidsAPI(id)
                ]);
                setProject(projRes.data.project);
                setBids(bidsRes.data.bids);
            } catch (err) {
                toast.error('Failed to load project details.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Socket Setup
        socketRef.current = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001');
        socketRef.current.emit('joinBidRoom', id);

        socketRef.current.on('newBid', (newBid) => {
            setBids(prev => [newBid, ...prev].sort((a, b) => b.amount - a.amount));
            toast('New bid placed!', { icon: '🔥', position: 'bottom-right' });
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.emit('leaveBidRoom', id);
                socketRef.current.disconnect();
            }
        };
    }, [id]);

    const handlePlaceBid = async (e) => {
        e.preventDefault();
        if (!token) return navigate('/login');
        if (!bidAmount || isNaN(bidAmount)) return toast.error('Enter a valid amount.');

        setPlacingBid(true);
        try {
            await placeBidAPI({ projectId: id, amount: Number(bidAmount) });
            toast.success('Bid placed successfully!');
            setBidAmount('');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to place bid.');
        } finally {
            setPlacingBid(false);
        }
    };

    const handleBuyNow = async () => {
        if (!token) return navigate('/login');
        setBuying(true);
        try {
            await createOrderAPI({ projectId: id });
            toast.success('Order placed! Money is now in escrow.');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Purchase failed.');
        } finally {
            setBuying(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 size={48} className="animate-spin text-primary" />
        </div>
    );

    if (!project) return (
        <div className="min-h-screen flex items-center justify-center text-center">
            <div>
                <h1 className="text-4xl font-bold mb-4">Project not found</h1>
                <Link to="/explore" className="text-primary hover:underline">Go back to Explore</Link>
            </div>
        </div>
    );

    const images = project.images?.length > 0 ? project.images.map(img => typeof img === 'string' ? img : img.url) : [null];
    const highestBid = bids.length > 0 ? Math.max(...bids.map(b => b.amount)) : 0;

    return (
        <div className="pt-24 pb-20 min-h-screen container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left Column: Images & Info */}
                <div className="lg:col-span-2 space-y-10">
                    {/* image Gallery */}
                    <div className="relative group">
                        <div className="aspect-video rounded-[2.5rem] overflow-hidden glass border border-white/5 relative shadow-2xl">
                            {images[currentImgIndex] ? (
                                <img src={images[currentImgIndex]} alt="Project" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-700 font-black text-4xl opacity-10 uppercase rotate-[-5deg]">
                                    Bidlance Preview
                                </div>
                            )}

                            {/* Overlay Badges */}
                            <div className="absolute top-6 left-6 flex gap-3">
                                <span className="px-5 py-2 glass rounded-full text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                                    {project.category}
                                </span>
                                {project.biddingEnabled && (
                                    <span className="px-5 py-2 bg-secondary text-white text-xs font-black rounded-full uppercase tracking-widest shadow-lg shadow-secondary/30 flex items-center gap-2">
                                        <Zap size={14} fill="currentColor" /> Live Auction
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Gallery Navigation */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={() => setCurrentImgIndex(prev => (prev - 1 + images.length) % images.length)}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={() => setCurrentImgIndex(prev => (prev + 1) % images.length)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10"
                                >
                                    <ChevronRight size={24} />
                                </button>

                                {/* Thumbnails */}
                                <div className="flex gap-4 mt-6">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImgIndex(idx)}
                                            className={`w-24 h-16 rounded-xl overflow-hidden glass transition-all ${idx === currentImgIndex ? 'ring-2 ring-primary scale-105' : 'opacity-50 hover:opacity-100'}`}
                                        >
                                            <img src={img} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Description */}
                    <div className="glass-card p-10 rounded-[2.5rem]">
                        <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-white">{project.title}</h1>
                        <div className="flex flex-wrap items-center gap-6 mb-8 border-b border-white/5 pb-8">
                            <div className="flex items-center gap-2">
                                <Star size={18} className="text-secondary fill-secondary" />
                                <span className="text-white font-bold">{project.seller?.rating || '5.0'}</span>
                                <span className="text-gray-500">(24 Reviews)</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Clock size={18} />
                                <span>Delivery: <strong className="text-white">{project.deliveryTime}</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <ShieldCheck size={18} className="text-primary" />
                                <span className="text-primary font-bold">Escrow Protected</span>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-4 text-white">Project Overview</h3>
                        <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-wrap">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-8">
                            {project.tags?.map(tag => (
                                <span key={tag} className="px-4 py-2 glass rounded-xl text-gray-400 text-sm font-medium">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Pricing & Bidding */}
                <div className="space-y-8">
                    {/* Main Action Card */}
                    <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

                        <div className="mb-8">
                            <p className="text-gray-500 text-sm mb-1 uppercase font-black">Base Price</p>
                            <h2 className="text-5xl font-black text-white">Rs {project.price?.toLocaleString()}</h2>
                        </div>

                        <div className="space-y-4 mb-8">
                            <button
                                onClick={handleBuyNow}
                                disabled={buying}
                                className="w-full py-5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2 group"
                            >
                                {buying ? <Loader2 size={24} className="animate-spin" /> : <>Buy Service <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} /></>}
                            </button>
                            <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest font-bold">+ 4% BUYER COMMISSION (ESCROW)</p>
                        </div>

                        <div className="border-t border-white/5 pt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <MessageSquare className="text-secondary" size={20} />
                                <h4 className="font-bold text-white">Need customization?</h4>
                            </div>
                            <button className="w-full py-4 glass hover:bg-white/10 text-white rounded-2xl font-bold transition-all">
                                Contact Seller
                            </button>
                        </div>
                    </div>

                    {/* Bidding Section */}
                    {project.biddingEnabled && (
                        <div className="glass-card p-8 rounded-[2.5rem] border border-secondary/20 shadow-xl shadow-secondary/5">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="text-secondary" size={24} />
                                    <h3 className="text-xl font-bold text-white">Live Bidding</h3>
                                </div>
                                <span className="flex h-3 w-3 rounded-full bg-secondary animate-pulse"></span>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-5 mb-8 border border-white/5">
                                <p className="text-gray-500 text-xs mb-1 font-bold uppercase">Highest Bid</p>
                                <p className="text-3xl font-black text-secondary">Rs {highestBid.toLocaleString() || '0'}</p>
                            </div>

                            <form onSubmit={handlePlaceBid} className="space-y-4 mb-8">
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="number"
                                        placeholder="Enter bid amount"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary text-white font-bold"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={placingBid}
                                    className="w-full py-4 bg-secondary hover:bg-secondary-dark text-white rounded-2xl font-bold transition-all shadow-lg shadow-secondary/20"
                                >
                                    {placingBid ? <Loader2 size={20} className="animate-spin mx-auto" /> : 'Place New Bid'}
                                </button>
                            </form>

                            {/* Bids List */}
                            <div className="space-y-3 max-h-64 overflow-y-auto pr-2 scrollbar-thin">
                                {bids.length === 0 ? (
                                    <p className="text-center text-gray-600 text-sm py-4 italic">No bids yet. Be the first!</p>
                                ) : (
                                    bids.map((bid, i) => (
                                        <motion.div
                                            key={bid._id || i}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={`flex items-center justify-between p-3 rounded-xl ${i === 0 ? 'bg-secondary/10 border border-secondary/20' : 'bg-white/5'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                                    {bid.buyer?.name?.[0] || 'U'}
                                                </div>
                                                <div>
                                                    <p className="text-white text-xs font-bold">@{bid.buyer?.username || 'user'}</p>
                                                    <p className="text-[10px] text-gray-500">{i === 0 ? 'Highest Bidder' : 'Bidder'}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm font-black text-white">Rs {bid.amount?.toLocaleString()}</p>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* Seller Card */}
                    <div className="glass-card p-8 rounded-[2.5rem]">
                        <h4 className="text-xs font-black text-gray-600 uppercase tracking-widest mb-6">About Seller</h4>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xl font-black text-white overflow-hidden shadow-lg">
                                {project.seller?.avatar ? <img src={project.seller.avatar} className="w-full h-full object-cover" /> : project.seller?.name?.[0]}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{project.seller?.name}</h3>
                                <p className="text-primary text-xs font-bold">Verified Pro Seller</p>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm line-clamp-3 mb-6">
                            {project.seller?.bio || 'Professional freelancer committed to delivering high-quality results on time.'}
                        </p>
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                            <div className="flex flex-col items-center gap-1 bg-white/5 p-3 rounded-xl flex-1">
                                <Star size={14} className="text-secondary fill-secondary" />
                                <span>4.9/5</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 bg-white/5 p-3 rounded-xl flex-1">
                                <Clock size={14} />
                                <span>2h Sync</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 bg-white/5 p-3 rounded-xl flex-1">
                                <MapPin size={14} />
                                <span>Pakistan</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectDetails;
