import { Link } from '@inertiajs/react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LandingNavbarProps {
    isLoggedIn: boolean;
    userRole?: 'admin' | 'user';
}

const NAV_LINKS = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Browse', href: '#browse' },
];

export default function LandingNavbar({ isLoggedIn, userRole }: LandingNavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { scrollY } = useScroll();

    const rawBgOpacity = useTransform(scrollY, [0, 60], [0, 1]);
    const smoothBgOpacity = useSpring(rawBgOpacity, { stiffness: 120, damping: 30 });

    const rawHeight = useTransform(scrollY, [0, 100], [80, 64]);
    const smoothHeight = useSpring(rawHeight, { stiffness: 120, damping: 30 });

    const dashboardRoute =
        isLoggedIn ? (userRole === 'admin' ? route('admin.dashboard') : route('user.dashboard')) : route('auth.login');

    return (
        <>
            <motion.header
                className="fixed left-0 right-0 top-0 z-50"
                style={isMounted ? { height: smoothHeight } : { height: 80 }}
            >
                {/* Glass background — light to match light hero */}
                <motion.div
                    className="absolute inset-0 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md"
                    style={isMounted ? { opacity: smoothBgOpacity } : { opacity: 0 }}
                />

                {/* Content */}
                <div className="relative z-10 flex h-full items-center justify-between px-6 lg:px-8">
                    {/* Logo */}
                    <Link href={route('home')} className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3B82F6]">
                            <GraduationCap size={16} className="text-white" />
                        </div>
                        <span className="font-display text-lg font-bold text-[#1E293B]">
                            Chess<span className="text-[#3B82F6]">uno</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-8 md:flex">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="font-body text-sm font-medium text-[#475569] transition-colors hover:text-[#1E293B]"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden items-center gap-3 md:flex">
                        {isLoggedIn ? (
                            <Button
                                asChild
                                size="sm"
                                className="bg-[#3B82F6] font-body font-semibold text-white hover:bg-blue-500"
                            >
                                <Link href={dashboardRoute}>Dashboard</Link>
                            </Button>
                        ) : (
                            <Button
                                asChild
                                size="sm"
                                className="bg-[#3B82F6] font-body font-semibold text-white hover:bg-blue-500"
                            >
                                <Link href={route('auth.login')}>Sign In</Link>
                            </Button>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#475569] transition-colors hover:border-[#CBD5E1] hover:text-[#1E293B] md:hidden"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="fixed left-0 right-0 top-[80px] z-40 overflow-hidden border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md md:hidden"
                    >
                        <nav className="flex flex-col gap-1 px-6 py-4">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="font-body rounded-lg px-3 py-3 text-sm font-medium text-[#475569] transition-colors hover:bg-[#F1F5F9] hover:text-[#1E293B]"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className={cn('mt-3 border-t border-[#E2E8F0] pt-4')}>
                                {isLoggedIn ? (
                                    <Button
                                        asChild
                                        className="w-full bg-[#3B82F6] font-body font-semibold text-white hover:bg-blue-500"
                                    >
                                        <Link href={dashboardRoute} onClick={() => setMobileOpen(false)}>
                                            Dashboard
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button
                                        asChild
                                        className="w-full bg-[#3B82F6] font-body font-semibold text-white hover:bg-blue-500"
                                    >
                                        <Link href={route('auth.login')} onClick={() => setMobileOpen(false)}>
                                            Sign In
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
