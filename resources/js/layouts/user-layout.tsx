import ExplorerContent from '@/components/ExplorerContent';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight, Folder, type LucideIcon, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

interface User {
    name: string;
    email: string;
}
interface Project {
    id: number;
    name: string;
    slug: string;
}

interface PageProps {
    auth: { user: User };
    activeProject?: Project;
    [key: string]: unknown;
}
interface UserLayoutProps {
    children: React.ReactNode;
}
interface NavItem {
    key: string;
    label: string;
    icon: LucideIcon;
    href: string | null;
    matchPath?: string;
}

const NAV_ITEMS: NavItem[] = [{ key: 'explorer', label: 'Explorer', icon: Folder, href: 'user.dashboard', matchPath: '/dashboard' }];

export default function UserLayout({ children }: UserLayoutProps) {
    const { url, props } = usePage<PageProps>();
    const user = props.auth.user;
    const activeProject = props.activeProject;
    const [panelOpen, setPanelOpen] = useState(false);
    const [activeKey, setActiveKey] = useState('explorer');

    useEffect(() => {
        const matched = NAV_ITEMS.find((item) => item.href && url.startsWith(item.matchPath ?? '/' + item.key));
        if (matched) {
            setActiveKey(matched.key);
        }
    }, [url]);

    const handleIconClick = (item: NavItem, e?: React.MouseEvent) => {
        const isCurrent = activeKey === item.key;
        if (isCurrent) {
            e?.preventDefault();
            setPanelOpen((prev) => !prev);
            return;
        }
        setActiveKey(item.key);
        setPanelOpen(true);
    };

    return (
        <div className="flex h-screen bg-[#0B0B0F]">
            {/* Shared gradient definition, referenced via url(#nucleus-icon-gradient) anywhere in the app */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <linearGradient id="nucleus-icon-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF7A45" />
                        <stop offset="100%" stopColor="#FF4D6D" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Activity rail */}
            <div className="hidden w-16 flex-col items-center border-r border-[#1E1E26] bg-[#0B0B0F] py-4 md:flex">
                <Link href="/" className="mb-6 flex h-9 w-9 items-center justify-center">
                    <img src="/images/logo/nucleus-logo.svg" alt="Nucleus" className="h-8 w-8" />
                </Link>
                <nav className="flex flex-1 flex-col items-center gap-2">
                    {NAV_ITEMS.map((item) => {
                        const active = activeKey === item.key;
                        const Icon = item.icon;
                        const iconVisual = (
                            <span className="relative flex h-10 w-10 items-center justify-center rounded-[12px]">
                                {active && (
                                    <span className="absolute left-[-16px] h-6 w-[3px] rounded-full bg-gradient-to-b from-[#FF7A45] to-[#FF4D6D]" />
                                )}
                                <span
                                    className={`flex h-10 w-10 items-center justify-center rounded-[12px] transition-colors ${
                                        active
                                            ? 'bg-gradient-to-br from-[#FF7A45]/20 to-[#FF4D6D]/20'
                                            : 'text-[#6B6B76] hover:bg-[#1A1A22] hover:text-[#C8C8D0]'
                                    }`}
                                >
                                    <Icon size={18} color={active ? 'url(#nucleus-icon-gradient)' : undefined} />
                                </span>
                            </span>
                        );
                        return item.href ? (
                            <Link key={item.key} href={route(item.href)} onClick={(e) => handleIconClick(item, e)} title={item.label}>
                                {iconVisual}
                            </Link>
                        ) : (
                            <button key={item.key} type="button" onClick={(e) => handleIconClick(item, e)} title={item.label}>
                                {iconVisual}
                            </button>
                        );
                    })}
                </nav>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button type="button" className="mt-2">
                            <Avatar className="h-9 w-9 cursor-pointer">
                                <AvatarImage src="/api/placeholder/32/32" alt={user.name} />
                                <AvatarFallback className="bg-[#1A1A22] text-xs text-[#C8C8D0]">
                                    {user.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" side="right" className="w-56 border-[#26262F] bg-[#15151C]">
                        <DropdownMenuLabel className="font-['Space_Grotesk']">
                            <div className="flex flex-col">
                                <span className="text-sm text-white">{user.name}</span>
                                <span className="text-xs text-[#6B6B76]">{user.email}</span>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-[#26262F]" />
                        <DropdownMenuItem asChild className="font-['Space_Grotesk'] text-[#C8C8D0] focus:bg-[#1A1A22] focus:text-white">
                            <Link href={route('user.settings')} className="flex w-full cursor-pointer items-center gap-2">
                                <Settings size={16} />
                                Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-[#26262F]" />
                        <DropdownMenuItem asChild className="font-['Space_Grotesk'] text-[#C8C8D0] focus:bg-[#1A1A22] focus:text-white">
                            <Link href={route('auth.logout')} className="flex w-full cursor-pointer">
                                Logout
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Collapsible panel */}
            <div
                className={`hidden overflow-hidden border-r border-[#1E1E26] bg-[#111116] transition-all duration-300 ease-in-out md:block ${
                    panelOpen ? 'w-60 opacity-100' : 'w-0 opacity-0'
                }`}
            >
                <div className="h-full w-60">{activeKey === 'explorer' && <ExplorerContent />}</div>
            </div>

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-16 items-center justify-between border-b border-[#1E1E26] bg-[#0B0B0F] px-4 md:px-6">
                    <div className="flex items-center gap-1.5 text-sm">
                        <Link
                            href={route('user.dashboard')}
                            className="flex items-center gap-1.5 font-['Hanken_Grotesk'] font-medium text-[#9A9AA5] transition-colors hover:text-white"
                        >
                            <Folder size={14} />
                            Explorer
                        </Link>
                        {activeProject && (
                            <>
                                <ChevronRight size={14} className="text-[#4A4A54]" />
                                <span className="max-w-[200px] truncate font-['Zilla_Slab'] font-medium text-white">{activeProject.name}</span>
                            </>
                        )}
                    </div>

                    <span className="font-['Hanken_Grotesk'] text-sm text-[#C8C8D0] md:hidden">{user.name}</span>
                    <div className="flex items-center gap-3 md:hidden">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/api/placeholder/32/32" alt={user.name} />
                            <AvatarFallback className="bg-[#1A1A22] text-xs text-[#C8C8D0]">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                </header>
                <div className="flex-1 overflow-auto bg-[#0B0B0F]">{children}</div>
            </div>
        </div>
    );
}
