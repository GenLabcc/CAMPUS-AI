/* eslint-disable react-hooks/exhaustive-deps, react-hooks/immutability */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell, Calendar, CreditCard, BookOpen, TrendingUp, User,
    Clock, CheckCircle, AlertTriangle, Star, Zap, Award,
    BookMarked, Users, Menu, X, ShieldAlert, UserPlus, Edit3, Database, Search,
    ArrowRight, MapPin, Shield, ChevronLeft, Cpu, MonitorPlay
} from 'lucide-react';
import { Hand } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { StatCard, ProgressBar, CircularProgress } from '../components/UIComponents';
import { fadeUp, staggerContainer } from '../components/AnimatedComponents';
import { useAuth } from '../context/AuthContext';
import { apiFetch, ENDPOINTS } from '../api';

const upcomingExams = [
    { subject: 'Data Structures', date: 'Mar 10, 2025', time: '9:00 AM', unit: 'Unit 4', color: 'text-blue-500' },
    { subject: 'Digital Electronics', date: 'Mar 12, 2025', time: '2:00 PM', unit: 'Unit 3', color: 'text-violet-500' },
    { subject: 'Engineering Maths', date: 'Mar 15, 2025', time: '9:00 AM', unit: 'Unit 5', color: 'text-pink-500' },
];

const notifications = [
    { icon: <Bell className="w-6 h-6 text-amber-500" />, msg: 'Semester fee due on March 20, 2025', type: 'warning', time: '2h ago' },
    { icon: <BookOpen className="w-6 h-6 text-blue-500" />, msg: 'New study material uploaded for DSA', type: 'info', time: '5h ago' },
    { icon: <CheckCircle className="w-6 h-6 text-emerald-500" />, msg: 'Attendance marked for today\'s classes', type: 'success', time: '8h ago' },
    { icon: <Award className="w-6 h-6 text-yellow-500" />, msg: 'You ranked #3 in your class this week!', type: 'success', time: '1d ago' },
];

const learningModules = [
    { name: 'Data Structures & Algorithms', progress: 72, color: 'primary' },
    { name: 'Object Oriented Programming', progress: 88, color: 'success' },
    { name: 'Computer Networks', progress: 45, color: 'warning' },
    { name: 'Operating Systems', progress: 60, color: 'primary' },
];

const timetable = [
    { time: '9:00 AM', subject: 'DSA', room: 'CS-101', type: 'Theory' },
    { time: '10:00 AM', subject: 'Digital Electronics', room: 'EE-201', type: 'Theory' },
    { time: '11:00 AM', subject: 'Lab Session', room: 'Lab-3', type: 'Lab' },
    { time: '2:00 PM', subject: 'Maths', room: 'CS-101', type: 'Theory' },
    { time: '3:00 PM', subject: 'OOP', room: 'CS-202', type: 'Theory' },
];

const mentors = [
    { name: 'Meena S.', branch: 'CSE 4th Yr', rating: 4.9, avatar: <User className="w-6 h-6 text-slate-600 dark:text-slate-300" />, skill: 'DSA Expert' },
    { name: 'Ravi K.', branch: 'CSE 4th Yr', rating: 4.7, avatar: <Cpu className="w-6 h-6 text-slate-600 dark:text-slate-300" />, skill: 'ML & Python' },
    { name: 'Priya T.', branch: 'IT 4th Yr', rating: 4.8, avatar: <MonitorPlay className="w-6 h-6 text-slate-600 dark:text-slate-300" />, skill: 'Web Dev' },
];

