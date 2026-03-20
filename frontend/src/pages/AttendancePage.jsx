import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, AlertTriangle, CheckCircle, XCircle, FileText, Plus, ArrowRight } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { CircularProgress } from '../components/UIComponents';
import { fadeUp } from '../components/AnimatedComponents';
import { useAuth } from '../context/AuthContext';
import { apiFetch, ENDPOINTS } from '../api';
import { useEffect } from 'react';

const studentSubjects = [
    { name: 'Data Structures & Algorithms', code: 'CS301', attended: 67, total: 77, safe: true },
    { name: 'Object Oriented Programming', code: 'CS302', attended: 71, total: 77, safe: true },
    { name: 'Engineering Mathematics – III', code: 'MA301', attended: 58, total: 74, safe: false },
    { name: 'Computer Networks', code: 'CS303', attended: 60, total: 75, safe: true },
    { name: 'Operating Systems', code: 'CS304', attended: 62, total: 75, safe: true },
];

const teacherAttendance = {
    present: 42,
    total: 45,
    leavesTaken: 3,
    leavesRemaining: 15,
    history: [
        { date: 'Feb 26, 2025', status: 'Present', type: 'Full Day' },
        { date: 'Feb 25, 2025', status: 'Present', type: 'Full Day' },
        { date: 'Feb 24, 2025', status: 'Absent', type: 'Sick Leave' },
        { date: 'Feb 21, 2025', status: 'Present', type: 'Full Day' },
    ]
};

