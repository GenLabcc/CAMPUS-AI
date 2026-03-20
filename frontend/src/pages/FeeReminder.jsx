import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, AlertTriangle, CheckCircle, Clock, Bell, Download, Briefcase, TrendingUp } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { ProgressBar } from '../components/UIComponents';
import { fadeUp } from '../components/AnimatedComponents';
import { useAuth } from '../context/AuthContext';

const feeItems = [
    { key: 'semester_fee', amount: 45000, paid: 32500, due: 12500, dueDate: '20 Mar 2025', status: 'pending' },
    { key: 'hostel_fee', amount: 18000, paid: 18000, due: 0, dueDate: '15 Jan 2025', status: 'paid' },
    { key: 'exam_fee', amount: 850, paid: 0, due: 850, dueDate: '25 Mar 2025', status: 'pending' },
];

const teacherSalary = {
    gross: 75000,
    net: 64200,
    deductions: 10800,
    nextPayday: 'Mar 01, 2025',
    history: [
        { month: 'February 2025', amount: 64200, status: 'Credited', date: 'Feb 01, 2025' },
        { month: 'January 2025', amount: 64200, status: 'Credited', date: 'Jan 01, 2025' },
        { month: 'December 2024', amount: 68500, status: 'Credited', date: 'Dec 01, 2024' },
    ]
};

