import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, Bot, User, Sparkles, ChevronRight, MessageSquare,
    RotateCcw, Mic, Paperclip, Smile, Cpu, Zap, Search
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const suggestedQuestions = [
    { en: 'B.Tech Syllabus?', ta: 'B.Tech பாடத்திட்டம்?', hi: 'बी.टेक सिलेबस?', kn: 'ಬಿ.ಟೆಕ್ ಪಠ್ಯಕ್ರಮ?', hinen: 'Syllabus kya hai?' },
    { en: 'Fee Due Date?', ta: 'கட்டண தேதி?', hi: 'फीस देय तिथि?', kn: 'ಶುಲ್ಕ ಪಾವತಿ ದಿನಾಂಕ?', hinen: 'Fees kab bharni hai?' },
    { en: 'Exam Schedule?', ta: 'தேர்வு அட்டவணை?', hi: 'परीक्षा समय सारिणी?', kn: 'ಪರೀಕ್ಷಾ ವೇಳಾಪಟ್ಟಿ?', hinen: 'Exams kab hain?' },
    { en: 'Attendance check?', ta: 'வருகை சரிபார்ப்பு?', hi: 'उपस्थिति जांच?', kn: 'ಹಾಜರಾತಿ ತಪಾಸಣೆ?', hinen: 'Attendance kaise check karein?' },
];

const botResponsesHinglish = {
    'syllabus': `B.Tech CSE Syllabus (5th Semester):\n\n• CS301 – DSA (4 credits)\n• CS302 – OOPs (3 credits)\n• MA301 – Maths III (4 credits)\n• CS303 – Networks (3 credits)\n• CS304 – OS (3 credits)\n\nYe semester total 19 credits ka hai. Kisi subject ki details chahiye?`,
    'fee': `Fees ki Details:\n\n• Semester Fees: ₹12,500 (March 20) tak bharni hai\n• Exam Fees: ₹850 (March 25) tak\n• Transport Fees: ₹1,800 (April 1) tak\n\nTotal Due: ₹15,150\n\nLate fees se bachne ke liye time pe bhar dena. Payment kaise karni hai bataun?`,
    'exam': `Exam Schedule:\n\n• Mar 10 – DSA (9:00 AM)\n• Mar 12 – DE (2:00 PM)\n• Mar 15 – Maths III (9:00 AM)\n• Mar 18 – Networks (2:00 PM)\n• Mar 20 – OS (9:00 AM)\n\nVenue: Main Exam Hall. Hall tickets portal pe mil jayengi.`,
    'attendance': `Attendance kaise check karein:\n\n1. Dashboard → Attendance pe jao\n2. Ya sidebar mein "Attendance" click karo\n3. Aapka subject-wise percentage dikh jayega\n4. Exams ke liye 75% zaroori hai\n\nAapki attendance: 87%`,
    'default': `Main aapki help kar sakta hoon! Aap mujhse ye pucch sakte hain:\n\n• Syllabus aur Course details\n• Fees ki due dates aur payment\n• Exam schedule\n• Attendance status\n• Results aur grades\n\nAapko kya jaana hai?`,
};

const botResponses = {
    'syllabus': `B.Tech CSE Syllabus (5th Semester):\n\n• CS301 – Data Structures & Algorithms (4 credits)\n• CS302 – Object Oriented Programming (3 credits)\n• MA301 – Engineering Mathematics III (4 credits)\n• CS303 – Computer Networks (3 credits)\n• CS304 – Operating Systems (3 credits)\n• CS305L – DSA Lab (2 credits)\n\nTotal: 19 credits this semester. Want details on any subject?`,
    'fee': `Fee Due Details:\n\n• Semester Fee: ₹12,500 due by March 20, 2025\n• Exam Fee: ₹850 due by March 25, 2025\n• Transport Fee: ₹1,800 due by April 1, 2025\n\nTotal Due: ₹15,150\n\nPlease clear payments before the deadline to avoid penalties. Need help with payment modes?`,
    'exam': `Upcoming Exam Schedule:\n\n• Mar 10 – Data Structures & Algorithms (9:00 AM)\n• Mar 12 – Digital Electronics (2:00 PM)\n• Mar 15 – Engineering Maths III (9:00 AM)\n• Mar 18 – Computer Networks (2:00 PM)\n• Mar 20 – Operating Systems (9:00 AM)\n\nVenue: Main Examination Hall. Hall tickets available on the portal.`,
    'attendance': `How to Check Attendance:\n\n1. Go to Dashboard → Attendance section\n2. Or click on "Attendance" in the sidebar\n3. Your subject-wise attendance will be displayed\n4. Minimum 75% required to appear for exams\n\nYour current overall attendance: 87%`,
    'default': `I'm here to help! I can assist you with:\n\n• Syllabus & Course info\n• Fee due dates & payments\n• Exam schedules\n• Attendance details\n• Results & grades\n\nWhat would you like to know about?`,
};

