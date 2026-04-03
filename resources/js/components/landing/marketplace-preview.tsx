import { Link } from '@inertiajs/react';
import { motion, useInView, type Variants } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { useRef } from 'react';

interface ProjectCard {
    id: number;
    title: string;
    description: string;
    category: string;
    categoryColor: string;
    categoryBg: string;
    stack: string[];
    rating: number;
    sales: number;
    gradientFrom: string;
    gradientTo: string;
}

const PROJECTS: ProjectCard[] = [
    {
        id: 1,
        title: 'E-Commerce Platform with Admin Dashboard',
        description: 'Full-featured online store with product management, cart, orders, and a comprehensive admin panel.',
        category: 'Web App',
        categoryColor: 'text-blue-700',
        categoryBg: 'bg-blue-50',
        stack: ['React', 'Laravel', 'MySQL'],
        rating: 4.9,
        sales: 142,
        gradientFrom: 'from-blue-100',
        gradientTo: 'to-blue-50',
    },
    {
        id: 2,
        title: 'Inventory Management System',
        description: 'Complete stock tracking solution with suppliers, purchase orders, and real-time inventory alerts.',
        category: 'Enterprise',
        categoryColor: 'text-violet-700',
        categoryBg: 'bg-violet-50',
        stack: ['Vue.js', 'Node.js', 'PostgreSQL'],
        rating: 4.8,
        sales: 98,
        gradientFrom: 'from-violet-100',
        gradientTo: 'to-violet-50',
    },
    {
        id: 3,
        title: 'Hospital Queue Management',
        description: 'Patient queue system with department routing, real-time display boards, and appointment booking.',
        category: 'Healthcare',
        categoryColor: 'text-emerald-700',
        categoryBg: 'bg-emerald-50',
        stack: ['React', 'PHP', 'MySQL'],
        rating: 4.7,
        sales: 76,
        gradientFrom: 'from-emerald-100',
        gradientTo: 'to-emerald-50',
    },
    {
        id: 4,
        title: 'Student Enrollment System',
        description: 'Academic registration platform with course selection, grade management, and student portal.',
        category: 'Education',
        categoryColor: 'text-amber-700',
        categoryBg: 'bg-amber-50',
        stack: ['Laravel', 'Blade', 'MySQL'],
        rating: 4.9,
        sales: 203,
        gradientFrom: 'from-amber-100',
        gradientTo: 'to-amber-50',
    },
    {
        id: 5,
        title: 'Barangay Information System',
        description: 'Government records management for residents, certificates, blotter reports, and clearances.',
        category: 'Government',
        categoryColor: 'text-sky-700',
        categoryBg: 'bg-sky-50',
        stack: ['PHP', 'MySQL', 'Bootstrap'],
        rating: 4.6,
        sales: 311,
        gradientFrom: 'from-sky-100',
        gradientTo: 'to-sky-50',
    },
    {
        id: 6,
        title: 'POS System with Sales Reports',
        description: 'Point-of-sale application with cash register, inventory sync, and detailed sales analytics.',
        category: 'Retail',
        categoryColor: 'text-pink-700',
        categoryBg: 'bg-pink-50',
        stack: ['React', 'Electron', 'SQLite'],
        rating: 4.8,
        sales: 89,
        gradientFrom: 'from-pink-100',
        gradientTo: 'to-pink-50',
    },
];

export default function MarketplacePreview() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    const containerVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
    };

    return (
        <section id="browse" className="bg-[#F8FAFC] py-28">
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <motion.div
                    ref={ref}
                    className="mb-10 flex flex-wrap items-end justify-between gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div>
                        <p className="mb-2 font-body text-xs font-semibold uppercase tracking-widest text-[#3B82F6]">
                            Marketplace
                        </p>
                        <h2 className="font-display text-4xl font-bold text-[#1E293B] sm:text-5xl">
                            Featured{' '}
                            <span className="bg-gradient-to-r from-[#3B82F6] to-blue-700 bg-clip-text text-transparent">
                                projects
                            </span>
                        </h2>
                    </div>
                    <Link
                        href={route('auth.login')}
                        className="group flex items-center gap-1.5 font-body text-sm font-medium text-slate-500 transition-colors hover:text-[#3B82F6]"
                    >
                        View all projects
                        <ArrowRight
                            size={15}
                            className="transition-transform group-hover:translate-x-0.5"
                        />
                    </Link>
                </motion.div>

                {/* Cards grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
                >
                    {PROJECTS.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            whileHover={{ y: -4 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            className="group cursor-pointer overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-all duration-300 hover:border-[#3B82F6]/30 hover:shadow-lg hover:shadow-blue-50"
                        >
                            {/* Placeholder image area */}
                            <div
                                className={`flex h-36 items-center justify-center bg-gradient-to-br ${project.gradientFrom} ${project.gradientTo} border-b border-[#E2E8F0]`}
                            >
                                <div className="text-center">
                                    <div className="mx-auto mb-1.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                                        <span className="font-display text-lg font-bold text-[#1E293B]/60">
                                            {project.title.charAt(0)}
                                        </span>
                                    </div>
                                    <span className="font-body text-xs text-slate-400">Preview Available</span>
                                </div>
                            </div>

                            {/* Card body */}
                            <div className="p-5">
                                {/* Category */}
                                <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-body text-xs font-medium ${project.categoryColor} ${project.categoryBg}`}
                                >
                                    {project.category}
                                </span>

                                {/* Title */}
                                <h3 className="font-body mt-2.5 line-clamp-2 text-sm font-semibold leading-snug text-[#1E293B] transition-colors group-hover:text-[#3B82F6]">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="font-body mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
                                    {project.description}
                                </p>

                                {/* Tech stack pills */}
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {project.stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-0.5 font-body text-xs text-slate-500"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="mt-4 flex items-center gap-1.5 border-t border-[#E2E8F0] pt-4">
                                    <Star size={13} className="fill-amber-400 text-amber-400" />
                                    <span className="font-body text-sm font-medium text-[#1E293B]">{project.rating}</span>
                                    <span className="font-body text-xs text-slate-400">· {project.sales} purchases</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
