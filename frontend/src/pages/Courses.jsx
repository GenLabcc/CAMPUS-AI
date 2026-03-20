import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BookOpen, Search, ChevronDown, Calendar, Clock, ClipboardList, PlusCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Badge } from '../components/UIComponents';
import { fadeUp } from '../components/AnimatedComponents';
import { useAuth } from '../context/AuthContext';
import { apiFetch, ENDPOINTS } from '../api';
import { AnimatePresence } from 'framer-motion';
import { X, Sparkles, User, Users } from 'lucide-react';
import { FileText, Settings, Play } from 'lucide-react';

const defaultIcons = [BookOpen, FileText, Settings, Play];
const defaultColors = [
    'from-blue-500 to-cyan-500',
    'from-violet-500 to-purple-600',
    'from-emerald-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-pink-500 to-rose-600',
    'from-indigo-500 to-blue-600'
];

const defaultUnits = ['Introduction & Basics', 'Core Concepts & Logic', 'Intermediate Mechanisms', 'Advanced Implementation', 'Project & Review'];

function CourseCard({ course, index, isAdmin, onCreateAssignment }) {
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            variants={fadeUp}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="glass-card rounded-2xl overflow-hidden hover:shadow-glow transition-all duration-300"
        >
            <div className={`h-2 bg-gradient-to-r ${course.color}`} />
            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-2xl shrink-0 text-white border border-white/20">
                                {React.createElement(course.icon, { className: "w-6 h-6 text-white" })}
                            </div>
                        <div className="min-w-0">
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{course.code}</span>
                            <h3 className="font-black text-slate-800 dark:text-white text-base leading-tight uppercase italic tracking-tighter">
                                {course.name}
                            </h3>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                                {isAdmin ? <Users className="w-3 h-3"/> : <User className="w-3 h-3"/>}
                                {isAdmin ? `${course.batch} • ${course.students} Students` : course.faculty}
                            </p>
                        </div>
                    </div>
                </div>

                {isAdmin ? (
                    <div className="mt-6 space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                            <Clock className="w-4 h-4 text-primary-500" />
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Session</p>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{course.schedule}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-primary-500/5 border border-primary-500/20 text-center">
                                <p className="text-lg font-black text-primary-500">{course.assignments}</p>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Assignments</p>
                            </div>
                            <div className="p-3 rounded-xl bg-accent-500/5 border border-accent-500/20 text-center">
                                <p className="text-lg font-black text-accent-500">{course.tests}</p>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Tests Scheduled</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onCreateAssignment(course.code)}
                            className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        >
                            <PlusCircle className="w-3 h-3" /> Create Assignment
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-4 mt-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3"/> {course.credits} Credits</span>
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {course.semester}</span>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1.5">
                                <span className="text-slate-500">Attendance</span>
                                <span className={course.attendance >= 75 ? 'text-emerald-500' : 'text-red-500'}>{course.attendance}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${course.attendance}%` }} className={`h-full rounded-full bg-gradient-to-r ${course.color}`} />
                            </div>
                        </div>
                        <button onClick={() => setExpanded(!expanded)} className="w-full mt-4 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-500">
                            <span>View Syllabus</span>
                            <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                        </button>
                        {expanded && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 space-y-1">
                                {course.units.map((u, i) => (
                                    <div key={i} className="text-[10px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2 uppercase tracking-tight">
                                        <div className="w-1 h-1 rounded-full bg-primary-500" /> Unit {i + 1}: {u}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    );
}

export default function Courses() {
    const { isAdmin } = useAuth();
    const [search, setSearch] = useState('');
    const [courses, setCourses] = useState([]);
    const [activeModal, setActiveModal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ code: '', name: '', faculty: '', batch: '', students: 0, schedule: '', credits: 3 });

    const fetchCourses = async () => {
        try {
            const response = await apiFetch(ENDPOINTS.COURSES);
            if (response.ok) {
                const data = await response.json();
                setCourses(data);
            }
        } catch (err) {
            console.error("Failed to fetch courses", err);
        }
    };

    React.useEffect(() => {
        fetchCourses();
    }, []);

    const handleCreateAssignment = async (courseCode) => {
        try {
            const response = await apiFetch(`${ENDPOINTS.CREATE_ASSIGNMENT}/${courseCode}`, {
                method: 'POST'
            });
            if (response.ok) {
                fetchCourses();
                alert("Assignment created successfully and reflected in the portal!");
            }
        } catch (err) {
            console.error("Failed to create assignment", err);
        }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await apiFetch(ENDPOINTS.COURSES, {
                method: 'POST',
                body: JSON.stringify(form)
            });
            if (response.ok) {
                fetchCourses();
                setActiveModal(null);
                setForm({ code: '', name: '', faculty: '', batch: '', students: 0, schedule: '', credits: 3 });
            }
        } catch (err) {
            console.error("Failed to add course", err);
        } finally {
            setLoading(false);
        }
    };

    const filtered = courses.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-transparent text-slate-900 dark:text-white transition-colors duration-300">
            <Sidebar />
            <Navbar />
            <main className="lg:pl-[230px] pt-20 p-4 lg:p-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div>
                            <span className="px-3 py-1 rounded-full bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest mb-3 inline-block">
                                {isAdmin ? 'Teaching Portal' : 'Learning Portal'}
                            </span>
                            <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-800 dark:text-white tracking-tighter italic uppercase leading-none">
                                {isAdmin ? 'Managed' : 'Your'} <span className="gradient-text italic">Courses</span>
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-3 uppercase tracking-widest">
                                {isAdmin ? 'Monitor teaching progress and schedule assessments' : 'Track your academic credits and syllabus progress'}
                            </p>
                        </div>
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder={isAdmin ? "Search your classes..." : "Search subjects..."}
                                className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-transparent focus:border-primary-500 transition-all font-bold text-xs uppercase tracking-widest dark:text-white shadow-lg"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((course, i) => (
                            <CourseCard
                                key={course.code}
                                course={{
                                    ...course,
                                    color: defaultColors[i % defaultColors.length],
                                    icon: defaultIcons[i % defaultIcons.length],
                                    units: defaultUnits,
                                    attendance: 87
                                }}
                                index={i}
                                isAdmin={isAdmin}
                                onCreateAssignment={handleCreateAssignment}
                            />
                        ))}
                        {isAdmin && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setActiveModal('addCourse')}
                                className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 hover:border-primary-500 hover:text-primary-500 transition-all gap-4 min-h-[300px]"
                            >
                                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-3xl">
                                    <PlusCircle className="w-8 h-8" />
                                </div>
                                <p className="font-black text-xs uppercase tracking-[0.2em]">Add New Course</p>
                            </motion.button>
                        )}
                    </div>

                    {filtered.length === 0 && !loading && (
                        <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/10 mt-12">
                            <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4 opacity-20" />
                            <p className="font-black text-slate-500 uppercase tracking-widest italic">No courses found matching your criteria</p>
                        </div>
                    )}
                </motion.div>
            </main>

            <AnimatePresence>
                {activeModal === 'addCourse' && (
                    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="glass-card rounded-[3rem] p-10 max-w-lg w-full border border-white/20 shadow-2xl relative"
                        >
                            <button onClick={() => setActiveModal(null)} className="absolute top-8 right-8 text-slate-400 hover:text-primary-500 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                            <h2 className="font-black text-2xl text-white uppercase tracking-tight italic mb-2">Create New Course</h2>
                            <div className="h-1 w-20 bg-primary-500 rounded-full mb-8" />

                            <form onSubmit={handleAddCourse} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input placeholder="Course Code (e.g. CS101)" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} className="w-full h-12 px-5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white shadow-xl" required />
                                    <input placeholder="Course Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full h-12 px-5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white shadow-xl" required />
                                </div>
                                <input placeholder="Faculty Name" value={form.faculty} onChange={e => setForm({ ...form, faculty: e.target.value })} className="w-full h-12 px-5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white shadow-xl" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input placeholder="Batch (e.g. 3rd Year)" value={form.batch} onChange={e => setForm({ ...form, batch: e.target.value })} className="w-full h-12 px-5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white shadow-xl" />
                                    <input type="number" placeholder="Total Students" value={form.students} onChange={e => setForm({ ...form, students: parseInt(e.target.value) })} className="w-full h-12 px-5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white shadow-xl" />
                                </div>
                                <input placeholder="Schedule (e.g. Mon, Wed 9:00 AM)" value={form.schedule} onChange={e => setForm({ ...form, schedule: e.target.value })} className="w-full h-12 px-5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white shadow-xl" />

                                <button type="submit" className="w-full h-14 rounded-2xl bg-primary-500 text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 mt-4 hover:scale-[1.02] transition-all shadow-glow">
                                    <Sparkles className="w-4 h-4" /> Finalize & Create Course
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
