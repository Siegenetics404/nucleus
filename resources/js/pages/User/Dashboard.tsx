import ApiComponent from '@/components/ApiComponent';
import NewProjectDialog from '@/components/NewProjectDialog';
import WebhookComponent from '@/components/WebhookComponent';
import UserLayout from '@/layouts/user-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Braces, File, Plus, Webhook, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Project {
    id: number;
    name: string;
    slug: string;
}

interface DashboardProps {
    activeProject?: Project;
}

interface PageProps {
    projects: Project[];
    [key: string]: unknown;
}

type SidebarTab = 'api' | 'webhook' | null;

function UserDashboard({ activeProject }: DashboardProps) {
    const { projects } = usePage<PageProps>().props;
    const [newProjectOpen, setNewProjectOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarTab, setSidebarTab] = useState<SidebarTab>(null);
    const railRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const handleCreateProject = (name: string) => {
        router.post(
            route('user.dashboard.projects.store'),
            { name },
            {
                preserveScroll: true,
                onSuccess: () => setNewProjectOpen(false),
            },
        );
    };

    const openSidebar = (tab: SidebarTab) => {
        if (sidebarOpen && sidebarTab === tab) {
            setSidebarOpen(false);
            return;
        }
        setSidebarTab(tab);
        setSidebarOpen(true);
    };

    useEffect(() => {
        if (!sidebarOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (panelRef.current?.contains(target)) return;
            if (railRef.current?.contains(target)) return;
            setSidebarOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [sidebarOpen]);

    return (
        <>
            <Head title={activeProject ? activeProject.name : 'Dashboard'}>
                <meta name="description" content={activeProject ? `Workspace for ${activeProject.name}.` : 'Your Nucleus dashboard overview.'} />
            </Head>
            <main className="relative flex-1 overflow-y-auto bg-[#0B0B0F] p-4 md:p-6">
                {/* Floating icon rail, top-right, vertical */}
                <div ref={railRef} className="absolute top-4 right-4 z-30 flex flex-col items-center gap-2 md:top-6 md:right-6">
                    <button
                        type="button"
                        title="API"
                        onClick={() => openSidebar('api')}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                            sidebarOpen && sidebarTab === 'api'
                                ? 'border-transparent bg-gradient-to-br from-[#FF7A45] to-[#FF4D6D] text-white'
                                : 'border-[#26262F] bg-[#15151C] text-[#9A9AA5] hover:text-white'
                        }`}
                    >
                        <Braces size={16} />
                    </button>
                    <button
                        type="button"
                        title="Webhook"
                        onClick={() => openSidebar('webhook')}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                            sidebarOpen && sidebarTab === 'webhook'
                                ? 'border-transparent bg-gradient-to-br from-[#FF7A45] to-[#FF4D6D] text-white'
                                : 'border-[#26262F] bg-[#15151C] text-[#9A9AA5] hover:text-white'
                        }`}
                    >
                        <Webhook size={16} />
                    </button>
                </div>

                {/* Floating panel — overlaps the icon rail, anchored top-right */}
                <div
                    ref={panelRef}
                    className={`absolute top-4 right-4 z-40 h-[520px] max-h-[calc(100%-2rem)] w-80 overflow-hidden rounded-[16px] border border-[#26262F] bg-[#111116]/80 shadow-2xl backdrop-blur-xl transition-all duration-200 ease-out md:top-6 md:right-6 ${
                        sidebarOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
                    }`}
                >
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="absolute top-4 right-4 z-10 flex h-6 w-6 items-center justify-center rounded-[6px] text-[#6B6B76] transition-colors hover:bg-[#1A1A22] hover:text-white"
                    >
                        <X size={14} />
                    </button>

                    {sidebarTab === 'api' && <ApiComponent />}
                    {sidebarTab === 'webhook' && <WebhookComponent />}
                </div>

                {activeProject ? (
                    <div className="flex h-full flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-['Bruno_Ace_SC'] text-2xl text-white">{activeProject.name}</h1>
                            <p className="font-['Hanken_Grotesk'] text-[#9A9AA5]">This is your new project workspace.</p>
                        </div>

                        <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-[20px] border border-dashed border-[#26262F] bg-[#111116] py-16 text-center">
                            <File size={32} className="text-[#6B6B76]" />
                            <p className="font-['Hanken_Grotesk'] text-sm text-[#6B6B76]">Nothing here yet. This project is ready to be built out.</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-10 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <img src="/images/logo/nucleus-logo.svg" alt="Nucleus" className="h-14 w-14 opacity-90" />
                            <div className="flex flex-col gap-2">
                                <h1 className="font-['Bruno_Ace_SC'] text-2xl text-white">Welcome to Nucleus</h1>
                                <p className="max-w-sm font-['Hanken_Grotesk'] text-sm text-[#9A9AA5]">
                                    Select a project from the Explorer panel, or create a new one below.
                                </p>
                            </div>
                        </div>

                        {projects.length > 0 && (
                            <div className="w-full max-w-sm rounded-[20px] border border-[#1E1E26] bg-[#111116] p-3 text-left">
                                <div className="mb-2 flex items-center justify-between px-1">
                                    <p className="font-['Hanken_Grotesk'] text-xs font-medium tracking-wider text-[#6B6B76] uppercase">
                                        Recent projects
                                    </p>
                                    <button
                                        type="button"
                                        title="New project"
                                        onClick={() => setNewProjectOpen(true)}
                                        className="flex h-6 w-6 items-center justify-center rounded-[6px] text-[#6B6B76] transition-colors hover:bg-[#1A1A22] hover:text-white"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <div className="space-y-1">
                                    {projects.slice(0, 5).map((project) => (
                                        <Link
                                            key={project.id}
                                            href={route('user.dashboard.project', project.slug)}
                                            className="flex items-center gap-3 rounded-[10px] px-3 py-2 font-['Hanken_Grotesk'] text-sm text-[#9A9AA5] transition-colors hover:bg-[#1A1A22] hover:text-white"
                                        >
                                            <File size={16} className="text-[#FF7A45]" />
                                            {project.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>

            <NewProjectDialog open={newProjectOpen} onOpenChange={setNewProjectOpen} onCreate={handleCreateProject} />
        </>
    );
}

UserDashboard.layout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>;

export default UserDashboard;
