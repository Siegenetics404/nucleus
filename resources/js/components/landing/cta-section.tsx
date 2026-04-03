import { Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

export default function CtaSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="relative overflow-hidden bg-[#1E293B] py-32">
            {/* Animated blue blob */}
            <motion.div
                className="absolute right-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#3B82F6]/15 blur-[130px]"
                animate={{
                    scale: [1, 1.15, 0.95, 1.1, 1],
                    x: [0, 50, -25, 35, 0],
                }}
                transition={{ duration: 20, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
            />
            <motion.div
                className="absolute left-1/4 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-blue-400/10 blur-[100px]"
                animate={{ scale: [1, 0.9, 1.1, 0.95, 1], x: [0, -30, 20, -15, 0] }}
                transition={{ duration: 15, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', delay: 4 }}
            />

            {/* Top edge accent */}
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-3xl px-6 text-center" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
                >
                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-4 py-1.5">
                        <Sparkles size={13} className="text-[#3B82F6]" />
                        <span className="font-body text-xs font-medium text-blue-300">Join 2,000+ Students</span>
                    </div>

                    <h2 className="font-display text-4xl font-bold leading-tight text-slate-50 sm:text-5xl md:text-6xl">
                        Ready to pass your{' '}
                        <span className="bg-gradient-to-r from-[#3B82F6] to-blue-400 bg-clip-text text-transparent">
                            capstone?
                        </span>
                    </h2>

                    <p className="font-body mx-auto mt-6 max-w-xl text-lg text-slate-400">
                        Stop starting from scratch. Browse verified, production-ready capstone projects and customize one
                        for your requirements.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="gap-2 bg-[#3B82F6] px-8 font-body font-semibold text-white hover:bg-blue-500"
                        >
                            <Link href={route('auth.login')}>
                                Browse Projects <ArrowRight size={16} />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
