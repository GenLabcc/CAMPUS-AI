import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
    Eye, EyeOff, GraduationCap, Mail, Lock, Chrome,
    ArrowLeft, Sparkles, Shield, User
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { ENDPOINTS } from '../api';

function LoginForm({ isAdmin = false }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isRegister, setIsRegister] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '', remember: false });
    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (isRegister && !form.name) newErrors.name = "Name is required";
        if (!form.email) newErrors.email = t('login.email_required') || "Required";
        if (!form.password) newErrors.password = t('login.password_required') || "Required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            setErrors({});
            try {
                // Determine endpoint based on role and mode
                const endpoint = isRegister
                    ? (isAdmin ? ENDPOINTS.ADMIN_REGISTER : ENDPOINTS.STUDENT_REGISTER)
                    : (isAdmin ? ENDPOINTS.ADMIN_LOGIN : ENDPOINTS.LOGIN);

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...(isRegister && { name: form.name }),
                        email: form.email,
                        password: form.password,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    if (isRegister) {
                        // After registration, toggle back to login and show success
                        setIsRegister(false);
                        setErrors({ submit: "Registration successful! Please login." });
                    } else {
                        const { access_token, registration_number } = data;

                        if (access_token) {
                            localStorage.setItem('access_token', access_token);
                        }
                        if (registration_number) {
                            localStorage.setItem('registration_number', registration_number);
                        }

                        // Expecting the backend to return user data including role, name, etc.
                        const userObj = data.user || { ...data };
                        if (registration_number) {
                            userObj.registration_number = registration_number;
                        }

                        // Store role explicitly in localStorage as requested
                        if (userObj.role) {
                            localStorage.setItem('role', userObj.role);
                        } else if (isAdmin) {
                            localStorage.setItem('role', 'admin');
                            userObj.role = 'admin';
                        } else {
                            localStorage.setItem('role', 'student');
                            userObj.role = 'student';
                        }

                        login(userObj);
                        navigate('/dashboard');
                    }
                } else {
                    setErrors({
                        submit: data.detail || data.message || (isRegister ? "Registration failed" : "Invalid credentials")
                    });
                }
            } catch (error) {
                setErrors({ submit: "Connection failed. Please check your backend." });
            } finally {
                setLoading(false);
            }
        }
    };

    const inputField = (icon, key, type, placeholder, labelKey) => (
        <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
                {t(`login.${labelKey || key}`)}
            </label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {icon}
                </div>
                <input
                    type={key === 'password' && showPass ? 'text' : type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    className={`input-glass pl-10 h-12 ${key === 'password' ? 'pr-10' : ''} ${errors[key] ? 'ring-2 ring-red-400/20 border-red-300' : ''}`}
                />
                {key === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPass(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary-500 transition-colors"
                    >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                )}
            </div>
            {errors[key] && (
                <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors[key]}</p>
            )}
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" />

            {/* Header */}
            <div className="text-center mb-8">
                <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-glow bg-accent`}
                >
                    {isAdmin ? <Shield className="w-10 h-10 text-dominant" /> : <GraduationCap className="w-10 h-10 text-dominant" />}
                </motion.div>
                <h1 className="font-display font-black text-3xl text-white mb-2">
                    {isRegister ? (isAdmin ? 'Admin Register' : 'Student Register') : t(isAdmin ? 'login.admin_title' : 'login.student_title')}
                </h1>
                <p className="text-white/60 text-sm font-medium">{isRegister ? 'Join our campus community today' : t('login.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {errors.submit && (
                    <div className={`p-3 rounded-xl border text-xs font-bold text-center uppercase tracking-wider ${errors.submit.includes('successful') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                        {errors.submit}
                    </div>
                )}
                {isRegister && inputField(<User className="w-4 h-4" />, 'name', 'text', "e.g. Rahul Kumar", "name")}
                {inputField(<Mail className="w-4 h-4" />, 'email', 'text', t('login.email_placeholder'), "email")}
                {inputField(<Lock className="w-4 h-4" />, 'password', 'password', t('login.password_placeholder'), "password")}

                <div className="flex items-center justify-between px-1">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={form.remember}
                                onChange={e => setForm(p => ({ ...p, remember: e.target.checked }))}
                                className="peer sr-only"
                            />
                            <div className="w-5 h-5 border-2 border-slate-300 dark:border-slate-600 rounded-md peer-checked:bg-primary-500 peer-checked:border-primary-500 transition-all" />
                            <Sparkles className="absolute inset-0 m-auto w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-primary-500 transition-colors uppercase tracking-wider">{t('login.remember')}</span>
                    </label>
                    <button type="button" className="text-xs font-bold text-primary-500 hover:text-primary-600 uppercase tracking-wider">
                        {t('login.forgot')}
                    </button>
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className={`w-full h-14 rounded-2xl font-black text-dominant bg-accent shadow-glow flex items-center justify-center gap-3 transition-all`}
                >
                    {loading ? (
                        <div className="w-6 h-6 border-3 border-dominant/30 border-t-dominant rounded-full animate-spin" />
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            <span className="uppercase tracking-[0.2em]">{isRegister ? "Register" : t('login.login_btn')}</span>
                        </>
                    )}
                </motion.button>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-white/5">
                <button
                    type="button"
                    onClick={() => {
                        setIsRegister(!isRegister);
                        setErrors({});
                    }}
                    className="text-xs font-bold text-slate-400 hover:text-primary-500 uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 mx-auto"
                >
                    {isRegister ? "Already have an account?" : t('login.no_account')}
                    <span className="text-primary-500 font-black">{isRegister ? "Sign In" : t('login.register')}</span>
                </button>
            </div>
        </motion.div>
    );
}

export function StudentLogin() {
    return (
        <div className="min-h-screen relative flex flex-col overflow-hidden font-sans bg-transparent">

            <Navbar />

            <div className="flex-1 flex items-center justify-center px-4 py-20 relative z-10">
                <div className="w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link to="/" className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-primary-500 transition-colors mb-8 uppercase tracking-[0.2em]">
                            <ArrowLeft className="w-4 h-4" /> Back to Home
                        </Link>
                    </motion.div>
                    <LoginForm isAdmin={false} />
                </div>
            </div>
        </div>
    );
}

export function AdminLogin() {
    return (
        <div className="min-h-screen relative flex flex-col overflow-hidden font-sans bg-transparent">

            <Navbar />

            <div className="flex-1 flex items-center justify-center px-4 py-20 relative z-10">
                <div className="w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link to="/" className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-primary-500 transition-colors mb-8 uppercase tracking-[0.2em]">
                            <ArrowLeft className="w-4 h-4" /> Back to Home
                        </Link>
                    </motion.div>
                    <LoginForm isAdmin={true} />
                </div>
            </div>
        </div>
    );
}

export default StudentLogin;
