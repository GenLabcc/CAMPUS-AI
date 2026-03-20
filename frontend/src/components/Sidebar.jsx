import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, BookOpen, Calendar, CreditCard, MessageSquare,
    GraduationCap, ChevronLeft, ChevronRight, Bell, User, LogOut,
    Home, Trophy, Users, Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const sideLinks = [
    { to: '/dashboard', icon: LayoutDashboard, key: 'dashboard' },
    { to: '/courses', icon: BookOpen, key: 'courses' },
    { to: '/attendance', icon: Calendar, key: 'attendance' },
    { to: '/fees', icon: CreditCard, key: 'fees' },
    { to: '/chatbot', icon: MessageSquare, key: 'chatbot' },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();
    const { user, isAdmin } = useAuth();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    if (!user) return null;

    return (
        <motion.aside
            animate={{ width: collapsed ? 70 : 230 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`hidden lg:flex flex-col h-screen fixed left-0 top-0 z-40 glass-card border-r border-white/10 shadow-xl bg-dominant/90 backdrop-blur-3xl`}
        >
            {/* Nav Links */}
            <nav className="flex-1 px-4 py-8 space-y-4 mt-20 overflow-y-auto scrollbar-hide">
                <Link to="/" className={`sidebar-link group ${isActive('/') ? 'active' : ''}`}>
                    <Home className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                                className="whitespace-nowrap">{t('nav.home')}</motion.span>
                        )}
                    </AnimatePresence>
                </Link>

                {sideLinks.map(({ to, icon: Icon, key }) => (
                    <Link key={key} to={to} className={`sidebar-link group ${isActive(to) ? 'active' : ''}`}>
                        <Icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                                    className="whitespace-nowrap">
                                    {key === 'fees' && isAdmin ? 'Salary Structure' : t(`nav.${key}`)}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                ))}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-white/10 cursor-pointer transition-all group">
                    <div className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center shadow-glow transition-transform group-hover:scale-110 bg-accent`}>
                        {isAdmin ? <Shield className="w-5 h-5 text-dominant" /> : <User className="w-5 h-5 text-dominant" />}
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                                className="flex-1 min-w-0">
                                <p className="text-sm font-black text-white truncate italic uppercase tracking-tighter">{user.name}</p>
                                <p className="text-[10px] font-black text-white/40 truncate uppercase tracking-widest italic">
                                    {isAdmin ? 'Administrator' :
                                        [user.year, user.branch].filter(v => v && typeof v === 'string' && v.toLowerCase() !== 'undefined').join(' • ') || 'Student'}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Collapse Toggle */}
                <button
                    onClick={() => setCollapsed(v => !v)}
                    className="w-full mt-4 flex items-center justify-center h-10 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-all border border-slate-200 dark:border-white/5"
                >
                    {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
            </div>
        </motion.aside>
    );
}
