import { motion, useInView } from 'framer-motion';
import { CreditCard, Download, Eye, GraduationCap, Search, type LucideIcon } from 'lucide-react';
import { useRef } from 'react';

interface Step {
    number: string;
    title: string;
    description: string;
    icon: LucideIcon;
}

const STEPS: Step[] = [
    {
        number: '01',
        title: 'Browse Projects',
        description: 'Filter by tech stack, category, or budget. Find the perfect base for your capstone requirements.',
        icon: Search,
    },
    {
        number: '02',
        title: 'Preview & Inspect',
        description: 'View live demos, screenshots, and read detailed documentation before making any decision.',
        icon: Eye,
    },
    {
        number: '03',
        title: 'Purchase Securely',
        description: 'One-time payment — no subscriptions, no hidden fees. Instant access to the full source code.',
        icon: CreditCard,
    },
    {
        number: '04',
        title: 'Download & Run',
        description: 'Get the zip, follow the README, and have your project running in under 10 minutes.',
        icon: Download,
    },
    {
        number: '05',
        title: 'Customize & Submit',
        description: "Tweak it to your exact requirements. Make it yours. Pass your capstone with confidence.",
        icon: GraduationCap,
    },
];

export default function HowItWorks() {
    const ref = useRef(null);
    const headerRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });

    return (
        <section id="how-it-works" className="bg-white py-28">
            <div className="mx-auto max-w-5xl px-6">
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    className="mb-20 text-center"
                    initial={{ opacity: 0, y: 24 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-[#3B82F6]">
                        How It Works
                    </p>
                    <h2 className="font-display text-4xl font-bold text-[#1E293B] sm:text-5xl">
                        From zero to{' '}
                        <span className="bg-gradient-to-r from-[#3B82F6] to-blue-700 bg-clip-text text-transparent">
                            submitted
                        </span>{' '}
                        in 5 steps
                    </h2>
                    <p className="font-body mx-auto mt-4 max-w-md text-slate-500">
                        No guesswork. No wasted time. Just a clean, repeatable path to getting your capstone done.
                    </p>
                </motion.div>

                {/* Steps */}
                <div ref={ref} className="relative">
                    {/* Connecting vertical line (desktop only) */}
                    <div className="absolute bottom-8 left-1/2 top-8 hidden w-px -translate-x-1/2 bg-gradient-to-b from-[#3B82F6]/0 via-[#3B82F6]/25 to-[#3B82F6]/0 lg:block" />

                    <div className="flex flex-col gap-8">
                        {STEPS.map((step, index) => {
                            const isEven = index % 2 === 1;
                            return (
                                <motion.div
                                    key={step.number}
                                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 30 : -30 }}
                                    transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                                    className={`flex items-center gap-6 lg:gap-0 ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
                                >
                                    {/* Content card */}
                                    <div className="w-full lg:w-[calc(50%-3.5rem)]">
                                        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#3B82F6]/30 hover:shadow-md">
                                            <span className="font-display block text-5xl font-bold leading-none text-[#3B82F6]/20">
                                                {step.number}
                                            </span>
                                            <h3 className="font-body mt-3 text-lg font-semibold text-[#1E293B]">
                                                {step.title}
                                            </h3>
                                            <p className="font-body mt-2 text-sm leading-relaxed text-slate-500">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center connector icon node */}
                                    <div className="relative z-10 hidden shrink-0 lg:flex lg:w-28 lg:justify-center">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10">
                                            <step.icon size={20} className="text-[#3B82F6]" />
                                        </div>
                                    </div>

                                    {/* Mobile icon */}
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 lg:hidden">
                                        <step.icon size={18} className="text-[#3B82F6]" />
                                    </div>

                                    {/* Spacer for alternating side */}
                                    <div className="hidden w-[calc(50%-3.5rem)] lg:block" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
