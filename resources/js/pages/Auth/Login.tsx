import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <div className="flex min-h-screen bg-[#0B0B0F]">
                {/* Left brand panel */}
                <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#1A1A22] to-[#0B0B0F] lg:flex lg:w-1/2">
                    <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#FF7A45] to-[#FF4D6D] opacity-20 blur-3xl" />
                    <div className="absolute right-0 bottom-0 h-[320px] w-[320px] rounded-full bg-gradient-to-tr from-[#FF4D6D] to-[#FF7A45] opacity-10 blur-3xl" />

                    <div className="relative z-10 flex w-full flex-col justify-between p-16">
                        <Link href="/" className="font-['Bruno_Ace_SC'] text-xl tracking-wide text-white">
                            NUCLEUS
                        </Link>

                        <div>
                            <h1 className="mb-6 font-['Bruno_Ace_SC'] text-4xl leading-tight text-white">
                                Run your trade business
                                <br />
                                without the busywork.
                            </h1>
                            <p className="max-w-md font-['Space_Grotesk'] text-base text-[#9A9AA5]">
                                Bookings, SEO, and customer relationships, all handled by one platform built for tradespeople.
                            </p>
                        </div>

                        <p className="font-['Space_Grotesk'] text-sm text-[#5A5A66]">© {new Date().getFullYear()} Nucleus.io</p>
                    </div>
                </div>

                {/* Right form panel */}
                <div className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2">
                    <div className="w-full max-w-md">
                        <div className="mb-10 lg:hidden">
                            <Link href="/" className="font-['Bruno_Ace_SC'] text-lg tracking-wide text-white">
                               NUCLEUS
                            </Link>
                        </div>

                        <div className="rounded-[20px] border border-[#26262F] bg-[#15151C] p-8 sm:p-10">
                            <h2 className="mb-2 font-['Bruno_Ace_SC'] text-2xl text-white">Welcome back</h2>
                            <p className="mb-8 font-['Space_Grotesk'] text-sm text-[#9A9AA5]">Log in to manage your business.</p>

                            {(errors as Record<string, string>).auth && (
                                <div className="mb-6 rounded-[12px] border border-[#FF4D6D]/30 bg-[#FF4D6D]/10 px-4 py-3">
                                    <p className="font-['Space_Grotesk'] text-sm text-[#FF8FA3]">{(errors as Record<string, string>).auth}</p>
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="mb-2 block font-['Space_Grotesk'] text-sm text-[#C8C8D0]">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-[12px] border border-[#26262F] bg-[#0B0B0F] px-4 py-3 font-['Space_Grotesk'] text-sm text-white transition-colors outline-none placeholder:text-[#5A5A66] focus:border-[#FF7A45]"
                                        placeholder="you@company.com"
                                    />
                                    {errors.email && <p className="mt-2 font-['Space_Grotesk'] text-xs text-[#FF8FA3]">{errors.email}</p>}
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <label htmlFor="password" className="block font-['Space_Grotesk'] text-sm text-[#C8C8D0]">
                                            Password
                                        </label>
                                        <Link
                                            href="/forgot-password"
                                            className="font-['Space_Grotesk'] text-xs text-[#FF7A45] transition-colors hover:text-[#FF8F5F]"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full rounded-[12px] border border-[#26262F] bg-[#0B0B0F] px-4 py-3 font-['Space_Grotesk'] text-sm text-white transition-colors outline-none placeholder:text-[#5A5A66] focus:border-[#FF7A45]"
                                        placeholder="••••••••"
                                    />
                                    {errors.password && <p className="mt-2 font-['Space_Grotesk'] text-xs text-[#FF8FA3]">{errors.password}</p>}
                                </div>

                                <label className="flex cursor-pointer items-center gap-2 select-none">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="h-4 w-4 rounded-[4px] border border-[#26262F] bg-[#0B0B0F] accent-[#FF7A45]"
                                    />
                                    <span className="font-['Space_Grotesk'] text-sm text-[#9A9AA5]">Remember me</span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-[12px] bg-gradient-to-r from-[#FF7A45] to-[#FF4D6D] px-4 py-3 font-['Space_Grotesk'] text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? 'Logging in...' : 'Log in'}
                                </button>
                            </form>

                            <p className="mt-8 text-center font-['Space_Grotesk'] text-sm text-[#9A9AA5]">
                                Don't have an account?{' '}
                                <Link href="/register" className="text-[#FF7A45] transition-colors hover:text-[#FF8F5F]">
                                    Create one
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
