import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function StatCard({ icon: Icon, label, value, trend, color, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            whileHover={{ y: -4 }}
            className="glass-card rounded-2xl p-5 hover:shadow-glow transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                {trend !== undefined && (
                    <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${trend > 0 ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' :
                            trend < 0 ? 'text-red-500 bg-red-100 dark:bg-red-900/30' :
                                'text-slate-500 bg-slate-100 dark:bg-slate-800'
                        }`}>
                        {trend > 0 ? <TrendingUp className="w-3 h-3" /> :
                            trend < 0 ? <TrendingDown className="w-3 h-3" /> :
                                <Minus className="w-3 h-3" />}
                        {Math.abs(trend)}%
                    </span>
                )}
            </div>
            <p className="text-2xl font-bold font-display text-slate-800 dark:text-white">{value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
        </motion.div>
    );
}

export function CircularProgress({ percentage, size = 100, strokeWidth = 8, color = 'url(#grad)' }) {
    const r = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * r;
    const offset = circumference * (1 - percentage / 100);

    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6172f3" />
                        <stop offset="100%" stopColor="#ff1db8" />
                    </linearGradient>
                    <linearGradient id="grad-warn" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                </defs>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none"
                    stroke="currentColor" strokeWidth={strokeWidth}
                    className="text-slate-200 dark:text-slate-700" />
                <motion.circle
                    cx={size / 2} cy={size / 2} r={r} fill="none"
                    stroke={percentage >= 75 ? 'url(#grad)' : 'url(#grad-warn)'}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className={`font-bold font-display ${size > 80 ? 'text-lg' : 'text-sm'
                    } ${percentage >= 75 ? 'gradient-text' : 'text-amber-500'}`}>
                    {percentage}%
                </span>
            </div>
        </div>
    );
}

export function ProgressBar({ value, max = 100, label, color = 'primary' }) {
    const pct = Math.min((value / max) * 100, 100);
    return (
        <div className="space-y-1">
            {label && (
                <div className="flex justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">{label}</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{pct.toFixed(0)}%</span>
                </div>
            )}
            <div className="progress-bar">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    className={`h-full rounded-full ${color === 'primary' ? 'bg-gradient-to-r from-primary-500 to-accent-500' :
                            color === 'success' ? 'bg-gradient-to-r from-emerald-400 to-teal-500' :
                                color === 'warning' ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
                                    'bg-gradient-to-r from-red-400 to-rose-500'
                        }`}
                />
            </div>
        </div>
    );
}

export function Badge({ children, variant = 'default' }) {
    const styles = {
        default: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
        success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
        warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
        danger: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
        info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${styles[variant]}`}>
            {children}
        </span>
    );
}