const months = ['Jan', 'Feb', 'Mar'];
const mockCalendar = {
    Jan: [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0],
    Feb: [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0],
    Mar: [1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
};

export default function AttendancePage() {
    const { t } = useTranslation();
    const { isAdmin } = useAuth();
    const [showLeaveForm, setShowLeaveForm] = useState(false);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                // Securely fetching attendance data with token attached automatically
                const response = await apiFetch(ENDPOINTS.STUDENT_DETAILS);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched records:", data);
                }
            } catch (err) {
                console.warn("API offline or unauthorized. Using mock data.");
            }
        };
        fetchAttendance();
    }, []);

    const totalAttended = isAdmin ? teacherAttendance.present : studentSubjects.reduce((a, s) => a + s.attended, 0);
    const totalClasses = isAdmin ? teacherAttendance.total : studentSubjects.reduce((a, s) => a + s.total, 0);
    const overall = Math.round((totalAttended / totalClasses) * 100);

    return (
        <div className="min-h-screen bg-transparent text-slate-900 dark:text-white transition-colors duration-300">
            <Sidebar />
            <Navbar />
            <main className="lg:pl-[230px] pt-20 p-4 lg:p-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div>
                            <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest mb-3 inline-block">
                                {isAdmin ? 'Staff Presence' : 'Student Attendance'}
                            </span>
                            <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-800 dark:text-white tracking-tighter italic uppercase leading-none">
                                {isAdmin ? 'Working' : 'Attendance'} <span className="gradient-text italic">Records</span>
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-3 uppercase tracking-widest">
                                {isAdmin ? 'Manage your leaves and view biometric logs' : 'Monitor your presence across all subjects this semester'}
                            </p>
                        </div>
                        {isAdmin && (
                            <button
                                onClick={() => setShowLeaveForm(true)}
                                className="h-12 px-8 rounded-2xl bg-primary-500 text-white font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl hover:scale-105 transition-all"
                            >
                                <Plus className="w-4 h-4" /> Apply for Leave
                            </button>
                        )}
                    </div>

                    {/* Overall Summary */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <motion.div className="lg:col-span-2 glass-card rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 border border-white/10 shadow-2xl">
                            <CircularProgress percentage={overall} size={140} strokeWidth={12} />
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="font-black text-2xl text-slate-800 dark:text-white uppercase tracking-tight italic mb-2">
                                    Overall {isAdmin ? 'Work Presence' : 'Attendance'}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest">
                                    {isAdmin ? `${totalAttended} days present out of ${totalClasses} working days` : `${totalAttended} classes attended out of ${totalClasses} total`}
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                                    <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-center min-w-[100px]">
                                        <p className="text-2xl font-black text-emerald-500">{totalAttended}</p>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Present</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 text-center min-w-[100px]">
                                        <p className="text-2xl font-black text-red-500">{isAdmin ? teacherAttendance.leavesTaken : totalClasses - totalAttended}</p>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{isAdmin ? 'Leaves' : 'Absent'}</p>
                                    </div>
                                    {isAdmin && (
                                        <div className="p-4 rounded-2xl bg-primary-500/5 border border-primary-500/10 text-center min-w-[100px]">
                                            <p className="text-2xl font-black text-primary-500">{teacherAttendance.leavesRemaining}</p>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        <div className="glass-card rounded-[2.5rem] p-8 border border-white/10 shadow-2xl flex flex-col justify-center gap-4">
                            <div className={`p-5 rounded-3xl border ${overall >= 75 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                                <div className="flex items-center gap-3 mb-2">
                                    {overall >= 75 ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <AlertTriangle className="w-5 h-5 text-red-500" />}
                                    <span className={`font-black text-[11px] uppercase tracking-widest ${overall >= 75 ? 'text-emerald-500' : 'text-red-500'}`}>Status: {overall >= 75 ? 'Safe' : 'Critical'}</span>
                                </div>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 italic leading-relaxed">
                                    {isAdmin
                                        ? `Your presence record is excellent. You have ${teacherAttendance.leavesRemaining} paid leaves left for this year.`
                                        : `You need to maintain 75% attendance for examinations. You current status is ${overall}%`}
                                </p>
                            </div>
                            <button className="w-full h-12 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest hover:bg-primary-500 hover:text-white transition-all flex items-center justify-center gap-2">
                                Download Report <FileText className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {/* Main Content Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Summary List */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="glass-card rounded-[2.5rem] p-6 border border-white/10 shadow-xl">
                                <h2 className="font-black text-xl text-slate-800 dark:text-white uppercase tracking-tight italic mb-6 flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-primary-500" /> {isAdmin ? 'Recent Biometrics' : 'Course Standings'}
                                </h2>
                                <div className="space-y-4">
                                    {(isAdmin ? teacherAttendance.history : studentSubjects).map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/10">
                                            <div>
                                                <p className="font-black text-sm text-slate-800 dark:text-white uppercase tracking-tight leading-none mb-1">{isAdmin ? item.date : item.name}</p>
                                                <p className="text-[10px] font-bold text-slate-500 italic uppercase">{isAdmin ? item.type : item.code}</p>
                                            </div>
                                            <div className="text-right">
                                                {isAdmin ? (
                                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${item.status === 'Present' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                                                        {item.status}
                                                    </span>
                                                ) : (
                                                    <span className={`text-sm font-black italic ${Math.round((item.attended / item.total) * 100) >= 75 ? 'text-emerald-500' : 'text-red-500'}`}>
                                                        {Math.round((item.attended / item.total) * 100)}%
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Calendar Heatmap */}
                        <div className="lg:col-span-2">
                            <div className="glass-card rounded-[2.5rem] p-8 border border-white/10 shadow-xl h-full">
                                <h2 className="font-black text-xl text-slate-800 dark:text-white uppercase tracking-tight italic mb-8 flex items-center gap-3">
                                    <div className="w-1.5 h-8 bg-accent-500 rounded-full" /> Full Calendar Overview
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {months.map(month => (
                                        <div key={month}>
                                            <h3 className="font-black text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">{month} 2025</h3>
                                            <div className="grid grid-cols-7 gap-1.5">
                                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                                    <div key={i} className="text-center text-[9px] font-black text-slate-500 pb-2">{d}</div>
                                                ))}
                                                {mockCalendar[month].map((v, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ scale: 0 }}
                                                        whileInView={{ scale: 1 }}
                                                        viewport={{ once: true }}
                                                        className={`w-full aspect-square rounded-md transition-colors ${v === 1 ? 'bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.2)]' :
                                                            v === 0 ? 'bg-red-500/60' : 'bg-slate-200 dark:bg-slate-800'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/5 flex items-center gap-6 justify-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded bg-emerald-500" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Present</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded bg-red-500" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Absent / Leave</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-800" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Holiday</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Leave Modal */}
            <AnimatePresence>
                {showLeaveForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="glass-card rounded-[2.5rem] p-8 max-w-lg w-full border border-white/20 shadow-glass-dark">
                            <h2 className="font-black text-2xl text-slate-800 dark:text-white uppercase tracking-tight italic mb-2">Request Leave</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest mb-8">Submit a request to the HOD for approval</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Leave Type</label>
                                    <select className="w-full h-12 px-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none text-xs font-bold text-slate-700 dark:text-white">
                                        <option>Casual Leave</option>
                                        <option>Sick Leave</option>
                                        <option>Earned Leave</option>
                                        <option>Maternity/Paternity Leave</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">From</label>
                                        <input type="date" className="w-full h-12 px-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none text-xs font-bold text-slate-700 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">To</label>
                                        <input type="date" className="w-full h-12 px-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none text-xs font-bold text-slate-700 dark:text-white" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Reason</label>
                                    <textarea rows={3} className="w-full p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none text-xs font-bold text-slate-700 dark:text-white resize-none" placeholder="Reason for leave..."></textarea>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button onClick={() => setShowLeaveForm(false)} className="flex-1 h-12 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 font-black uppercase tracking-widest text-xs">Cancel</button>
                                <button onClick={() => setShowLeaveForm(false)} className="flex-1 h-12 rounded-xl bg-primary-500 text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-primary-500/20">Submit Request</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
