import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroParallax, type HeroParallaxProduct } from '@/components/ui/hero-parallax';

// 15 capstone project placeholder entries — replace thumbnails with real screenshots later
const CAPSTONE_PRODUCTS: HeroParallaxProduct[] = [
    {
        title: 'E-Commerce + Admin Dashboard',
        link: '#browse',
        thumbnail: 'https://placehold.co/600x400/1e3a5f/ffffff?text=E-Commerce+System',
    },
    {
        title: 'Student Enrollment System',
        link: '#browse',
        thumbnail: 'https://placehold.co/600x400/92400e/ffffff?text=Enrollment+System',
    },
    {
        title: 'Hospital Queue Management',
        link: '#browse',
        thumbnail: 'https://placehold.co/600x400/064e3b/ffffff?text=Hospital+Queue',
    },
    {
        title: 'Inventory Management System',
        link: '#browse',
        thumbnail: 'https://placehold.co/600x400/1e3a5f/ffffff?text=Inventory+System',
    },
    {
        title: 'Barangay Information System',
        link: '#browse',
        thumbnail: 'https://placehold.co/600x400/1e3a5f/ffffff?text=Barangay+System',
    },
    {
        title: 'POS System with Reports',
        link: '#browse',
        thumbnail: 'https://placehold.co/600x400/831843/ffffff?text=POS+System',
    },
    {
        title: 'Library Management System',
        link: '#browse',
        thumbnail: 'https://placehold.co/600x400/134e4a/ffffff?text=Library+System',
    },
    {
        title: 'Payroll Management System',
        link: '#browse',
        thumbnail: 'https://placehold.co/600x400/7c2d12/ffffff?text=Payroll+System',
    },
    {
        title: 'Online Voting System',
        link: '#browse',
        thumbnail: 'https://placehold.co/600x400/1e3a5f/ffffff?text=Voting+System',
    },
    {
        title: 'Hotel Reservation System',
        link: '#browse',
        thumbnail: 'https://placehold.co/600x400/1e3a5f/ffffff?text=Hotel+Reservation',
    },
    {
        title: 'Food Ordering System',
        link: '#browse',
        thumbnail: 'https://placehold.co/600x400/7f1d1d/ffffff?text=Food+Ordering',
    },
    {
        title: 'Employee Attendance Tracker',
        link: '#browse',
        thumbnail: 'https://placehold.co/600x400/0c4a6e/ffffff?text=Attendance+Tracker',
    },
    {
        title: 'Online Appointment System',
        link: '#browse',
        thumbnail: 'https://placehold.co/600x400/14532d/ffffff?text=Appointment+System',
    },
    {
        title: 'Scholarship Management',
        link: '#browse',
        thumbnail: 'https://placehold.co/600x400/92400e/ffffff?text=Scholarship+System',
    },
    {
        title: 'Crime Mapping & Reporting',
        link: '#browse',
        thumbnail: 'https://placehold.co/600x400/1e3a5f/ffffff?text=Crime+Mapping',
    },
];

function CapstoneHeader() {
    return (
        <div className="relative left-0 top-0 z-10 mx-auto w-full max-w-7xl px-6 py-24 md:py-40">
            {/* Animated badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-50 px-4 py-1.5"
            >
                <Star size={12} className="fill-amber-500 text-amber-500" />
                <span className="font-body text-xs font-medium text-amber-700">Capstone Projects Marketplace</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-display max-w-3xl text-4xl font-bold leading-[1.05] text-[#1E293B] md:text-6xl lg:text-7xl"
            >
                The #1 Source for{' '}
                <span className="bg-gradient-to-r from-[#3B82F6] to-blue-400 bg-clip-text text-transparent">
                    Capstone Projects
                </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="font-body mt-6 max-w-xl text-base leading-relaxed text-slate-700 md:text-xl"
            >
                Browse verified, production-ready capstone systems. Preview demos, purchase instantly, and customize for
                your requirements.
            </motion.p>

            {/* CTA row */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-8 flex flex-wrap gap-4"
            >
                <Button
                    asChild
                    size="lg"
                    className="group gap-2 bg-[#3B82F6] px-7 font-body font-semibold text-white hover:bg-blue-500"
                >
                    <Link href={route('auth.login')}>
                        Browse Capstones
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="mt-12 flex flex-wrap gap-8"
            >
                {[
                    { value: '500+', label: 'Projects' },
                    { value: '2,000+', label: 'Students' },
                    { value: '4.9★', label: 'Avg Rating' },
                ].map((stat) => (
                    <div key={stat.label}>
                        <p className="font-display text-2xl font-bold text-[#1E293B]">{stat.value}</p>
                        <p className="font-body mt-0.5 text-sm text-slate-600">{stat.label}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function HeroSection() {
    return <HeroParallax products={CAPSTONE_PRODUCTS} header={<CapstoneHeader />} />;
}