export default function Dashboard() {
    const [activeModal, setActiveModal] = useState(null);
    const [leaveType, setLeaveType] = useState('full');
    const [leaveDays, setLeaveDays] = useState(1);
    const [leaveReason, setLeaveReason] = useState('');
    const [leaveSubmitted, setLeaveSubmitted] = useState(false);
    const [allStudents, setAllStudents] = useState([]);
    const [adminForm, setAdminForm] = useState({
        studentId: '', marks: '', attendance: '',
        name: '', email: '', password: ''
    });
    const [adminStatus, setAdminStatus] = useState({ loading: false, message: '', color: '' });
    const [studentProfile, setStudentProfile] = useState(null);

    const { t } = useTranslation();
    const { user, isAdmin, login } = useAuth();
    const regNoFromStorage = localStorage.getItem('registration_number');

    React.useEffect(() => {
        if (user && !isAdmin) {
            fetchStudentDetails();
        }
    }, [user, isAdmin]);

    async function fetchStudentDetails() {
        try {
            const response = await apiFetch(ENDPOINTS.STUDENT_DETAILS);
            if (response.ok) {
                const data = await response.json();
                setStudentProfile(data);
                // Sync user in context if needed
                if (data.name !== user.name || data.marks !== user.marks) {
                    login({ ...user, ...data });
                }
            }
        } catch (err) {
            console.error("Failed to fetch student details", err);
        }
    };

    const handleLeaveSubmit = async (e) => {
        e.preventDefault();
        setLeaveSubmitted(true);

        try {
            // Using apiFetch which automatically includes the Bearer token
            await apiFetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/leaves/apply`, {
                method: 'POST',
                body: JSON.stringify({
                    type: leaveType,
                    days: leaveDays,
                    reason: leaveReason
                })
            });
        } catch (err) {
            console.error("Failed to submit leave", err);
        }

        setTimeout(() => {
            setActiveModal(null);
            setLeaveSubmitted(false);
            setLeaveReason('');
        }, 2000);
    };

    // Generic handler for admin actions mentioned by user
    const handleAdminAction = async (actionKey, data) => {
        console.log(`Performing admin action: ${actionKey}`);
        try {
            const endpoint = actionKey === 'marks' ? ENDPOINTS.UPDATE_MARKS : ENDPOINTS.UPDATE_ATTENDANCE;
            const response = await apiFetch(`${endpoint}/${data.studentId}`, {
                method: 'PUT',
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (err) {
            console.error(`Admin action failed: ${actionKey}`, err);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await apiFetch(ENDPOINTS.LIST_STUDENTS);
            if (response.ok) {
                const data = await response.json();
                setAllStudents(data);
            }
        } catch (err) {
            console.error("Failed to fetch students", err);
        }
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        setAdminStatus({ loading: true, message: '', color: '' });
        try {
            const response = await apiFetch(ENDPOINTS.ADD_STUDENT, {
                method: 'POST',
                body: JSON.stringify({ name: adminForm.name, email: adminForm.email, password: adminForm.password })
            });
            if (response.ok) {
                setAdminStatus({ loading: false, message: 'Student added successfully!', color: 'green' });
                setAdminForm({ ...adminForm, name: '', email: '', password: '' });
                fetchStudents();
            } else {
                const data = await response.json();
                setAdminStatus({ loading: false, message: data.detail || 'Failed to add student', color: 'red' });
            }
        } catch (err) {
            setAdminStatus({ loading: false, message: 'Network error', color: 'red' });
        }
    };

    const handleGenericUpdate = async (e) => {
        e.preventDefault();
        const key = activeModal.key; // 'marks' or 'attendance'
        if (!adminForm.studentId) return;
        setAdminStatus({ loading: true, message: '', color: '' });

        const data = await handleAdminAction(key, {
            studentId: adminForm.studentId,
            [key]: parseFloat(adminForm[key])
        });

        if (data && !data.detail) {
            setAdminStatus({ loading: false, message: 'Updated successfully!', color: 'green' });
            fetchStudents();
        } else {
            setAdminStatus({ loading: false, message: data?.detail || 'Update failed', color: 'red' });
        }
    };


    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="text-center">
                    <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-widest italic">Please login to access dashboard</h2>
                    <Link to="/student-login" className="btn-primary px-8 py-3">Go to Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent selection:bg-accent selection:text-dominant relative overflow-hidden text-white">
            <Sidebar />
            <Navbar />

            <main className="lg:pl-[230px] pt-20 p-4 lg:p-8">
                {/* Welcome Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isAdmin ? 'bg-orange-500 text-white' : 'bg-primary-500 text-white'}`}>
                                    {isAdmin ? 'Admin Access' : 'Student Access'}
                                </span>
                            </div>
                            <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tighter italic uppercase flex items-center gap-3">
                                {t('dashboard.welcome')}, <span className="gradient-text">{user.name}</span>
                                <Hand className="w-8 h-8 text-amber-500 inline-block animate-[wave_1.5s_ease-in-out_infinite] origin-bottom-right" />
                            </h1>
                            <p className="text-white/40 font-bold text-sm mt-2 uppercase tracking-widest">
                                {[user.year, user.branch].filter(v => v && typeof v === 'string' && v.toLowerCase() !== 'undefined').join(' • ')}
                                {([user.year, user.branch].filter(v => v && typeof v === 'string' && v.toLowerCase() !== 'undefined').length > 0) && ' • '}
                                Registration Number: <span className="text-white ml-1">{user.registration_number || regNoFromStorage || user.regNo || 'N/A'}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to="/chatbot" className="h-14 px-8 rounded-2xl bg-white/5 text-white font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl border border-white/10 hover:scale-105 transition-all">
                                <Zap className="w-5 h-5 text-accent animate-pulse" /> Ask AI Assistant
                            </Link>
                        </div>
                    </div>

                    {!isAdmin && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-8 flex items-center gap-4 p-5 rounded-3xl bg-orange-500/10 border border-orange-500/20 backdrop-blur-xl"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 shrink-0">
                                <AlertTriangle className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <span className="font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest text-xs block mb-1">{t('dashboard.due_alert')}</span>
                                <span className="text-slate-700 dark:text-slate-300 font-bold italic">₹12,500 due by March 20, 2025</span>
                            </div>
                            <Link to="/fees" className="h-10 px-6 rounded-xl bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
                                Pay Now
                            </Link>
                        </motion.div>
                    )}
                </motion.div>

                {/* Admin Only Panels */}
                {isAdmin && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        {/* Section 1: Academic & Student Management */}
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldAlert className="w-6 h-6 text-orange-500" />
                            <h2 className="font-black text-xl text-slate-800 dark:text-white uppercase tracking-tighter italic">Administrative Control Center</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {[
                                { icon: Database, label: 'Access Student Data', color: 'from-violet-500 to-purple-600', desc: 'Query full student database', key: 'data' },
                                { icon: UserPlus, label: 'Add Students', color: 'from-emerald-500 to-teal-600', desc: 'Create new student accounts', key: 'add' },
                                { icon: Edit3, label: 'Modify Marks', color: 'from-blue-500 to-indigo-600', desc: 'Update internal & semester scores', key: 'marks' },
                                { icon: Calendar, label: 'Change Attendance', color: 'from-amber-500 to-orange-600', desc: 'Override class attendance records', key: 'attendance' },
                            ].map((panel, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    onClick={() => {
                                        if (['data', 'marks', 'attendance'].includes(panel.key)) fetchStudents();
                                        setAdminStatus({ loading: false, message: '', color: '' });
                                        setActiveModal({ title: panel.label, key: panel.key });
                                    }}
                                    className="glass-card p-6 rounded-[2.5rem] border border-white/10 cursor-pointer shadow-xl group overflow-hidden relative active:scale-95"
                                >
                                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${panel.color} opacity-5 blur-2xl group-hover:opacity-20 transition-opacity`} />
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${panel.color} flex items-center justify-center mb-4 shadow-lg group-hover:rotate-6 transition-transform`}>
                                        <panel.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="font-black text-lg text-slate-800 dark:text-white uppercase tracking-tight leading-none mb-2">{panel.label}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold italic">{panel.desc}</p>
                                    <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-500 opacity-60 group-hover:opacity-100 transition-opacity">
                                        Manage Module <ArrowRight className="w-3 h-3 text-primary-500" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                            {[
                                { icon: Clock, label: 'Class Analytics & Student Hub', color: 'from-cyan-500 to-blue-600', stats: 'Review & Manage Student Records', key: 'data' },
                                { icon: AlertTriangle, label: 'Leave Management', color: 'from-amber-500 to-orange-600', stats: 'Leaves Avail: 18 Days', key: 'leaves' },
                            ].map((panel, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="glass-card p-6 rounded-[2.5rem] border border-white/10 shadow-xl group relative overflow-hidden h-full"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${panel.color} flex items-center justify-center shadow-lg`}>
                                            <panel.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Faculty Module</p>
                                            <p className="font-black text-slate-700 dark:text-white text-xs">{panel.stats}</p>
                                        </div>
                                    </div>
                                    <h3 className="font-black text-xl text-slate-800 dark:text-white uppercase tracking-tight italic mb-4">{panel.label}</h3>

                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => {
                                                if (panel.key === 'data') fetchStudents();
                                                setActiveModal({ title: `${panel.label} Hub`, key: panel.key });
                                            }}
                                            className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest hover:bg-primary-500 hover:text-white transition-all"
                                        >
                                            {panel.key === 'data' ? 'Enter Student Hub' : 'View Detailed Report'}
                                        </button>
                                        {panel.key === 'leaves' && (
                                            <button
                                                onClick={() => setActiveModal({ title: 'Leave Application', key: 'leave-apply' })}
                                                className="w-full py-3 rounded-xl bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-500/30 hover:scale-105 transition-all"
                                            >
                                                Apply for Leave
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Dashboard Stats & Content (Only show if not admin, or show restricted for students) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Stat Cards - Show for both, but different context */}
                        <div className="grid grid-cols-2 gap-6">
                            <StatCard icon={Calendar} label={isAdmin ? "My Attendance" : t('dashboard.attendance')} value={isAdmin ? "94%" : (studentProfile?.attendance ? `${studentProfile.attendance}%` : "87%")} trend={2} color="bg-gradient-to-br from-emerald-500 to-teal-600" />
                            <StatCard icon={TrendingUp} label={isAdmin ? "Student Performance" : "My Score"} value={isAdmin ? "82%" : (studentProfile?.marks ? `${studentProfile.marks}%` : "8.64")} trend={0.2} color="bg-gradient-to-br from-primary-500 to-violet-600" />
                            <StatCard icon={CreditCard} label={isAdmin ? "Net Salary" : t('dashboard.fees')} value={isAdmin ? "₹64.2K" : "₹12.5K"} trend={0} color="bg-gradient-to-br from-orange-500 to-red-500" />
                            <StatCard icon={BookOpen} label={isAdmin ? "My Classes" : t('dashboard.courses')} value={isAdmin ? "4" : "6"} color="bg-gradient-to-br from-pink-500 to-rose-600" />
                        </div>

                        {/* Today's Timetable / Admin Overview */}
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="glass-card rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Clock className="w-32 h-32 text-slate-400" />
                            </div>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="font-black text-xl text-slate-800 dark:text-white uppercase tracking-tighter italic flex items-center gap-3">
                                    <div className="w-1.5 h-8 bg-primary-500 rounded-full" />
                                    {isAdmin ? "Campus Operations Monitoring" : "Today's Schedule"}
                                </h2>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="space-y-4">
                                {(isAdmin ? timetable.slice(0, 3) : timetable).map((t, i) => (
                                    <motion.div
                                        key={i}
                                        className={`flex items-center gap-6 p-5 rounded-[1.5rem] transition-all group ${i === 1 ? 'bg-primary-500/10 border border-primary-500/20' : 'hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'
                                            }`}
                                    >
                                        <div className="text-xs font-black text-slate-500 dark:text-slate-400 w-20 uppercase tracking-widest">{t.time}</div>
                                        <div className="flex-1">
                                            <p className="font-black text-base text-slate-800 dark:text-white uppercase tracking-tight italic">{t.subject}</p>
                                            <div className="flex items-center gap-4 mt-1">
                                                <p className="text-xs font-bold text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.room}</p>
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${t.type === 'Lab' ? 'bg-violet-500/20 text-violet-500' : 'bg-blue-500/20 text-blue-500'}`}>
                                                    {t.type}
                                                </span>
                                            </div>
                                        </div>
                                        {i === 1 && (
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary-500 animate-ping" />
                                                <span className="text-[10px] font-black text-primary-500 uppercase tracking-[0.2em]">Live</span>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Hide performance for admin or show different analytics */}
                        {!isAdmin && (
                            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                className="glass-card rounded-[2.5rem] p-8 border border-white/10 shadow-2xl">
                                <h2 className="font-black text-2xl text-slate-800 dark:text-white uppercase tracking-tighter italic flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-8 bg-accent-500 rounded-full" />
                                    {t('dashboard.performance')}
                                </h2>
                                <div className="flex items-end gap-3 h-48 mb-8">
                                    {[65, 80, 72, 90, 85, 78, 92].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scaleY: 0 }}
                                            animate={{ scaleY: 1 }}
                                            transition={{ delay: i * 0.07, duration: 0.8, ease: 'easeOut' }}
                                            style={{ height: `${h}%` }}
                                            className="flex-1 rounded-2xl origin-bottom bg-gradient-to-t from-primary-600 via-primary-500 to-accent-400 opacity-80 hover:opacity-100 transition-all cursor-pointer relative group"
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-slate-800 text-white text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                                                {h}%
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    {[
                                        { label: 'Assignments', value: '18/20', color: 'text-emerald-500' },
                                        { label: 'Quizzes', value: '92%', color: 'text-primary-500' },
                                        { label: 'Class Rank', value: '#3', color: 'text-amber-500' },
                                    ].map(({ label, value, color }) => (
                                        <div key={label} className="text-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-white/5">
                                            <p className={`text-2xl font-black italic tracking-tighter ${color}`}>{value}</p>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{label}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-8">
                        {/* Search Bar - Admin Only */}
                        {isAdmin && (
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                    <Search className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search Student ID / Name..."
                                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-transparent focus:border-primary-500 transition-all font-bold text-sm shadow-xl dark:text-white"
                                />
                            </div>
                        )}

                        {/* Common Quick Info Panels */}
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="glass-card rounded-[2.5rem] p-6 border border-white/10 shadow-2xl">
                            <h2 className="font-black text-lg text-slate-800 dark:text-white uppercase tracking-tight italic flex items-center gap-2 mb-6">
                                <Award className="w-5 h-5 text-yellow-500" />
                                {isAdmin ? "Top Performers" : "Learning Milestone"}
                            </h2>
                            <div className="space-y-4">
                                {mentors.map((m, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/10 group">
                                        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                            {m.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-black text-sm text-slate-800 dark:text-white uppercase tracking-tight leading-none mb-1">{m.name}</p>
                                            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 italic">{m.skill}</p>
                                        </div>
                                        <div className="text-xs font-black text-amber-500 flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-amber-500" /> {m.rating}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Recent Activity / Notifications */}
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="glass-card rounded-[2.5rem] p-6 border border-white/10 shadow-2xl">
                            <h2 className="font-black text-lg text-slate-800 dark:text-white uppercase tracking-tight italic flex items-center gap-2 mb-6">
                                <Bell className="w-5 h-5 text-primary-500" />
                                System Logs
                            </h2>
                            <div className="space-y-3">
                                {notifications.map((n, i) => (
                                    <div key={i} className="flex gap-4 items-start p-3">
                                        <div className="text-xl mt-1">{n.icon}</div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed mb-1 italic">{n.msg}</p>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{n.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* Modal System */}
            <AnimatePresence>
                {activeModal && (
                    <div
                        onClick={() => setActiveModal(null)}
                        className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            className="glass-card rounded-[3.5rem] p-10 max-w-lg w-full border border-white/20 shadow-2xl relative"
                        >
                            <button
                                onClick={() => setActiveModal(null)}
                                className="absolute top-8 right-8 text-slate-400 hover:text-primary-500 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h2 className="font-black text-2xl text-slate-800 dark:text-white uppercase tracking-tight italic mb-2">
                                {activeModal.title}
                            </h2>
                            <div className="h-1 w-20 bg-primary-500 rounded-full mb-8" />

                            {activeModal.key === 'leave-apply' ? (
                                <form onSubmit={handleLeaveSubmit} className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Type of Leave Needed</label>
                                        <div className="flex gap-4">
                                            {['full', 'half'].map(type => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setLeaveType(type)}
                                                    className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border-2 transition-all ${leaveType === type
                                                        ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/20'
                                                        : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-white/5'
                                                        }`}
                                                >
                                                    {type} Day
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Number of Days</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={leaveDays}
                                            onChange={(e) => setLeaveDays(e.target.value)}
                                            className="w-full h-14 px-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-white/5 font-black text-sm focus:border-primary-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Leave Letter / Message</label>
                                        <textarea
                                            rows="5"
                                            placeholder="Specify the reason for leave..."
                                            value={leaveReason}
                                            onChange={(e) => setLeaveReason(e.target.value)}
                                            className="w-full p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-white/5 font-bold text-sm resize-none focus:border-primary-500 outline-none transition-all"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={leaveSubmitted}
                                        className={`w-full h-16 rounded-2xl flex items-center justify-center font-black uppercase tracking-widest text-xs transition-all ${leaveSubmitted
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                            : 'bg-primary-500 text-white shadow-xl shadow-primary-500/30 hover:scale-[1.02] hover:shadow-primary-500/50'
                                            }`}
                                    >
                                        {leaveSubmitted ? (
                                            <span className="flex items-center gap-3">
                                                <CheckCircle className="w-5 h-5" /> Leave Approved
                                            </span>
                                        ) : 'Submit Application'}
                                    </button>
                                </form>
                            ) : activeModal.key === 'data' ? (
                                <div className="space-y-6">
                                    <div className="max-h-96 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                                        {allStudents.map(student => (
                                            <div key={student.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs font-black uppercase text-white">{student.name}</p>
                                                    <p className="text-[10px] text-slate-500 italic mt-0.5">{student.email}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-primary-500 uppercase">Marks: {student.marks}%</p>
                                                    <p className="text-[10px] font-black text-emerald-500 uppercase">Att: {student.attendance}%</p>
                                                </div>
                                            </div>
                                        ))}
                                        {allStudents.length === 0 && (
                                            <div className="py-10 text-center">
                                                <Database className="w-10 h-10 text-white/10 mx-auto mb-3" />
                                                <p className="text-xs italic text-slate-500">No students found</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : activeModal.key === 'add' ? (
                                <form onSubmit={handleAddStudent} className="space-y-4">
                                    <input placeholder="Full Name" value={adminForm.name} onChange={e => setAdminForm({ ...adminForm, name: e.target.value })} className="w-full h-12 px-5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white" />
                                    <input placeholder="Email Address" value={adminForm.email} onChange={e => setAdminForm({ ...adminForm, email: e.target.value })} className="w-full h-12 px-5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white" />
                                    <input placeholder="Password" type="password" value={adminForm.password} onChange={e => setAdminForm({ ...adminForm, password: e.target.value })} className="w-full h-12 px-5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white" />
                                    <button className="btn-primary w-full py-3 text-[10px] font-black uppercase mt-2" disabled={adminStatus.loading}>{adminStatus.loading ? 'Processing...' : 'Add Student'}</button>
                                    {adminStatus.message && <p className={`text-[10px] font-bold text-center mt-2 ${adminStatus.color === 'red' ? 'text-red-500' : 'text-emerald-500'}`}>{adminStatus.message}</p>}
                                </form>
                            ) : (activeModal.key === 'marks' || activeModal.key === 'attendance') ? (
                                <form onSubmit={handleGenericUpdate} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Select Student</label>
                                        <select
                                            value={adminForm.studentId}
                                            onChange={e => setAdminForm({ ...adminForm, studentId: e.target.value })}
                                            className="w-full h-12 px-5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white bg-slate-900"
                                        >
                                            <option value="" className="bg-slate-900 text-white">-- Choose Student --</option>
                                            {allStudents.map(s => (
                                                <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                                                    {s.name} ({s.email})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-500 ml-1">New {activeModal.key}</label>
                                        <input
                                            type="number"
                                            placeholder={`Enter new ${activeModal.key}...`}
                                            value={activeModal.key === 'marks' ? adminForm.marks : adminForm.attendance}
                                            onChange={e => setAdminForm({ ...adminForm, [activeModal.key]: e.target.value })}
                                            className="w-full h-12 px-5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white"
                                        />
                                    </div>
                                    <button className="btn-primary w-full py-3 text-[10px] font-black uppercase mt-2" disabled={adminStatus.loading}>{adminStatus.loading ? 'Updating...' : `Update ${activeModal.key}`}</button>
                                    {adminStatus.message && <p className={`text-[10px] font-bold text-center mt-2 ${adminStatus.color === 'red' ? 'text-red-500' : 'text-emerald-500'}`}>{adminStatus.message}</p>}
                                </form>
                            ) : (
                                <div className="py-12 text-center space-y-6">
                                    <div className="w-24 h-24 rounded-[2rem] bg-primary-500/10 flex items-center justify-center mx-auto mb-6">
                                        <Database className="w-12 h-12 text-primary-500 animate-pulse" />
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 font-bold italic text-sm">
                                        This module is currently in maintenance.
                                    </p>
                                    <button
                                        onClick={() => setActiveModal(null)}
                                        className="btn-secondary px-10 py-3 text-[10px] font-black uppercase tracking-widest"
                                    >
                                        Close Portal
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div >
    );
}

