import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Zap, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    return (
        <Link to={`/projects/${project.id || project._id}`}>
            <motion.div
                whileHover={{ y: -8 }}
                className="glass-card flex flex-col rounded-[2.5rem] overflow-hidden group border border-white/5 hover:border-white/10 transition-all duration-500 shadow-xl h-full"
            >
                {/* Project Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                    {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-gray-700 font-black text-2xl uppercase opacity-20 rotate-[-5deg]">
                            Bidlance Preview
                        </div>
                    )}

                    <div className="absolute top-4 left-4">
                        {project.biddingEnabled && (
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-secondary text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-black/50">
                                <Zap size={10} fill="currentColor" /> Live Bidding
                            </span>
                        )}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <div className="w-full py-2.5 bg-white text-dark font-black text-xs rounded-xl uppercase tracking-widest shadow-2xl text-center flex items-center justify-center gap-2">
                            View Project <ArrowUpRight size={14} />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[8px] font-bold text-white uppercase">
                                {project.sellerName?.[0] || 'S'}
                            </div>
                            <span className="text-gray-400 text-xs font-medium truncate max-w-[100px]">@{project.sellerName || 'seller'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-secondary">
                            <Star size={14} fill="currentColor" />
                            <span className="text-xs font-bold">{project.rating || '5.0'}</span>
                        </div>
                    </div>

                    <h3 className="text-white font-bold text-lg mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>

                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Clock size={16} />
                            <span className="text-xs">{project.deliveryTime}</span>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest leading-none">Starting from</p>
                            <p className="text-xl font-black text-white leading-tight mt-1">Rs {project.price?.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProjectCard;
