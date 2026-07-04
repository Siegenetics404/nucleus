import NewProjectDialog from '@/components/NewProjectDialog';
import UserLayout from '@/layouts/user-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { File, Folder, Plus } from 'lucide-react';
import { useState } from 'react';

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

function UserDashboard({ activeProject }: DashboardProps) {
    const { projects } = usePage<PageProps>().props;
    const [newProjectOpen, setNewProjectOpen] = useState(false);

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

    return (
        <>
            <Head title={activeProject ? activeProject.name : 'Dashboard'}>
                <meta name="description" content={activeProject ? `Workspace for ${activeProject.name}.` : 'Your Nucleus dashboard overview.'} />
            </Head>
            <main className="flex-1 overflow-y-auto bg-[#0B0B0F] p-4 md:p-6">
                {activeProject ? (
                    <div className="flex h-full flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-['Bruno_Ace_SC'] text-2xl text-white">{activeProject.name}</h1>
                            <p className="font-['Space_Grotesk'] text-[#9A9AA5]">This is your new project workspace.</p>
                        </div>

                        <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-[20px] border border-dashed border-[#26262F] bg-[#111116] py-16 text-center">
                            <File size={32} className="text-[#6B6B76]" />
                            <p className="font-['Space_Grotesk'] text-sm text-[#6B6B76]">Nothing here yet. This project is ready to be built out.</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-10 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <img src="/images/logo/nucleus-logo.svg" alt="Nucleus" className="h-14 w-14 opacity-90" />
                            <div className="flex flex-col gap-2">
                                <h1 className="font-['Bruno_Ace_SC'] text-2xl text-white">Welcome to Nucleus</h1>
                                <p className="max-w-sm font-['Space_Grotesk'] text-sm text-[#9A9AA5]">
                                    Select a project from the Explorer panel, or create a new one below.
                                </p>
                            </div>
                        </div>

                        {projects.length > 0 && (
                            <div className="w-full max-w-sm rounded-[20px] border border-[#1E1E26] bg-[#111116] p-3 text-left">
                                <div className="mb-2 flex items-center justify-between px-1">
                                    <p className="font-['Space_Grotesk'] text-xs font-medium tracking-wider text-[#6B6B76] uppercase">
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
                                            className="flex items-center gap-3 rounded-[10px] px-3 py-2 font-['Space_Grotesk'] text-sm text-[#9A9AA5] transition-colors hover:bg-[#1A1A22] hover:text-white"
                                        >
                                            <Folder size={16} className="text-[#FF7A45]" />
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
