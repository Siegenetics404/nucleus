import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LoginProps {
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Login({ flash }: LoginProps) {
    const [flashMessage, setFlashMessage] = useState<{
        type: 'success' | 'error' | null;
        message: string | null;
    }>({ type: null, message: null });

    useEffect(() => {
        if (flash?.success) {
            setFlashMessage({ type: 'success', message: flash.success });
        } else if (flash?.error) {
            setFlashMessage({ type: 'error', message: flash.error });
        } else {
            setFlashMessage({ type: null, message: null });
        }
    }, [flash]);

    return (
        <>
            <Head title="Sign In" />
            <div
                className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-6"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.07) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full max-w-sm"
                >
                    {/* Card */}
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
                        {/* Logo + branding */}
                        <div className="mb-8 flex flex-col items-center text-center">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#3B82F6]">
                                <GraduationCap size={22} className="text-white" />
                            </div>
                            <h1 className="font-display text-2xl font-bold text-[#1E293B]">
                                Welcome to ChessUno
                            </h1>
                            <p className="font-body mt-2 text-sm text-slate-500">
                                Sign in to access your capstone projects
                            </p>
                        </div>

                        {/* Flash messages */}
                        {flashMessage.message && (
                            <div
                                className={`mb-6 rounded-xl border px-4 py-3 font-body text-sm ${
                                    flashMessage.type === 'error'
                                        ? 'border-red-200 bg-red-50 text-red-700'
                                        : 'border-green-200 bg-green-50 text-green-700'
                                }`}
                            >
                                {flashMessage.message}
                            </div>
                        )}

                        {/* Google Sign In button */}
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                window.location.href = route('auth.google');
                            }}
                            className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#E2E8F0] bg-white px-5 py-3.5 font-body text-sm font-medium text-[#1E293B] shadow-sm transition-all duration-200 hover:border-[#3B82F6]/40 hover:bg-[#F8FAFC] hover:shadow-md"
                        >
                            {/* Google Logo SVG */}
                            <svg className="h-5 w-5 shrink-0" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill="#4285F4"
                                    d="M24 9.5c3.54 0 6.52 1.28 8.96 3.36l6.64-6.64C34.82 2.02 29.7 0 24 0 14.32 0 6.06 5.74 2.21 13.97l7.81 6.07C12.12 13.34 17.56 9.5 24 9.5z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M46.04 24.5c0-1.47-.13-2.88-.37-4.25H24v8.5h12.54c-.56 2.87-2.07 5.32-4.26 7.05l6.7 6.7c4.31-3.98 6.77-9.79 6.77-16z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M10.26 28.65c-.64-1.91-1-3.95-1-6.05s.36-4.14 1-6.05l-7.81-6.07C.79 13.17 0 18.44 0 24c0 5.56.79 10.83 2.21 15.52l8.05-6.18z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M24 48c5.7 0 10.82-2.02 14.7-5.45l-6.7-6.7c-1.96 1.31-4.42 2.07-7 2.07-6.44 0-11.88-3.84-14.04-9.35l-8.05 6.18C6.06 42.26 14.32 48 24 48z"
                                />
                            </svg>
                            Continue with Google
                        </motion.button>

                        {/* Divider */}
                        <div className="my-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-[#E2E8F0]" />
                            <span className="font-body text-xs text-slate-400">secure sign-in</span>
                            <div className="h-px flex-1 bg-[#E2E8F0]" />
                        </div>

                        {/* Trust indicators */}
                        <div className="flex items-center justify-center gap-5">
                            {['Verified Projects', 'Instant Access', 'Secure Checkout'].map((item) => (
                                <div key={item} className="flex items-center gap-1.5">
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" />
                                    <span className="font-body text-xs text-slate-400">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Back to home */}
                    <p className="mt-5 text-center font-body text-sm text-slate-500">
                        <a href={route('home')} className="font-medium text-[#3B82F6] transition-colors hover:text-blue-700">
                            ← Back to home
                        </a>
                    </p>
                </motion.div>
            </div>
        </>
    );
}
