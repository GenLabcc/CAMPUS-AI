import React from 'react';
import { motion } from 'framer-motion';

export const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' }
    }),
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
};

export const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};

export function PageTransition({ children, className = '' }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function AnimatedCard({ children, className = '', delay = 0, ...rest }) {
    return (
        <motion.div
            variants={fadeUp}
            custom={delay}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={className}
            {...rest}
        >
            {children}
        </motion.div>
    );
}

export function FloatingBlob({ className }) {
    return (
        <motion.div
            animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                scale: [1, 1.05, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute rounded-full filter blur-3xl opacity-30 pointer-events-none ${className}`}
        />
    );
}

export function InteractiveBackground({ isAdmin = false }) {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505]">
            {/* Drifting Blobs */}
            <motion.div
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -80, 100, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] ${isAdmin ? 'bg-indigo-500/10' : 'bg-accent/10'} blur-[140px] rounded-full`}
            />
            <motion.div
                animate={{
                    x: [0, -120, 60, 0],
                    y: [0, 150, -40, 0],
                    scale: [1, 0.8, 1.1, 1],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-white/5 blur-[160px] rounded-full"
            />

            {/* Mouse Glow */}
            <motion.div
                animate={{
                    x: mousePos.x - 200,
                    y: mousePos.y - 200,
                }}
                transition={{ type: "spring", damping: 30, stiffness: 100 }}
                className={`absolute w-[400px] h-[400px] ${isAdmin ? 'bg-indigo-500/5' : 'bg-accent/5'} blur-[100px] rounded-full pointer-events-none`}
            />

            {/* Breathing Grid Layout (Subtle) */}
            <motion.div
                animate={{ opacity: [0.03, 0.06, 0.03] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none"
            />
        </div>
    );
}
