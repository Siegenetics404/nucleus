import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Create account" />

            <div className="flex min-h-screen bg-[#0B0B0F]">
                {/* Left brand panel */}
                <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#1A1A22] to-[#0B0B0F] lg:flex lg:w-1/2">
                    <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#FF7A45] to-[#FF4D6D] opacity-20 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-gradient-to-tr from-[#FF4D6D] to-[#FF7A45] opacity-10 blur-3xl" />

                    <div className="relative z-10 flex w-full flex-col justify-between p-16">
                        <Link href="/" className="font-['Bruno_Ace_SC'] text-xl tracking-wide text-white">
                            NUCLEUS
                        </Link>

                        <div>
                            <h1 className="mb-6 font-['Bruno_Ace_SC'] text-4xl leading-tight text-white">
                                Set up in minutes.
                                <br />
                                Grow for years.
                            </h1>
                            <p className="max-w-md font-['Space_Grotesk'] text-base text-[#9A9AA5]">
                                Join the trade businesses using Nucleus to win more work and spend less time on admin.
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
                            <h2 className="mb-2 font-['Bruno_Ace_SC'] text-2xl text-white">Create your account</h2>
                            <p className="mb-8 font-['Space_Grotesk'] text-sm text-[#9A9AA5]">Get started with Nucleus in a few seconds.</p>

                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="mb-2 block font-['Space_Grotesk'] text-sm text-[#C8C8D0]">
                                        Full name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        autoComplete="name"
                                        autoFocus
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-[12px] border border-[#26262F] bg-[#0B0B0F] px-4 py-3 font-['Space_Grotesk'] text-sm text-white transition-colors outline-none placeholder:text-[#5A5A66] focus:border-[#FF7A45]"
                                        placeholder="Steve Wallace"
                                    />
                                    {errors.name && <p className="mt-2 font-['Space_Grotesk'] text-xs text-[#FF8FA3]">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="mb-2 block font-['Space_Grotesk'] text-sm text-[#C8C8D0]">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-[12px] border border-[#26262F] bg-[#0B0B0F] px-4 py-3 font-['Space_Grotesk'] text-sm text-white transition-colors outline-none placeholder:text-[#5A5A66] focus:border-[#FF7A45]"
                                        placeholder="you@company.com"
                                    />
                                    {errors.email && <p className="mt-2 font-['Space_Grotesk'] text-xs text-[#FF8FA3]">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="password" className="mb-2 block font-['Space_Grotesk'] text-sm text-[#C8C8D0]">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full rounded-[12px] border border-[#26262F] bg-[#0B0B0F] px-4 py-3 font-['Space_Grotesk'] text-sm text-white transition-colors outline-none placeholder:text-[#5A5A66] focus:border-[#FF7A45]"
                                        placeholder="At least 6 characters"
                                    />
                                    {errors.password && <p className="mt-2 font-['Space_Grotesk'] text-xs text-[#FF8FA3]">{errors.password}</p>}
                                </div>

                                <div>
                                    <label htmlFor="password_confirmation" className="mb-2 block font-['Space_Grotesk'] text-sm text-[#C8C8D0]">
                                        Confirm password
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="w-full rounded-[12px] border border-[#26262F] bg-[#0B0B0F] px-4 py-3 font-['Space_Grotesk'] text-sm text-white transition-colors outline-none placeholder:text-[#5A5A66] focus:border-[#FF7A45]"
                                        placeholder="Repeat your password"
                                    />
                                    {errors.password_confirmation && (
                                        <p className="mt-2 font-['Space_Grotesk'] text-xs text-[#FF8FA3]">{errors.password_confirmation}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-[12px] bg-gradient-to-r from-[#FF7A45] to-[#FF4D6D] px-4 py-3 font-['Space_Grotesk'] text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? 'Creating account...' : 'Create account'}
                                </button>
                            </form>

                            <p className="mt-8 text-center font-['Space_Grotesk'] text-sm text-[#9A9AA5]">
                                Already have an account?{' '}
                                <Link href="/login" className="text-[#FF7A45] transition-colors hover:text-[#FF8F5F]">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
