import UserLayout from '@/layouts/user-layout';
import { Head } from '@inertiajs/react';
import { File } from 'lucide-react';

interface Project {
    id: number;
    name: string;
    slug: string;
}

interface DashboardProps {
    activeProject?: Project;
}

function UserDashboard({ activeProject }: DashboardProps) {
    return (
        <>
            <Head title={activeProject ? activeProject.name : 'Dashboard'}>
                <meta name="description" content={activeProject ? `Workspace for ${activeProject.name}.` : 'Your Nucleus dashboard overview.'} />
            </Head>
            <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6 dark:bg-gray-900">
                {activeProject ? (
                    <div className="flex h-full flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-['Zilla_Slab'] text-2xl font-bold text-gray-900 dark:text-gray-100">{activeProject.name}</h1>
                            <p className="font-['Hanken_Grotesk'] text-gray-500 dark:text-gray-400">This is your new project workspace.</p>
                        </div>

                        <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
                            <File size={32} className="text-gray-400 dark:text-gray-600" />
                            <p className="font-['Hanken_Grotesk'] text-sm text-gray-500 dark:text-gray-400">
                                Nothing here yet — this project is ready to be built out.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-['Zilla_Slab'] text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard Overview</h1>
                            <p className="font-['Hanken_Grotesk'] text-gray-500 dark:text-gray-400">
                                Here's what's happening with your business today.
                            </p>
                        </div>

                        {/* put here your logic */}
                    </div>
                )}
            </main>
        </>
    );
}

UserDashboard.layout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>;

export default UserDashboard;