function getResponse(message) {
    const lower = message.toLowerCase();
    const isHinglish = lower.includes('kya') || lower.includes('hai') || lower.includes('kab') || lower.includes('kaise') || lower.includes('batao') || lower.includes('pucho') || lower.includes('chahiye') || lower.includes('karne');

    if (lower.includes('syllabus') || lower.includes('course') || lower.includes('subject') || lower.includes('पाठ्यक्रम')) {
        return isHinglish || lower.includes('kya') ? botResponsesHinglish.syllabus : botResponses.syllabus;
    }
    if (lower.includes('fee') || lower.includes('pay') || lower.includes('due') || lower.includes('bharni') || lower.includes('paisa') || lower.includes('karna')) {
        return isHinglish || lower.includes('kab') ? botResponsesHinglish.fee : botResponses.fee;
    }
    if (lower.includes('exam') || lower.includes('schedule') || lower.includes('paper') || lower.includes('test') || lower.includes('kab hai')) {
        return isHinglish || lower.includes('kab') ? botResponsesHinglish.exam : botResponses.exam;
    }
    if (lower.includes('attendance') || lower.includes('present') || lower.includes('percentage')) {
        return isHinglish || lower.includes('kitni') ? botResponsesHinglish.attendance : botResponses.attendance;
    }

    return isHinglish ? botResponsesHinglish.default : botResponses.default;
}

function TypingIndicator() {
    return (
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl flex items-center gap-1.5 py-3 px-5 border border-white/10">
                {[0, 1, 2].map(i => (
                    <motion.div
                        key={i}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-primary-400"
                    />
                ))}
            </div>
        </div>
    );
}

function formatMessageText(text) {
    if (typeof text !== 'string') return text;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
        }
        return <span key={index}>{part}</span>;
    });
}

