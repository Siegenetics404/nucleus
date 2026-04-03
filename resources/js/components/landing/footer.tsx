import { Link } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-[#E2E8F0] bg-[#F8FAFC]">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6">
                {/* Logo */}
                <Link href={route('home')} className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#3B82F6]">
                        <GraduationCap size={14} className="text-white" />
                    </div>
                    <span className="font-display text-sm font-bold text-[#1E293B]">
                        Chess<span className="text-[#3B82F6]">uno</span>
                    </span>
                </Link>

                {/* Copyright */}
                <p className="font-body text-xs text-slate-400">© {new Date().getFullYear()} ChessUno. All rights reserved.</p>

                {/* Links */}
                <div className="flex items-center gap-5">
                    <a href="mailto:support@chessuno.com" className="font-body text-xs text-slate-500 transition-colors hover:text-[#1E293B]">
                        Contact
                    </a>
                    <a href="#" className="font-body text-xs text-slate-500 transition-colors hover:text-[#1E293B]">
                        Terms
                    </a>
                    <a href="#" className="font-body text-xs text-slate-500 transition-colors hover:text-[#1E293B]">
                        Privacy
                    </a>
                </div>
            </div>
        </footer>
    );
}
