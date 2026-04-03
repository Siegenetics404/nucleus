import { Head, usePage } from '@inertiajs/react';
import Footer from '@/components/landing/footer';
import HeroSection from '@/components/landing/hero-section';
import LandingNavbar from '@/components/landing/landing-navbar';
import type { SharedData } from '@/types';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const isLoggedIn = !!auth?.user;
    const userRole = (auth?.user as Record<string, unknown>)?.user_role as 'admin' | 'user' | undefined;

    return (
        <>
            <Head title="Capstone Projects Marketplace">
                <meta
                    name="description"
                    content="Browse and buy production-ready capstone projects. Preview demos, purchase instantly, and have it running in minutes."
                />
            </Head>

            <div className="min-h-screen">
                <LandingNavbar isLoggedIn={isLoggedIn} userRole={userRole} />
                <HeroSection />
                <Footer />
            </div>
        </>
    );
}
