import { Link } from '@inertiajs/react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Check } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

const tiers = [
    {
        name: 'Starter',
        price: 'Free',
        priceSub: 'forever',
        description: 'Browse and preview all projects. Purchase individual projects at listed prices.',
        features: [
            'Browse all projects',
            'View live demos',
            'Read documentation previews',
            'Purchase individual projects',
            'Email support',
        ],
        cta: 'Get Started Free',
        href: 'auth.register',
        highlighted: false,
    },
    {
        name: 'Pro Access',
        price: '₱999',
        priceSub: 'one-time payment',
        description: 'Unlimited access to every project. Download everything, forever.',
        features: [
            'Everything in Starter',
            'Unlimited project downloads',
            'Priority support & guidance',
            'Early access to new projects',
            'Source code customization help',
            'Certificate of purchase',
        ],
        cta: 'Get Pro Access',
        href: 'auth.register',
        highlighted: true,
        badge: 'Most Popular',
    },
];

export default function PricingSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    const containerVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
    };

    return (
        <section id="pricing" className="bg-[#060A10] py-28">
            <div className="mx-auto max-w-4xl px-6">
                {/* Header */}
                <motion.div
                    ref={ref}
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-indigo-400">
                        Pricing
                    </p>
                    <h2 className="font-display text-4xl font-bold text-slate-50 sm:text-5xl">
                        Simple,{' '}
                        <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                            transparent
                        </span>{' '}
                        pricing
                    </h2>
                    <p className="font-body mx-auto mt-4 max-w-md text-slate-400">
                        No subscriptions. No hidden fees. Pay once, own forever.
                    </p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 items-start gap-6 md:grid-cols-2"
                >
                    {tiers.map((tier) =>
                        tier.highlighted ? (
                            <motion.div key={tier.name} variants={itemVariants} className="relative">
                                {/* Glow */}
                                <div className="absolute inset-0 -z-10 rounded-2xl bg-indigo-600/10 blur-3xl" />
                                {/* Gradient border wrapper */}
                                <div className="rounded-2xl bg-gradient-to-b from-indigo-500/60 to-violet-500/60 p-[1px]">
                                    <div className="rounded-[14px] bg-[#0D1117] p-8">
                                        <div className="mb-1 flex items-center justify-between">
                                            <p className="font-body text-xs font-semibold uppercase tracking-widest text-indigo-400">
                                                {tier.name}
                                            </p>
                                            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 font-body text-xs font-medium text-amber-400">
                                                {tier.badge}
                                            </span>
                                        </div>
                                        <div className="mt-3 flex items-baseline gap-1">
                                            <span className="font-display text-5xl font-bold text-slate-50">
                                                {tier.price}
                                            </span>
                                            <span className="font-body text-sm text-slate-400">{tier.priceSub}</span>
                                        </div>
                                        <p className="font-body mt-3 mb-8 text-sm text-slate-400">{tier.description}</p>
                                        <ul className="space-y-3">
                                            {tier.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-3">
                                                    <Check size={16} className="shrink-0 text-indigo-400" />
                                                    <span className="font-body text-sm text-slate-200">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            asChild
                                            size="lg"
                                            className="mt-8 w-full bg-indigo-600 font-body font-semibold text-white hover:bg-indigo-500"
                                        >
                                            <Link href={route(tier.href as Parameters<typeof route>[0])}>
                                                {tier.cta}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={tier.name}
                                variants={itemVariants}
                                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8"
                            >
                                <p className="font-body text-xs font-semibold uppercase tracking-widest text-slate-400">
                                    {tier.name}
                                </p>
                                <div className="mt-3 flex items-baseline gap-1">
                                    <span className="font-display text-5xl font-bold text-slate-50">{tier.price}</span>
                                    <span className="font-body text-sm text-slate-400">{tier.priceSub}</span>
                                </div>
                                <p className="font-body mt-3 mb-8 text-sm text-slate-400">{tier.description}</p>
                                <ul className="space-y-3">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <Check size={16} className="shrink-0 text-slate-500" />
                                            <span className="font-body text-sm text-slate-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="mt-8 w-full border-white/20 font-body font-medium text-slate-300 hover:border-white/30 hover:bg-white/[0.06] hover:text-slate-100"
                                >
                                    <Link href={route(tier.href as Parameters<typeof route>[0])}>
                                        {tier.cta}
                                    </Link>
                                </Button>
                            </motion.div>
                        ),
                    )}
                </motion.div>
            </div>
        </section>
    );
}
