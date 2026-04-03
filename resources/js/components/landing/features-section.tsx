import { motion, useInView, type Variants } from 'framer-motion';
import { Code2, ShieldCheck, Users, Zap, type LucideIcon } from 'lucide-react';
import { useRef } from 'react';

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
    iconGradient: string;
}

const FEATURES: Feature[] = [
    {
        icon: Code2,
        title: 'Production-Ready Code',
        description: 'Every project is verified to run out of the box with full documentation and setup guides.',
        iconGradient: 'from-[#3B82F6] to-blue-700',
    },
    {
        icon: ShieldCheck,
        title: 'Verified & Reviewed',
        description: 'Each submission is reviewed by our team for code quality, security, and completeness.',
        iconGradient: 'from-[#1E293B] to-slate-700',
    },
    {
        icon: Zap,
        title: 'Instant Download',
        description: 'Purchase once, download immediately. Full source code, assets, and documentation included.',
        iconGradient: 'from-amber-400 to-orange-500',
    },
    {
        icon: Users,
        title: 'Community Driven',
        description: 'Built by students and developers who have been through the capstone grind themselves.',
        iconGradient: 'from-emerald-400 to-teal-500',
    },
];

export default function FeaturesSection() {
    const ref = useRef(null);
    const headerRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });

    const containerVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
    };

    return (
        <section id="features" className="bg-[#F8FAFC] py-28">
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 24 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-[#3B82F6]">
                        Why ChessUno
                    </p>
                    <h2 className="font-display text-4xl font-bold text-[#1E293B] sm:text-5xl">
                        Everything you need to{' '}
                        <span className="bg-gradient-to-r from-[#3B82F6] to-blue-700 bg-clip-text text-transparent">
                            pass your capstone
                        </span>
                    </h2>
                    <p className="font-body mx-auto mt-4 max-w-xl text-slate-500">
                        We've taken the guesswork out of capstone season. Every project is tested, documented, and ready
                        to customize.
                    </p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
                >
                    {FEATURES.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={itemVariants}
                            whileHover={{ y: -4 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            className="group rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all duration-300 hover:border-[#3B82F6]/30 hover:shadow-lg hover:shadow-blue-50"
                        >
                            {/* Icon */}
                            <div
                                className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${feature.iconGradient}`}
                            >
                                <feature.icon size={20} className="text-white" />
                            </div>

                            <h3 className="font-body mb-2 text-base font-semibold text-[#1E293B]">
                                {feature.title}
                            </h3>
                            <p className="font-body text-sm leading-relaxed text-slate-500">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
