import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
    Moon, Sun, Languages, Menu, X, GraduationCap, Home,
    BookOpen, Calendar, CreditCard, MessageSquare, LayoutDashboard,
    LogOut, User, ChevronDown, Shield
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const languages = [
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'ta', label: 'தமிழ்', flag: 'TA' },
    { code: 'hi', label: 'हिन्दी', flag: 'HI' },
    { code: 'hinen', label: 'Hinglish', flag: 'HE' },
    { code: 'kn', label: 'ಕನ್ನಡ', flag: 'KN' },
];

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const { isDark, toggleTheme } = useTheme();
    const { user, logout, isAdmin } = useAuth();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const { scrollY } = useScroll();
    const location = useLocation();
    const navigate = useNavigate();
    const lastScrollY = useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const diff = latest - lastScrollY.current;
        if (Math.abs(diff) > 5) {
            setHidden(latest > 50 && diff > 0);
        }
        setScrolled(latest > 20);
        lastScrollY.current = latest;
    });

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMenuOpen(false);
        setLangOpen(false);
        setLoginOpen(false);
    }, [location]);

    const changeLang = (code) => {
        i18n.changeLanguage(code);
        localStorage.setItem('lang', code);
        setLangOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { to: '/', icon: Home, key: 'home', public: true },
        { to: '/dashboard', icon: LayoutDashboard, key: 'dashboard', protected: true },
        { to: '/courses', icon: BookOpen, key: 'courses', protected: true },
        { to: '/attendance', icon: Calendar, key: 'attendance', protected: true },
        { to: '/fees', icon: CreditCard, key: 'fees', protected: true },
        { to: '/chatbot', icon: MessageSquare, key: 'chatbot', protected: true },
    ].filter(link => {
        if (link.public) return true;
        if (link.protected) return !!user;
        return true;
    });

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: -100 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'backdrop-blur-xl bg-dominant/80 shadow-lg border-b border-white/10'
                    : 'bg-transparent'
                    } ${user ? 'lg:left-[230px]' : 'left-0'}`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo - Only show if sidebar is not present (not logged in) or on mobile */}
                        <Link to="/" className={`flex items-center gap-2 group ${user ? 'lg:hidden' : 'flex'}`}>
                            <motion.div
                                whileHover={{ rotate: 20, scale: 1.1 }}
                                className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow-glow"
                            >
                                <GraduationCap className="w-5 h-5 text-dominant" />
                            </motion.div>
                            <span className="font-display font-bold text-lg hidden sm:block">
                                <span className="gradient-text font-black tracking-tight">CampusAI</span>
                                <span className="text-white"> Hub</span>
                            </span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map(({ to, key }) => (
                                <Link
                                    key={key}
                                    to={to}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${isActive(to)
                                        ? 'bg-accent/10 text-accent'
                                        : 'text-white/60 hover:text-accent hover:bg-white/5'
                                        }`}
                                >
                                    {key === 'fees' && isAdmin ? 'Salary Structure' : t(`nav.${key}`)}
                                </Link>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2">
                            {/* Language Picker */}
                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setLangOpen(!langOpen)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold glass-card text-slate-700 dark:text-slate-200 hover:shadow-glow transition-all"
                                >
                                    <Languages className="w-4 h-4" />
                                    <span>{languages.find(l => l.code === i18n.language)?.flag || 'EN'}</span>
                                    <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                                </motion.button>

                                <AnimatePresence>
                                    {langOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                            className="absolute right-0 mt-2 w-40 glass-card rounded-2xl shadow-xl border border-white/20 overflow-hidden"
                                        >
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => changeLang(lang.code)}
                                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${i18n.language === lang.code
                                                        ? 'bg-primary-500 text-white'
                                                        : 'hover:bg-primary-50 dark:hover:bg-primary-900/20 text-slate-700 dark:text-slate-200'}`}
                                                >
                                                    {lang.label}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Dark Mode Toggle */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleTheme}
                                className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-slate-700 dark:text-slate-200 hover:shadow-glow transition-all"
                                aria-label="Toggle dark mode"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={isDark ? 'sun' : 'moon'}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {isDark ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4" />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>

                            {/* User Section */}
                            {user ? (
                                <div className="flex items-center gap-2 ml-2">
                                    <div className="hidden sm:flex flex-col items-end mr-2">
                                        <span className="text-[10px] font-black text-slate-800 dark:text-white leading-none">
                                            Hi, {user.name}
                                        </span>
                                        <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                                            {user.role}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                        title="Logout"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="relative">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setLoginOpen(!loginOpen)}
                                        className="hidden sm:flex btn-primary py-2 px-5 text-sm font-bold items-center gap-2 shadow-glow transition-all"
                                    >
                                        <User className="w-4 h-4" />
                                        <span>{t('nav.login')}</span>
                                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${loginOpen ? 'rotate-180' : ''}`} />
                                    </motion.button>

                                    <AnimatePresence>
                                        {loginOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                className="absolute right-0 mt-3 w-52 glass-card rounded-2xl shadow-xl border border-white/20 overflow-hidden z-[100] bg-dominant/90 backdrop-blur-2xl"
                                            >
                                                <Link
                                                    to="/student-login"
                                                    className="flex items-center gap-3 px-5 py-4 text-sm font-bold text-white hover:bg-accent hover:text-dominant transition-all group"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                                        <GraduationCap className="w-4 h-4 text-accent group-hover:text-white" />
                                                    </div>
                                                    <span>{t('nav.studentLogin')}</span>
                                                </Link>
                                                <div className="h-px bg-white/5 mx-2" />
                                                <Link
                                                    to="/admin-login"
                                                    className="flex items-center gap-3 px-5 py-4 text-sm font-bold text-white hover:bg-accent hover:text-dominant transition-all group"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                                        <Shield className="w-4 h-4 text-accent group-hover:text-white" />
                                                    </div>
                                                    <span>{t('nav.adminLogin')}</span>
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* Hamburger */}
                            <button
                                onClick={() => setMenuOpen(v => !v)}
                                className="lg:hidden w-9 h-9 rounded-xl glass-card flex items-center justify-center text-slate-700 dark:text-slate-200"
                            >
                                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 top-16 z-40 lg:hidden"
                    >
                        <div className="mx-4 mt-2 rounded-2xl glass-card border border-white/20 dark:border-white/10 shadow-glass-dark overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl">
                            <div className="p-4 space-y-1">
                                {user && (
                                    <div className="px-4 py-3 mb-2 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 dark:text-white">Hi, {user.name}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user.role}</p>
                                        </div>
                                    </div>
                                )}

                                {navLinks.map(({ to, icon: Icon, key }) => (
                                    <Link
                                        key={key}
                                        to={to}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive(to)
                                            ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/10 text-primary-600 dark:text-primary-400'
                                            : 'text-slate-600 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-white/5'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {key === 'fees' && isAdmin ? 'Salary Structure' : t(`nav.${key}`)}
                                    </Link>
                                ))}
                                {!user ? (
                                    <div className="pt-2 mt-2 border-t border-white/20 dark:border-white/10 flex flex-col gap-2">
                                        <Link to="/student-login" className="btn-primary text-center text-sm py-2.5 font-bold">
                                            {t('nav.studentLogin')}
                                        </Link>
                                        <Link to="/admin-login" className="btn-secondary text-center text-sm py-2.5 font-bold">
                                            {t('nav.adminLogin')}
                                        </Link>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-red-500 bg-red-50 dark:bg-red-900/20"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
