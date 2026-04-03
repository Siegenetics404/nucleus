import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { router } from '@inertiajs/react';

// Registration is handled via Google OAuth only.
// This page redirects to the login page.
export default function Register() {
    useEffect(() => {
        router.visit(route('auth.login'), { replace: true });
    }, []);

    return (
        <>
            <Head title="Sign In" />
            <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
                <p className="font-body text-sm text-slate-400">Redirecting...</p>
            </div>
        </>
    );
}
