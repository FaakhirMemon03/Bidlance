import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, ShoppingBag, Clock, CheckCircle, AlertCircle, Loader2, Plus, Minus } from 'lucide-react';
import { getWalletAPI, getTransactionsAPI, depositAPI, withdrawAPI } from '../utils/api';
import toast from 'react-hot-toast';

const WalletPage = () => {
    const { user } = useSelector(state => state.auth);
    const [wallet, setWallet] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState('');
    const [actionType, setActionType] = useState('deposit');
    const [actionLoading, setActionLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [wRes, tRes] = await Promise.all([getWalletAPI(), getTransactionsAPI()]);
            setWallet(wRes.data.wallet);
            setTransactions(tRes.data.transactions);
        } catch {
            // Demo data if API not connected
            setWallet({ balance: 50000, pendingBalance: 10000, withdrawableBalance: 40000 });
            setTransactions([
                { _id: '1', type: 'deposit', amount: 50000, status: 'completed', description: 'Wallet deposit', createdAt: new Date().toISOString() },
                { _id: '2', type: 'payment_sent', amount: 10000, status: 'completed', description: 'Payment for: Logo Design', createdAt: new Date().toISOString() },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleAction = async (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error('Enter a valid amount.');
        setActionLoading(true);
        try {
            if (actionType === 'deposit') {
                await depositAPI({ amount: Number(amount) });
                toast.success(`Rs ${Number(amount).toLocaleString()} deposited successfully!`);
            } else {
                await withdrawAPI({ amount: Number(amount) });
                toast.success('Withdrawal request submitted!');
            }
            setAmount('');
            fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Action failed.');
        } finally {
            setActionLoading(false);
        }
    };

    const typeIcon = (type) => {
        switch (type) {
            case 'deposit': return <ArrowDownLeft className="text-emerald-400" size={16} />;
            case 'withdrawal': return <ArrowUpRight className="text-red-400" size={16} />;
            case 'payment_sent': return <ShoppingBag className="text-amber-400" size={16} />;
            case 'payment_received': return <CheckCircle className="text-emerald-400" size={16} />;
            default: return <Clock className="text-gray-400" size={16} />;
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 size={48} className="animate-spin text-indigo-500" />
        </div>
    );

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-2">My <span className="gradient-text">Wallet</span></h1>
                    <p className="text-gray-500">Manage your funds, deposits, and withdrawals.</p>
                </div>

                {/* Balance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                        { label: 'Total Balance', value: wallet?.balance, color: 'from-indigo-600 to-purple-600', icon: <Wallet size={28} /> },
                        { label: 'Pending (Escrow)', value: wallet?.pendingBalance, color: 'from-amber-600 to-orange-600', icon: <Clock size={28} /> },
                        { label: 'Withdrawable', value: wallet?.withdrawableBalance, color: 'from-emerald-600 to-teal-600', icon: <CheckCircle size={28} /> },
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-6 rounded-3xl"
                        >
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-4`}>
                                {card.icon}
                            </div>
                            <p className="text-gray-500 text-sm mb-1">{card.label}</p>
                            <p className="text-3xl font-black text-white">Rs {(card.value || 0).toLocaleString()}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Action Form */}
                    <div className="lg:col-span-1">
                        <div className="glass-card p-6 rounded-3xl">
                            <h2 className="text-lg font-bold mb-6 text-white">Quick Transfer</h2>
                            <div className="flex gap-2 mb-6">
                                <button onClick={() => setActionType('deposit')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1 ${actionType === 'deposit' ? 'bg-emerald-600 text-white' : 'glass text-gray-400'}`}>
                                    <Plus size={16} /> Deposit
                                </button>
                                <button onClick={() => setActionType('withdraw')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1 ${actionType === 'withdraw' ? 'bg-red-600 text-white' : 'glass text-gray-400'}`}>
                                    <Minus size={16} /> Withdraw
                                </button>
                            </div>
                            <form onSubmit={handleAction} className="space-y-4">
                                <div>
                                    <label className="block text-gray-500 text-xs mb-2 uppercase font-bold">Amount (Rs)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 10000"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        min="100"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-indigo-500 text-white text-sm"
                                        required
                                    />
                                </div>
                                <button type="submit" disabled={actionLoading} className={`w-full py-3 rounded-xl font-bold text-sm text-white transition-all ${actionType === 'deposit' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}>
                                    {actionLoading ? <Loader2 size={18} className="animate-spin mx-auto" /> : `Confirm ${actionType === 'deposit' ? 'Deposit' : 'Withdrawal'}`}
                                </button>
                            </form>
                            <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                                <p className="text-amber-400 text-xs font-bold mb-1">⚠️ Fee Reminder</p>
                                <p className="text-gray-400 text-xs">As a buyer: 4% platform fee applies on purchases. As a seller: 7% commission is deducted on completed orders.</p>
                            </div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="lg:col-span-2">
                        <div className="glass-card p-6 rounded-3xl">
                            <h2 className="text-lg font-bold mb-6 text-white">Transaction History</h2>
                            {transactions.length === 0 ? (
                                <div className="text-center py-12 text-gray-600">
                                    <p className="text-4xl mb-3">📭</p>
                                    <p>No transactions yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
                                    {transactions.map((tx) => (
                                        <div key={tx._id} className="flex items-center gap-4 p-4 glass rounded-2xl">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                                {typeIcon(tx.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-sm font-medium truncate">{tx.description}</p>
                                                <p className="text-gray-500 text-xs">{new Date(tx.createdAt).toLocaleDateString('en-PK')}</p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className={`font-bold ${tx.type === 'deposit' || tx.type === 'payment_received' ? 'text-emerald-400' : 'text-red-400'}`}>
                                                    {tx.type === 'deposit' || tx.type === 'payment_received' ? '+' : '-'}Rs {tx.amount.toLocaleString()}
                                                </p>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${tx.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                                    {tx.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletPage;
