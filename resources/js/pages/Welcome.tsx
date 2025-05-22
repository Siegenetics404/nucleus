import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="JB Marketing - Digital Marketing Solutions">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section
                    className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center bg-no-repeat py-20 lg:py-32"
                    style={{ backgroundImage: 'url(/hero.jpg)' }}
                >
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-4xl text-center">
                            <div className="space-y-8">
                                <div className="space-y-6">
                                    <h1 className="text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-7xl">
                                        Drive Growth with
                                        <span className="block text-yellow-400">JB Marketing</span>
                                    </h1>
                                    <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/90 lg:text-2xl">
                                        Founded by Charles Rymer, we deliver data-driven digital marketing solutions that generate real results for
                                        your business.
                                    </p>
                                </div>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <Button size="lg" className="bg-yellow-400 px-8 py-3 text-lg font-semibold text-purple-900 hover:bg-yellow-500">
                                        Get Started Today
                                    </Button>
                                    <Button variant="outline" size="lg" className="text-purple border-white/30 px-8 py-3 text-lg hover:bg-white/10">
                                        View Our Work
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20 lg:py-32">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <h2 className="mb-6 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">Our Services</h2>
                            <p className="mx-auto max-w-3xl text-xl text-slate-600">
                                We specialize in comprehensive digital marketing strategies that deliver measurable results and sustainable growth.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                            {/* Meta Ads */}
                            <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                                <CardContent className="p-8">
                                    <div className="mb-4 text-4xl">📣</div>
                                    <h3 className="mb-4 text-2xl font-bold text-slate-900">Meta Ads (Facebook & Instagram)</h3>
                                    <p className="mb-6 text-slate-600">
                                        We launch 20+ campaigns to rapidly test and uncover the most profitable messages for your business.
                                    </p>
                                    <ul className="space-y-3 text-slate-700">
                                        <li className="flex items-start">
                                            <span className="mr-3 text-blue-600">✅</span>
                                            Cold, warm, and retargeting campaigns
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-3 text-blue-600">✅</span>
                                            Reach users across Facebook, Instagram, Stories, Feed, and Marketplace
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-3 text-blue-600">✅</span>
                                            <strong>Minimum target: 33% lower Cost Per Lead</strong> than industry average
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Google Ads */}
                            <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                                <CardContent className="p-8">
                                    <div className="mb-4 text-4xl">🔍</div>
                                    <h3 className="mb-4 text-2xl font-bold text-slate-900">Google Ads</h3>
                                    <p className="mb-6 text-slate-600">Put your business at the top of Google with highly targeted search ads.</p>
                                    <ul className="space-y-3 text-slate-700">
                                        <li className="flex items-start">
                                            <span className="mr-3 text-blue-600">✅</span>
                                            We identify the most profitable keywords
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-3 text-blue-600">✅</span>
                                            Drive traffic to your website, landing page, Google Maps, or YouTube
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-3 text-blue-600">✅</span>
                                            Appear across Google search, blogs, third-party sites, and YouTube
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* SEO */}
                            <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                                <CardContent className="p-8">
                                    <div className="mb-4 text-4xl">🧠</div>
                                    <h3 className="mb-4 text-2xl font-bold text-slate-900">Search Engine Optimization (SEO)</h3>
                                    <p className="mb-6 text-slate-600">The best long-term investment for local businesses.</p>
                                    <ul className="space-y-3 text-slate-700">
                                        <li className="flex items-start">
                                            <span className="mr-3 text-blue-600">✅</span>
                                            On-page SEO, backlinking, blog content, and more
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-3 text-blue-600">✅</span>
                                            Rank high (or top) for your most important keywords
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-3 text-blue-600">✅</span>
                                            Attract organic traffic and reduce reliance on paid ads
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Website Development */}
                            <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                                <CardContent className="p-8">
                                    <div className="mb-4 text-4xl">🌐</div>
                                    <h3 className="mb-4 text-2xl font-bold text-slate-900">Website Development & Optimization</h3>
                                    <p className="mb-6 text-slate-600">We build, host, and maintain high-performing websites designed to convert.</p>
                                    <ul className="space-y-3 text-slate-700">
                                        <li className="flex items-start">
                                            <span className="mr-3 text-blue-600">✅</span>
                                            Custom website design and development
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-3 text-blue-600">✅</span>
                                            Mobile-responsive and fast-loading sites
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-3 text-blue-600">✅</span>
                                            Ongoing maintenance and optimization
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mt-16 text-center">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-4 text-lg text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                            >
                                Start Your Growth Journey
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 py-16 text-white">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-600/20"></div>
                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold">JB Marketing</h3>
                                <p className="text-lg leading-relaxed text-blue-100">
                                    Founded by Charles Rymer, we're dedicated to helping businesses achieve sustainable growth through strategic
                                    digital marketing.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <h4 className="text-xl font-semibold">Our Services</h4>
                                <ul className="space-y-3 text-blue-100">
                                    <li className="cursor-pointer transition-colors hover:text-yellow-400">Meta Ads (Facebook & Instagram)</li>
                                    <li className="cursor-pointer transition-colors hover:text-yellow-400">Google Ads Management</li>
                                    <li className="cursor-pointer transition-colors hover:text-yellow-400">Search Engine Optimization</li>
                                    <li className="cursor-pointer transition-colors hover:text-yellow-400">Website Development</li>
                                </ul>
                            </div>

                            <div className="space-y-6">
                                <h4 className="text-xl font-semibold">Get Started</h4>
                                <p className="text-blue-100">
                                    Ready to accelerate your business growth? Let's discuss how we can help you achieve your marketing goals.
                                </p>
                                <Button className="bg-yellow-400 font-semibold text-purple-900 transition-all duration-300 hover:bg-yellow-500 hover:shadow-lg">
                                    Contact Us Today
                                </Button>
                            </div>
                        </div>

                        <div className="mt-12 border-t border-blue-400/30 pt-8 text-center">
                            <p className="text-blue-200">© 2025 JB Marketing. All rights reserved. Founded by Charles Rymer.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
