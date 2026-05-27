import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Zap } from 'lucide-react';

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="glass-card rounded-[2rem] overflow-hidden group transition-all"
        >
            {/* Thumbnail Area */}
            <div className="h-52 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-black text-2xl uppercase opacity-20 rotate-[-15deg]">
                        Bidlance Preview
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {project.biddingEnabled && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-secondary text-white text-[10px] font-black rounded-full uppercase tracking-tighter">
                            <Zap size={10} fill="white" /> Live Auction
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                    <span className="text-gray-400 text-xs font-medium">@{project.sellerName}</span>
                    <div className="ml-auto flex items-center gap-1">
                        <Star size={12} className="text-accent fill-accent" />
                        <span className="text-white text-xs font-bold">{project.rating || '5.0'}</span>
                    </div>
                </div>

                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                    {project.title}
                </h3>

                <div className="flex items-center gap-4 text-gray-500 text-xs mb-6">
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{project.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Zap size={14} />
                        <span>{project.ordersCount || 0} Orders</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-gray-600 uppercase font-black">Starting At</p>
                        <p className="text-xl font-black text-white">Rs {project.price.toLocaleString()}</p>
                    </div>
                    <button className="p-3 bg-white/5 hover:bg-primary hover:text-white rounded-xl transition-all text-gray-400">
                        <Zap size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
