import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare, LayoutDashboard, Calendar, CreditCard,
    BookOpen, BarChart3, ArrowRight, Sparkles, Star, Zap,
    GraduationCap, Users, ChevronRight, Globe, X,
    CheckCircle, Info, MapPin, Mail, Phone, Rocket
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { fadeUp, staggerContainer } from '../components/AnimatedComponents';
import { useAuth } from '../context/AuthContext';

const features = [
    { icon: MessageSquare, key: 'chatbot', color: 'from-violet-500 to-purple-600', bg: 'bg-violet-500/10' },
    { icon: LayoutDashboard, key: 'dashboard', color: 'from-blue-500 to-cyan-600', bg: 'bg-blue-500/10' },
    { icon: Calendar, key: 'attendance', color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-500/10' },
    { icon: CreditCard, key: 'fees', color: 'from-orange-500 to-red-500', bg: 'bg-orange-500/10' },
    { icon: BookOpen, key: 'courses', color: 'from-pink-500 to-rose-500', bg: 'bg-pink-500/10' },
    { icon: BarChart3, key: 'analytics', color: 'from-indigo-500 to-primary-600', bg: 'bg-indigo-500/10' },
];

const stats = [
    { value: '50K+', key: 'students' },
    { value: '200+', key: 'colleges' },
    { value: '1000+', key: 'courses' },
    { value: '98%', key: 'satisfaction' },
];

const featureDetails = {
    chatbot: {
        title: "Next-Gen AI Chatbot",
        description: "Our multilingual AI assistant is trained on your specific college's data. Get instant answers about schedules, exam dates, fee structures, and campus policies in English, Tamil, or Hindi.",
        highlights: ["24/7 Availability", "Multi-language Support", "Precise Campus Info"]
    },
    dashboard: {
        title: "Intelligent Smart Dashboard",
        description: "A centralized hub designed for the modern student. Monitor your GPA trends, upcoming assignment deadlines, and real-time attendance status in one sleek, high-refresh-rate interface.",
        highlights: ["Performance Tracking", "Dynamic Scheduling", "Key Metric Alerts"]
    },
    attendance: {
        title: "Seamless Attendance Automation",
        description: "Eliminate manual tracking. Our system uses smart geofencing and teacher-led verification to log your presence. Receive instant notifications if your attendance drops below critical levels.",
        highlights: ["Geo-fencing Ready", "Push Notifications", "Compliance Alerts"]
    },
    fees: {
        title: "Automated Fee Reminders",
        description: "Never miss a deadline again. Receive personalized SMS and Email alerts for semester fees, hostel dues, and lab charges. View your entire transaction history with transparent digital receipts.",
        highlights: ["Secure Tracking", "Multichannel Alerts", "Digital Receipts"]
    },
    courses: {
        title: "Centralized Course Management",
        description: "Access your entire syllabus, lecture notes, and faculty contact information on the go. Stay updated with real-time announcements from your department and track your credit progress.",
        highlights: ["Lecture Repository", "Faculty Directory", "Credit Progress"]
    },
    analytics: {
        title: "Advanced Performance Analytics",
        description: "Leverage AI-driven insights to boost your grades. Compare your performance with community averages, identify strengths, and get personalized study recommendations based on your data.",
        highlights: ["Comparative Analysis", "Personalized Insights", "Data-Driven Growth"]
    }
};

export default function Home() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [activeFeature, setActiveFeature] = useState(null);

    return (
        <div className="min-h-screen relative overflow-hidden bg-transparent text-secondary font-sans selection:bg-accent selection:text-dominant transition-colors duration-500">

            <Navbar />

            {/* HERO SECTION */}
            <section className="relative z-10 pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card mb-10 border border-white/10 shadow-xl bg-white/5 backdrop-blur-md"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-4 h-4 text-primary-500" />
                        </motion.div>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-200">
                            The Future of Learning is Here ✨
                        </span>
                        <Globe className="w-4 h-4 text-blue-500" />
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-display font-black text-6xl sm:text-7xl lg:text-9xl leading-[0.9] mb-8 tracking-tighter"
                    >
                        <span className="text-white uppercase">CAMPUS</span>
                        <span className="gradient-text italic ml-2">AI</span>
                        <div className="text-4xl sm:text-5xl lg:text-6xl mt-4 text-white/40 uppercase tracking-widest font-black opacity-80">
                            HUB
                        </div>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-200 mb-6 max-w-3xl mx-auto leading-tight flex items-center justify-center gap-2"
                    >
                        {t('home.hero_subtitle')} <Rocket className="w-6 h-6 text-accent animate-pulse" />
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-lg sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium"
                    >
                        {t('home.hero_desc')}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        {!user ? (
                            <>
                                <Link to="/student-login" className="w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2, rotate: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full sm:w-auto px-10 py-5 bg-accent text-dominant rounded-2xl font-black uppercase tracking-[0.1em] text-sm shadow-[0_20px_50px_rgba(188,240,0,0.2)] flex items-center justify-center gap-3"
                                    >
                                        <GraduationCap className="w-5 h-5" />
                                        {t('home.student_login')}
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </Link>
                                <Link to="/admin-login" className="w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2, rotate: 1 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full sm:w-auto px-10 py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-[0.1em] text-sm backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                                    >
                                        <Users className="w-5 h-5" />
                                        {t('home.admin_login')}
                                    </motion.button>
                                </Link>
                            </>
                        ) : (
                            <Link to="/dashboard" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-12 py-5 bg-accent text-dominant rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-glow flex items-center justify-center gap-3"
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    Go to Dashboard
                                    <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </Link>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* STATS WITH GLASS CARDS */}
            <section className="relative z-10 py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                custom={i}
                                className="glass-card rounded-3xl p-8 text-center border border-slate-200 dark:border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all group"
                            >
                                <div className="text-4xl font-black text-white group-hover:scale-110 transition-transform">{s.value}</div>
                                <div className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mt-2 italic">{t(`home.stats_${s.key}`)}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FEATURES GRID */}
            <section className="relative z-10 py-24 px-4 bg-transparent">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                            Powered by <span className="gradient-text italic">NEXT-GEN</span> AI
                        </h2>
                        <div className="h-2 w-24 bg-accent mx-auto rounded-full mb-8" />
                        <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium">
                            {t('home.features_subtitle')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map(({ icon: Icon, key, color, bg }, i) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="group glass-card rounded-[2.5rem] p-10 border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] transition-all relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity animate-pulse`} />

                                <div className={`w-16 h-16 rounded-3xl ${bg} flex items-center justify-center mb-8 border border-white/10 shadow-lg group-hover:rotate-12 transition-transform`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-black text-2xl text-white mb-4 uppercase tracking-tighter italic">
                                    {t(`home.feat_${key}`)}
                                </h3>
                                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                                    {t(`home.feat_${key}_desc`)}
                                </p>
                                <button
                                    onClick={() => setActiveFeature(featureDetails[key])}
                                    className="mt-8 flex items-center gap-3 text-sm font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 cursor-pointer"
                                >
                                    Explore <ArrowRight className="w-4 h-4 text-accent" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Feature Detail Modal */}
                <AnimatePresence>
                    {activeFeature && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setActiveFeature(null)}
                                className="absolute inset-0 bg-dominant/80 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-2xl bg-slate-900/90 border border-white/10 rounded-[3rem] p-8 sm:p-12 overflow-hidden shadow-2xl"
                            >
                                <button
                                    onClick={() => setActiveFeature(null)}
                                    className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
                                    <Info className="w-4 h-4 text-accent" />
                                    <span className="text-[10px] font-black text-accent uppercase tracking-widest">In-Depth Details</span>
                                </div>

                                <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-white mb-6 leading-none">
                                    {activeFeature.title}
                                </h2>

                                <p className="text-slate-400 text-xl font-medium leading-relaxed mb-10">
                                    {activeFeature.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {activeFeature.highlights.map((h, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                                            <CheckCircle className="w-5 h-5 text-accent" />
                                            <span className="font-bold text-sm tracking-tight">{h}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 flex justify-end">
                                    <button
                                        onClick={() => setActiveFeature(null)}
                                        className="px-8 py-4 bg-accent text-dominant rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-glow"
                                    >
                                        Got It
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </section>

            {/* CTA SECTION */}
            <section className="relative z-10 py-32 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative rounded-[3rem] p-16 text-center overflow-hidden"
                    >
                        {/* Background for CTA */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-primary-600 to-accent-600" />
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />

                        <div className="relative z-10">
                            <Sparkles className="w-16 h-16 text-white/50 mx-auto mb-8 animate-bounce" />
                            <h2 className="text-5xl sm:text-7xl font-black text-white mb-6 uppercase tracking-tighter italic flex items-center justify-center gap-4">
                                {t('home.cta_title')} <Zap className="w-10 h-10 text-accent" />
                            </h2>
                            <p className="text-white/80 text-xl font-bold mb-12 max-w-lg mx-auto">
                                {t('home.cta_desc')}
                            </p>
                            <Link to="/student-login">
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="px-12 py-6 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-100 transition-colors inline-flex items-center gap-3"
                                >
                                    {t('home.cta_btn')} <Rocket className="w-5 h-5 text-accent" />
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/5 py-12 px-4 bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start gap-6 max-w-xs">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-dominant" />
                            </div>
                            <span className="font-display font-black text-2xl text-white uppercase tracking-tighter">CampusAI Hub</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 text-left group">
                                <MapPin className="w-5 h-5 text-accent shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                                    Tamil Nadu Engg. Community,<br />
                                    Global Tech Park, OMR, Chennai,<br />
                                    Tamil Nadu - 600096
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-4">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-2 opacity-50 italic">Quick Links</h4>
                        <Link to="/" className="text-slate-400 hover:text-accent font-black text-xs uppercase tracking-widest transition-colors">Home</Link>
                        <Link to="/contact" className="text-slate-400 hover:text-accent font-black text-xs uppercase tracking-widest transition-colors">Contact Us</Link>
                        <a href="#" className="text-slate-400 hover:text-accent font-black text-xs uppercase tracking-widest transition-colors">Sitemap</a>
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-4">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-2 opacity-50 italic">Connect</h4>
                        <div className="flex gap-6">
                            {['Instagram', 'Twitter', 'LinkedIn'].map(social => (
                                <a key={social} href="#" className="text-slate-400 hover:text-white font-black text-xs uppercase tracking-widest transition-colors">{social}</a>
                            ))}
                        </div>
                        <p className="text-slate-600 font-bold uppercase tracking-[0.2em] text-[10px] mt-4 italic">
                            © 2026 • Built for Students By Students
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
