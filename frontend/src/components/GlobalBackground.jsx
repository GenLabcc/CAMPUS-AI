import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { FloatingBlob } from './AnimatedComponents';

const backgroundImage = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=2070';

export default function GlobalBackground() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="fixed inset-0 z-[-100] bg-slate-950 overflow-hidden">
            {isHome ? (
                <>
                    <motion.div
                        key="static-bg"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('${backgroundImage}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 transition-all duration-500" />
                </>
            ) : (
                <>
                    <div className="absolute inset-0 bg-black/40 transition-all duration-500" />
                    <FloatingBlob className="w-[600px] h-[600px] bg-accent/20 top-[-10%] left-[-10%] blur-[120px]" />
                    <FloatingBlob className="w-[600px] h-[600px] bg-white/10 bottom-[-10%] right-[-10%] blur-[120px]" />
                </>
            )}
        </div>
    );
}
