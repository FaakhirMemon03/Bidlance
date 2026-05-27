import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Zap, SlidersHorizontal } from 'lucide-react';
import { getProjectsAPI } from '../utils/api';
import ProjectCard from '../components/ProjectCard';

const CATEGORIES = ['All', 'Web Development', 'Design & Branding', 'Mobile Apps', 'Video & Animation', 'SEO & Marketing', 'Writing', 'Data Science'];

const Explore = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [biddingOnly, setBiddingOnly] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const params = { page, limit: 9 };
            if (search) params.search = search;
            if (category && category !== 'All') params.category = category;
            if (biddingOnly) params.bidding = true;

            const res = await getProjectsAPI(params);
            setProjects(res.data.projects);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            // Show sample data if backend not connected
            setProjects([
                { _id: '1', title: 'Premium SaaS Dashboard with Next.js', seller: { name: 'Ahmed Ali', username: 'ahmed_dev' }, price: 25000, deliveryTime: '3 Days', biddingEnabled: true, rating: 4.9 },
                { _id: '2', title: 'Professional Logo & Brand Identity', seller: { name: 'Sara Khan', username: 'sara_design' }, price: 12000, deliveryTime: '2 Days', biddingEnabled: false, rating: 5.0 },
                { _id: '3', title: 'Flutter Mobile App Development', seller: { name: 'Ali Raza', username: 'ali_flutter' }, price: 65000, deliveryTime: '10 Days', biddingEnabled: true, rating: 4.8 },
                { _id: '4', title: 'SEO & Google Rankings Boost Package', seller: { name: 'Zara Malik', username: 'zara_seo' }, price: 8000, deliveryTime: '14 Days', biddingEnabled: false, rating: 4.7 },
                { _id: '5', title: 'React.js E-commerce Platform', seller: { name: 'Usman Dev', username: 'usman_dev' }, price: 95000, deliveryTime: '15 Days', biddingEnabled: true, rating: 4.9 },
                { _id: '6', title: 'Video Editing & Reels Production', seller: { name: 'Hina Creative', username: 'hina_video' }, price: 5000, deliveryTime: '1 Day', biddingEnabled: false, rating: 4.6 },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProjects(); }, [page, category, biddingOnly]);

    const handleSearch = (e) => { e.preventDefault(); fetchProjects(); };

    return (
        <div className="pt-24 pb-20 min-h-screen">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900 border-b border-white/5 py-12">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                        Explore <span className="gradient-text">Services & Auctions</span>
                    </h1>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">Browse thousands of professional services or join live bidding auctions.</p>
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="text"
                                placeholder="Search for any skill, service, or project..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500 text-white placeholder:text-gray-600 text-sm"
                            />
                        </div>
                        <button type="submit" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors">Search</button>
                    </form>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-10">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                    <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
                        <SlidersHorizontal size={16} /> Filters:
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => { setCategory(cat === 'All' ? '' : cat); setPage(1); }}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${(cat === 'All' && !category) || category === cat ? 'bg-indigo-600 text-white' : 'glass text-gray-400 hover:text-white'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => { setBiddingOnly(!biddingOnly); setPage(1); }}
                        className={`ml-auto flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${biddingOnly ? 'bg-emerald-600 text-white' : 'glass text-gray-400 hover:text-white'}`}
                    >
                        <Zap size={14} fill={biddingOnly ? 'white' : 'none'} /> Live Auctions Only
                    </button>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="glass rounded-3xl h-80 animate-pulse"></div>
                        ))}
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-24 text-gray-500">
                        <p className="text-6xl mb-4">🔍</p>
                        <p className="text-xl font-bold mb-2 text-white">No projects found</p>
                        <p>Try different filters or search terms.</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {projects.map((project) => (
                            <ProjectCard key={project._id} project={{
                                id: project._id,
                                title: project.title,
                                sellerName: project.seller?.username || 'seller',
                                price: project.price,
                                deliveryTime: project.deliveryTime,
                                biddingEnabled: project.biddingEnabled,
                                rating: project.rating || 5.0
                            }} />
                        ))}
                    </motion.div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-12">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-5 py-2 glass rounded-xl text-sm disabled:opacity-30 hover:bg-white/10 transition-colors">← Prev</button>
                        <span className="text-gray-500 text-sm">Page {page} of {totalPages}</span>
                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-5 py-2 glass rounded-xl text-sm disabled:opacity-30 hover:bg-white/10 transition-colors">Next →</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Explore;
