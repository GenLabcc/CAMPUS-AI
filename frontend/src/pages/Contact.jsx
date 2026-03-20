import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail, Phone, MapPin, Send, MessageSquare,
    Globe, Clock, ArrowLeft, Sparkles, CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FloatingBlob } from '../components/AnimatedComponents';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setForm({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-transparent text-white font-sans selection:bg-accent selection:text-dominant relative overflow-hidden">
            {/* Background Decorations */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
            </div>

            <Navbar />

            <main className="relative z-10 pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card mb-8 border border-white/10"
                        >
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Get in Touch</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl sm:text-7xl font-black uppercase tracking-tighter mb-6 italic"
                        >
                            Contact <span className="gradient-text">Us</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 max-w-2xl mx-auto text-xl font-medium"
                        >
                            Have questions or need support? Our team is here to help you revolutionize your campus experience.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-card rounded-[3rem] p-8 sm:p-12 border border-white/10 shadow-2xl bg-white/[0.03] backdrop-blur-2xl"
                        >
                            <h2 className="text-3xl font-black uppercase tracking-tight italic mb-8">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Rahul Kumar"
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            className="w-full h-14 px-6 rounded-2xl bg-white/5 border-2 border-transparent focus:border-accent/30 focus:bg-white/10 outline-none transition-all font-bold text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="rahul@example.com"
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                            className="w-full h-14 px-6 rounded-2xl bg-white/5 border-2 border-transparent focus:border-accent/30 focus:bg-white/10 outline-none transition-all font-bold text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Subject</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="How can we help?"
                                        value={form.subject}
                                        onChange={e => setForm({ ...form, subject: e.target.value })}
                                        className="w-full h-14 px-6 rounded-2xl bg-white/5 border-2 border-transparent focus:border-accent/30 focus:bg-white/10 outline-none transition-all font-bold text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Message</label>
                                    <textarea
                                        required
                                        rows="6"
                                        placeholder="Tell us more about your inquiry..."
                                        value={form.message}
                                        onChange={e => setForm({ ...form, message: e.target.value })}
                                        className="w-full p-6 rounded-2xl bg-white/5 border-2 border-transparent focus:border-accent/30 focus:bg-white/10 outline-none transition-all font-bold text-sm resize-none"
                                    ></textarea>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={submitted}
                                    className={`w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-glow transition-all ${submitted ? 'bg-emerald-500' : 'bg-accent text-dominant'}`}
                                >
                                    {submitted ? (
                                        <>
                                            <CheckCircle className="w-5 h-5" />
                                            Message Sent
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-card rounded-[3rem] p-10 border border-white/10 bg-white/[0.03]"
                            >
                                <h2 className="text-3xl font-black uppercase tracking-tight italic mb-10">Our Office</h2>
                                <div className="space-y-8">
                                    <div className="flex gap-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                                            <MapPin className="w-7 h-7 text-dominant" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-1">Headquarters</p>
                                            <p className="text-xl font-bold italic leading-tight">Tamil Nadu Engineering Community,<br />IT Corridor, OMR Road, Chennai, TN - 600096</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:-rotate-6 transition-transform">
                                            <Mail className="w-7 h-7 text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Email Support</p>
                                            <p className="text-xl font-bold italic">support@campusai.hub</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:rotate-6 transition-transform">
                                            <Phone className="w-7 h-7 text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Direct Line</p>
                                            <p className="text-xl font-bold italic">+91 (044) 2839-4839</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="glass-card rounded-[2.5rem] p-8 border border-white/10 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Clock className="w-32 h-32 text-accent" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight italic mb-4">Working Hours</h3>
                                <div className="space-y-2 relative z-10">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-500">Monday - Friday:</span>
                                        <span>9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-500">Saturday:</span>
                                        <span>10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-accent">Sunday:</span>
                                        <span className="italic">AI Agent Support Only</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/5 py-12 px-4 bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-dominant" />
                        </div>
                        <span className="font-display font-black text-2xl text-white uppercase tracking-tighter">CampusAI Hub</span>
                    </div>
                    <div>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-2 leading-relaxed">
                            Tamil Nadu Engg. Community IT Hub,<br />Chennai - 600096
                        </p>
                        <p className="text-white/40 font-black text-[10px] uppercase">© 2026 • Built with AI for India 🇮🇳</p>
                    </div>
                    <div className="flex gap-6">
                        <Link to="/" className="text-slate-400 hover:text-white font-black text-xs uppercase tracking-widest transition-colors">Home</Link>
                        {['Instagram', 'Twitter', 'LinkedIn'].map(social => (
                            <a key={social} href="#" className="text-slate-400 hover:text-white font-black text-xs uppercase tracking-widest transition-colors">{social}</a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}

function GraduationCap(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
    );
}
