import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Camera,
    FileText,
    Shield,
    Lock,
    ChevronRight,
    Loader2,
    CheckCircle,
    ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getMeAPI, uploadAvatarAPI, uploadCvAPI } from '../utils/api';
import { setUser } from '../store/authSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const [loading, setLoading] = useState(false);
    const [updatingAvatar, setUpdatingAvatar] = useState(false);
    const [updatingCV, setUpdatingCV] = useState(false);

    const fetchProfile = async () => {
        try {
            const res = await getMeAPI();
            dispatch(setUser({ user: res.data.user, token: localStorage.getItem('bidlance_token') }));
        } catch (err) {
            console.error(err);
        }
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUpdatingAvatar(true);
        const toastId = toast.loading('Updating photo...');
        try {
            const formData = new FormData();
            formData.append('avatar', file);
            const res = await uploadAvatarAPI(formData);

            toast.success('Profile photo updated!', { id: toastId });
            fetchProfile();
        } catch (err) {
            toast.error('Failed to upload image.', { id: toastId });
        } finally {
            setUpdatingAvatar(false);
        }
    };

    const handleCvUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUpdatingCV(true);
        const toastId = toast.loading('Uploading CV...');
        try {
            const formData = new FormData();
            formData.append('cv', file);
            const res = await uploadCvAPI(formData);

            toast.success('CV uploaded successfully!', { id: toastId });
            fetchProfile();
        } catch (err) {
            toast.error('Failed to upload PDF.', { id: toastId });
        } finally {
            setUpdatingCV(false);
        }
    };

    return (
        <div className="pt-24 pb-20 min-h-screen container mx-auto px-6 max-w-4xl">
            <div className="mb-10">
                <h1 className="text-4xl font-bold">Account <span className="gradient-text">Settings</span></h1>
                <p className="text-gray-500">Manage your profile, identity, and security preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-card p-8 rounded-[2.5rem] text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>

                        <div className="relative inline-block mb-6 group">
                            <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-4xl font-black text-white overflow-hidden shadow-2xl border-4 border-white/5">
                                {user?.avatar ? (
                                    <img src={user.avatar} className="w-full h-full object-cover" />
                                ) : (
                                    user?.name?.[0]
                                )}
                                {updatingAvatar && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <Loader2 className="animate-spin text-white" size={24} />
                                    </div>
                                )}
                            </div>
                            <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary hover:bg-primary-dark text-white rounded-xl flex items-center justify-center cursor-pointer transition-all shadow-xl shadow-primary/30 active:scale-95 group-hover:scale-110">
                                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                                <Camera size={18} />
                            </label>
                        </div>

                        <h2 className="text-xl font-bold text-white mb-1">{user?.name}</h2>
                        <p className="text-gray-500 text-sm mb-4">@{user?.username || 'username'}</p>

                        <div className="flex items-center justify-center gap-2 px-4 py-1.5 glass rounded-full w-fit mx-auto mb-6">
                            <Shield className="text-secondary" size={14} />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{user?.role} Account</span>
                        </div>

                        <div className="pt-6 border-t border-white/5 text-left space-y-4">
                            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tighter">
                                <span className="text-gray-600">ID Verification</span>
                                <span className="text-emerald-400">Verified</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tighter">
                                <span className="text-gray-600">Member Since</span>
                                <span className="text-white">{new Date(user?.createdAt).getFullYear() || '2024'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Settings Sections */}
                <div className="lg:col-span-2 space-y-6">

                    {/* General Info */}
                    <div className="glass-card p-8 rounded-[2.5rem]">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <User size={20} className="text-primary" /> General Information
                        </h3>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-600 text-xs font-black uppercase mb-2">Display Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                                        <input
                                            type="text"
                                            value={user?.name || ''}
                                            disabled
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white opacity-60"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-600 text-xs font-black uppercase mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                                        <input
                                            type="email"
                                            value={user?.email || ''}
                                            disabled
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white opacity-60"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-600 text-xs font-black uppercase mb-2">Professional Bio</label>
                                <textarea
                                    rows="4"
                                    placeholder="Tell clients about your expertise..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-primary text-white transition-all resize-none shadow-inner"
                                    defaultValue={user?.bio}
                                />
                                <button className="mt-4 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-all border border-white/5">
                                    Save Bio
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Verification & Documents */}
                    <div className="glass-card p-8 rounded-[2.5rem]">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <FileText size={20} className="text-secondary" /> Documents & Verification
                        </h3>

                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
                                    <FileText className="text-secondary" size={24} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Professional CV / Resume</p>
                                    <p className="text-gray-500 text-xs">{user?.cv ? 'Resume is uploaded and visible to clients.' : 'Upload your resume to attract high-value clients.'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {user?.cv && (
                                    <a href={user.cv} target="_blank" rel="noreferrer" className="p-2.5 glass rounded-xl hover:bg-white/10 text-white transition-all">
                                        <ExternalLink size={18} />
                                    </a>
                                )}
                                <label className="px-5 py-2.5 bg-secondary hover:bg-secondary-dark text-white text-xs font-black rounded-xl cursor-pointer transition-all shadow-lg shadow-secondary/20 flex items-center gap-2">
                                    <input type="file" className="hidden" accept=".pdf" onChange={handleCvUpload} />
                                    {updatingCV ? <Loader2 className="animate-spin" size={14} /> : user?.cv ? 'Update CV' : 'Upload CV'}
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="glass-card p-8 rounded-[2.5rem]">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Lock size={20} className="text-primary" /> Security & Access
                        </h3>

                        <div className="space-y-3">
                            {[
                                { label: 'Two-Factor Authentication', status: 'Disabled', action: 'Enable', color: 'text-gray-500' },
                                { label: 'Payment Method', status: 'JazzCash / Easypaisa', action: 'Manage', color: 'text-emerald-400' },
                                { label: 'Password', status: 'Last changed 3 months ago', action: 'Change', color: 'text-gray-500' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 glass rounded-2xl">
                                    <div>
                                        <p className="text-white font-bold text-sm">{item.label}</p>
                                        <p className={`${item.color} text-[10px] font-bold uppercase tracking-wider mt-0.5`}>{item.status}</p>
                                    </div>
                                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-all border border-white/5">
                                        {item.action}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