export default function FeeReminder() {
    const { t } = useTranslation();
    const { isAdmin } = useAuth();
    const [payModal, setPayModal] = useState(null);

    const totalDue = feeItems.reduce((a, f) => a + f.due, 0);

    return (
        <div className="min-h-screen bg-transparent text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
            <Sidebar />
            <Navbar />
            <main className="lg:pl-[230px] pt-20 p-4 lg:p-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block ${isAdmin ? 'bg-indigo-500' : 'bg-red-500'} text-white`}>
                                {isAdmin ? 'Salary Structure' : 'Financial Obligations'}
                            </span>
                            <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-800 dark:text-white tracking-tighter italic uppercase leading-none">
                                {isAdmin ? 'Salary' : 'Fee'} <span className="gradient-text italic">{isAdmin ? 'Structure' : 'Reminders'}</span>
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-3 uppercase tracking-widest">
                                {isAdmin ? 'Review your monthly earnings, bonus structures and tax deductions' : 'Track your pending academic fees and payment history'}
                            </p>
                        </div>
                        {isAdmin && (
                            <button
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = '#';
                                    link.setAttribute('download', 'Salary_Slip_March_2025.pdf');
                                    document.body.appendChild(link);
                                    alert('Downloading Salary Slip for March 2025...');
                                    // link.click(); // In a real app, this would be a real PDF URL
                                }}
                                className="h-12 px-8 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl border border-slate-200 dark:border-white/10 hover:scale-105 transition-all"
                            >
                                <Download className="w-4 h-4 text-primary-500" /> Pay Slip PDF
                            </button>
                        )}
                    </div>

                    {isAdmin ? (
                        /* ADMIN (SALARY) VIEW */
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <motion.div variants={fadeUp} className="glass-card rounded-[2.5rem] p-8 border border-white/10 shadow-2xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                                            <Briefcase className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gross Salary</p>
                                            <p className="text-2xl font-black text-slate-800 dark:text-white italic tracking-tighter">₹{teacherSalary.gross.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <ProgressBar value={100} label="Full Package" color="primary" />
                                </motion.div>

                                <motion.div variants={fadeUp} className="glass-card rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <TrendingUp className="w-20 h-20 text-emerald-500" />
                                    </div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                            <CheckCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Credited</p>
                                            <p className="text-2xl font-black text-emerald-500 italic tracking-tighter">₹{teacherSalary.net.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Last credited on Feb 01</p>
                                </motion.div>

                                <motion.div variants={fadeUp} className="glass-card rounded-[2.5rem] p-8 border border-white/10 shadow-2xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Payday</p>
                                            <p className="text-2xl font-black text-orange-500 italic tracking-tighter">{teacherSalary.nextPayday}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Payroll Processing</span>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-8 border border-white/10 shadow-xl">
                                    <h2 className="font-black text-xl text-slate-800 dark:text-white uppercase tracking-tight italic mb-8 flex items-center gap-3">
                                        <div className="w-1.5 h-8 bg-primary-500 rounded-full" /> Payment History
                                    </h2>
                                    <div className="space-y-4">
                                        {teacherSalary.history.map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-5 rounded-[2rem] bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary-500/30 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                                        <CheckCircle className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-sm text-slate-800 dark:text-white uppercase tracking-tight">{item.month}</p>
                                                        {/* eslint-disable-next-line react-hooks/purity */}
                                                        <p className="text-[10px] font-bold text-slate-500 italic uppercase">Ref ID: SAL-{Math.floor(Math.random() * 10000)}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-black text-base text-emerald-500 italic tracking-tighter">₹{item.amount.toLocaleString()}</p>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="glass-card rounded-[2.5rem] p-8 border border-white/10 shadow-xl flex flex-col gap-6">
                                    <h2 className="font-black text-xl text-slate-800 dark:text-white uppercase tracking-tight italic">Breakdown</h2>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-xs font-bold">
                                            <span className="text-slate-500 uppercase tracking-widest italic">Basic Pay</span>
                                            <span className="dark:text-white text-slate-800">₹45,000</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs font-bold">
                                            <span className="text-slate-500 uppercase tracking-widest italic">HRA</span>
                                            <span className="dark:text-white text-slate-800">₹15,000</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs font-bold">
                                            <span className="text-slate-500 uppercase tracking-widest italic">Special Allowance</span>
                                            <span className="dark:text-white text-slate-800">₹15,000</span>
                                        </div>
                                        <div className="h-px bg-slate-200 dark:bg-white/10 my-2" />
                                        <div className="flex justify-between items-center text-xs font-bold">
                                            <span className="text-red-500 uppercase tracking-widest italic font-black">Total Deductions</span>
                                            <span className="text-red-500">₹{teacherSalary.deductions.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="mt-auto p-5 rounded-[1.5rem] bg-primary-500/10 border border-primary-500/20 text-center">
                                        <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-1 italic">Annual Package</p>
                                        <p className="text-2xl font-black text-slate-800 dark:text-white italic tracking-tighter">₹9.0 LPA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* STUDENT (FEES) VIEW */
                        <div className="space-y-8">
                            {totalDue > 0 && (
                                <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity }} className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-4">
                                    <AlertTriangle className="w-5 h-5 text-red-500 shadow-glow" />
                                    <p className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-widest italic">Important: Please clear pending dues of ₹{totalDue.toLocaleString()} by Mar 20.</p>
                                </motion.div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {feeItems.map((fee, i) => (
                                    <motion.div key={i} whileHover={{ y: -5 }} className="glass-card rounded-[2rem] p-6 border border-white/10 shadow-xl overflow-hidden relative group">
                                        <div className={`absolute top-0 right-0 w-20 h-20 opacity-5 blur-2xl transition-opacity group-hover:opacity-20 ${fee.status === 'paid' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className="font-black text-base text-slate-800 dark:text-white uppercase tracking-tight italic leading-tight">{t(`fees.${fee.key}`)}</h3>
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${fee.status === 'paid' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-orange-500/20 text-orange-500'}`}>{fee.status}</span>
                                            </div>
                                            {fee.status === 'paid' ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <Clock className="w-5 h-5 text-orange-500" />}
                                        </div>
                                        <div className="mb-6">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Amount</p>
                                            <p className="text-2xl font-black text-slate-800 dark:text-white italic tracking-tighter">₹{fee.amount.toLocaleString()}</p>
                                        </div>
                                        {fee.due > 0 ? (
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">Pending</p>
                                                        <p className="text-xl font-black text-red-500 italic tracking-tighter leading-none">₹{fee.due.toLocaleString()}</p>
                                                    </div>
                                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Due: {fee.dueDate}</p>
                                                </div>
                                                <button onClick={() => setPayModal(fee)} className="w-full py-3 rounded-xl bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-500/30 hover:scale-[1.02] transition-all">Pay Now</button>
                                            </div>
                                        ) : (
                                            <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10 text-center">
                                                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1 justify-end"><CheckCircle className="w-3 h-3"/> Fully Cleared</p>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </main>

            {/* Pay Modal Placeholder */}
            {payModal && (
                <div onClick={() => setPayModal(null)} className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div onClick={e => e.stopPropagation()} className="glass-card rounded-[3rem] p-10 max-w-md w-full border border-white/20 shadow-glass-dark text-center">
                        <CreditCard className="w-16 h-16 text-primary-500 mx-auto mb-6" />
                        <h2 className="font-black text-2xl text-slate-800 dark:text-white uppercase tracking-tight italic mb-2">Secure Payment</h2>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-8">Processing payment for {t(`fees.${payModal.key}`)}</p>
                        <div className="bg-slate-100 dark:bg-white/5 rounded-2xl p-6 mb-8 text-left border border-slate-200 dark:border-white/10">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Payable Amount</p>
                            <p className="text-3xl font-black text-slate-800 dark:text-white italic tracking-tighter">₹{payModal.due.toLocaleString()}</p>
                        </div>
                        <button onClick={() => setPayModal(null)} className="w-full h-14 rounded-2xl bg-primary-500 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary-500/30">Complete Transaction</button>
                    </div>
                </div>
            )}
        </div>
    );
}
