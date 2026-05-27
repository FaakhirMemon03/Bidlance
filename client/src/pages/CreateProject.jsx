import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    Plus,
    Image as ImageIcon,
    Upload,
    X,
    ArrowRight,
    ArrowLeft,
    Check,
    Clock,
    DollarSign,
    Zap,
    Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { createProjectAPI, uploadProjectImagesAPI } from '../utils/api';

const CATEGORIES = [
    'Web Development',
    'Design & Branding',
    'Mobile Apps',
    'Video & Animation',
    'SEO & Marketing',
    'Writing',
    'Data Science'
];

const CreateProject = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Web Development',
        price: '',
        deliveryTime: '3 Days',
        biddingEnabled: false,
        tags: '',
        images: [] // Array of { url, public_id }
    });

    const [previewImages, setPreviewImages] = useState([]);

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        if (previewImages.length + files.length > 5) {
            return toast.error('Maximum 5 images allowed.');
        }

        setUploading(true);
        const toastId = toast.loading('Uploading images...');

        try {
            const data = new FormData();
            files.forEach(file => data.append('images', file));

            const res = await uploadProjectImagesAPI(data);

            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...res.data.images]
            }));

            // Create local previews for UI
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviewImages(prev => [...prev, ...newPreviews]);

            toast.success('Images uploaded successfully!', { id: toastId });
        } catch (err) {
            toast.error('Failed to upload images.', { id: toastId });
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.images.length) return toast.error('Please upload at least one project image.');

        setLoading(true);
        try {
            const res = await createProjectAPI(formData);
            toast.success('Service listed successfully!');
            navigate('/dashboard/seller');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to list service.');
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-gray-400 text-sm font-semibold mb-2">Service Title</label>
                            <input
                                type="text"
                                placeholder="e.g. I will build a premium Next.js dashboard"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-primary text-white transition-all shadow-inner"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm font-semibold mb-2">Category</label>
                            <select
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-primary text-white transition-all appearance-none cursor-pointer"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                {CATEGORIES.map(cat => <option key={cat} value={cat} className="bg-dark-card">{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm font-semibold mb-2">Description</label>
                            <textarea
                                rows="6"
                                placeholder="Describe your service in detail..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-primary text-white transition-all resize-none shadow-inner"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>
                        <button
                            type="button"
                            disabled={!formData.title || !formData.description}
                            onClick={nextStep}
                            className="w-full py-4 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group"
                        >
                            Next Step <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-400 text-sm font-semibold mb-2">Base Price (Rs)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="number"
                                        placeholder="5,000"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-4 outline-none focus:border-primary text-white"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm font-semibold mb-2">Delivery Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        placeholder="3 Days"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-4 outline-none focus:border-primary text-white"
                                        value={formData.deliveryTime}
                                        onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 glass rounded-3xl border border-white/5 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Zap className="text-secondary" size={24} />
                                    <div>
                                        <h4 className="font-bold">Enable Live Bidding</h4>
                                        <p className="text-xs text-gray-500">Allow buyers to bid on this project</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, biddingEnabled: !formData.biddingEnabled })}
                                    className={`w-14 h-8 rounded-full p-1 transition-all ${formData.biddingEnabled ? 'bg-secondary' : 'bg-gray-700'}`}
                                >
                                    <div className={`w-6 h-6 bg-white rounded-full transition-all ${formData.biddingEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm font-semibold mb-2">Tags (Comma separated)</label>
                            <input
                                type="text"
                                placeholder="react, web-dev, dashboard"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-primary text-white"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="w-1/3 py-4 glass hover:bg-white/10 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                            >
                                <ArrowLeft size={20} /> Back
                            </button>
                            <button
                                type="button"
                                disabled={!formData.price || !formData.deliveryTime}
                                onClick={nextStep}
                                className="w-2/3 py-4 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group"
                            >
                                Next Step <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                <ImageIcon className="text-primary" size={40} />
                            </div>
                            <h3 className="text-xl font-bold">Upload Project Images</h3>
                            <p className="text-gray-500 text-sm">Add up to 5 eye-catching images of your work.</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {previewImages.map((src, i) => (
                                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden glass group">
                                    <img src={src} alt="preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        className="absolute top-2 right-2 bg-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={14} className="text-white" />
                                    </button>
                                </div>
                            ))}

                            {previewImages.length < 5 && (
                                <label className="cursor-pointer aspect-square rounded-2xl border-2 border-dashed border-white/10 hover:border-primary transition-all flex flex-col items-center justify-center gap-2 hover:bg-primary/5">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    {uploading ? <Loader2 className="animate-spin text-primary" size={24} /> : <Upload className="text-gray-500" size={24} />}
                                    <span className="text-xs text-gray-500">Upload</span>
                                </label>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="w-1/3 py-4 glass hover:bg-white/10 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                            >
                                <ArrowLeft size={20} /> Back
                            </button>
                            <button
                                type="submit"
                                disabled={loading || !formData.images.length}
                                onClick={handleSubmit}
                                className="w-2/3 py-4 bg-secondary hover:bg-secondary-dark disabled:opacity-50 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <><Check size={20} /> List Project</>}
                            </button>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="pt-24 pb-20 min-h-screen container mx-auto px-6 max-w-4xl">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">List Your <span className="gradient-text">Service</span></h1>
                <div className="flex items-center gap-1">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-1">
                            <div className={`h-2 rounded-full transition-all duration-500 ${step >= i ? 'w-12 bg-primary' : 'w-2 bg-white/10'}`} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass-card p-8 md:p-12 rounded-[2.5rem] relative">
                <div className="absolute -z-10 top-0 left-0 w-full h-full bg-primary/5 blur-[100px] rounded-full"></div>
                {renderStep()}
            </div>
        </div>
    );
};

export default CreateProject;