function ChatMessage({ msg }) {
    const isUser = msg.role === 'user';
    return (
        <motion.div
            initial={{ opacity: 0, x: isUser ? 20 : -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
        >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${isUser
                ? 'bg-gradient-to-br from-violet-500 to-indigo-600'
                : 'bg-gradient-to-br from-primary-600 to-accent-600'
                }`}>
                {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-3xl text-sm leading-relaxed backdrop-blur-xl border ${isUser
                ? 'bg-primary-500/90 text-white rounded-br-none border-primary-400/30'
                : 'bg-white/10 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-bl-none border-white/10'
                }`}>
                <p className="whitespace-pre-wrap font-medium text-slate-600 dark:text-slate-300">
                    {formatMessageText(msg.text)}
                </p>
                <p className={`text-[10px] mt-2 font-black uppercase tracking-widest opacity-60`}>{msg.time}</p>
            </div>
        </motion.div>
    );
}

export default function Chatbot() {
    const { t, i18n } = useTranslation();
    const { user } = useAuth();
    const [messages, setMessages] = useState([
        { id: 1, role: 'bot', text: t('chatbot.welcome'), time: 'AI READY' },
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        // Reset messages immediately when user changes to ensure privacy
        setMessages([{ id: 'welcome', role: 'bot', text: t('chatbot.welcome'), time: 'AI READY' }]);

        async function fetchHistory() {
            try {
                const { apiFetch, ENDPOINTS } = await import('../api');
                const response = await apiFetch(`${ENDPOINTS.CHAT}/history`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.history && data.history.length > 0) {
                        setMessages([
                            { id: 'welcome', role: 'bot', text: t('chatbot.welcome'), time: 'AI READY' },
                            ...data.history
                        ]);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch chat history:", err);
            }
        }
        
        if (user) {
            fetchHistory();
        }
    }, [user?.id, t]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    const sendMessage = async (text) => {
        if (!text.trim()) return;
        const userMsg = {
            id: Date.now(),
            role: 'user',
            text: text.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setTyping(true);

        try {
            const { apiFetch, ENDPOINTS } = await import('../api');
            const response = await apiFetch(ENDPOINTS.CHAT, {
                method: 'POST',
                body: JSON.stringify({ message: text.trim() }),
            });

            if (response.ok) {
                const data = await response.json();
                setTyping(false);
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    role: 'bot',
                    text: data.response,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }]);
            } else {
                throw new Error('Failed to get response');
            }
        } catch (error) {
            setTyping(false);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'bot',
                text: "⚠️ Connection error. Please check your internet connection or backend status.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-slate-900 dark:text-white overflow-hidden relative transition-colors duration-300">
            <Sidebar />
            <Navbar />

            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-500/10 dark:bg-primary-500/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-500/10 dark:bg-accent-500/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] dark:opacity-[0.05]" />
            </div>

            <main className="lg:pl-[230px] pt-20 h-screen flex flex-col relative z-10">
                <div className="flex-1 max-w-5xl mx-auto w-full flex flex-col p-4 lg:p-8 overflow-hidden">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-[2rem] p-6 mb-6 flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-2xl"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20 relative">
                                <Bot className="w-8 h-8 text-white" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                            </div>
                            <div>
                                <h1 className="font-display font-black text-2xl uppercase tracking-tighter italic text-slate-800 dark:text-white">
                                    Campus <span className="gradient-text italic">Oracle</span>
                                </h1>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Cpu className="w-3 h-3" /> AI Core 4.0 Active • Neural Link Verified
                                </p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-6">
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Authenticated As</p>
                                <p className="text-sm font-bold gradient-text italic">{user?.name || 'Guest User'}</p>
                            </div>
                            <button onClick={() => setMessages([{ id: 1, role: 'bot', text: t('chatbot.welcome'), time: 'RESET' }])}
                                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group">
                                <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500 text-slate-400" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Chat Interface */}
                    <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
                        {/* Sidebar info / Suggestions (Desktop only) */}
                        <div className="hidden lg:flex flex-col gap-6 w-80 shrink-0">
                            <div className="glass-card rounded-[2rem] p-6 border border-white/10 flex-1">
                                <div className="flex items-center gap-2 mb-6">
                                    <Sparkles className="w-5 h-5 text-primary-500" />
                                    <h2 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">Gen-AI Insights</h2>
                                </div>
                                <div className="space-y-3">
                                    {suggestedQuestions.map((q, i) => (
                                        <button
                                            key={i}
                                            onClick={() => sendMessage(q[i18n.language] || q.en)}
                                            className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary-500/50 hover:bg-primary-500/5 text-left transition-all group"
                                        >
                                            <p className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                                                {q[i18n.language] || q.en}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-8 pt-8 border-t border-white/5">
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-rose-500/20 border border-orange-500/20">
                                        <Zap className="w-5 h-5 text-orange-500" />
                                        <p className="text-[9px] font-black uppercase tracking-widest text-orange-400">Pro Tip: Ask about credits!</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Central Chat Window */}
                        <div className="flex-1 flex flex-col glass-card rounded-[2.5rem] border border-white/10 overflow-hidden relative shadow-2xl">
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                                {messages.map(msg => <ChatMessage key={msg.id} msg={msg} />)}
                                {typing && <TypingIndicator />}
                                <div ref={bottomRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-6 bg-white/80 dark:bg-slate-900/50 backdrop-blur-3xl border-t border-slate-200 dark:border-white/10">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-primary-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                                    <div className="relative flex items-end gap-3 glass-card rounded-3xl p-3 border border-white/10">
                                        <textarea
                                            value={input}
                                            onChange={e => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Ask Oracle anything..."
                                            className="flex-1 bg-transparent px-4 py-3 outline-none resize-none text-sm font-bold text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                                            rows={1}
                                            style={{ maxHeight: '150px' }}
                                        />
                                        <div className="flex gap-2 pb-1">
                                            <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                                                <Mic className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => sendMessage(input)}
                                                disabled={!input.trim()}
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${input.trim()
                                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/50'
                                                    : 'bg-white/5 text-slate-600'
                                                    }`}
                                            >
                                                <Send className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
