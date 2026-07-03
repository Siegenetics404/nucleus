import { Link, router, usePage } from '@inertiajs/react';
import { File, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import DeleteProjectDialog from './DeleteProjectDialog';
import NewProjectDialog from './NewProjectDialog';

interface Project {
    id: number;
    name: string;
    slug: string;
}
interface PageProps {
    projects: Project[];
    [key: string]: unknown;
}
export default function ExplorerContent() {
    const { projects } = usePage<PageProps>().props;
    const currentUrl = usePage().url;
    const [newProjectOpen, setNewProjectOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');
    const [deletingProject, setDeletingProject] = useState<Project | null>(null);
    const [deleting, setDeleting] = useState(false);

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

    const startEditing = (project: Project) => {
        setEditingId(project.id);
        setEditValue(project.name);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditValue('');
    };

    const saveEditing = (project: Project) => {
        const trimmed = editValue.trim();

        if (!trimmed || trimmed === project.name) {
            cancelEditing();
            return;
        }

        router.put(
            route('user.dashboard.projects.update', project.id),
            { name: trimmed },
            {
                preserveScroll: true,
                onSuccess: () => cancelEditing(),
                onError: () => cancelEditing(),
            },
        );
    };

    const handleDeleteProject = (project: Project) => {
        setDeleting(true);
        router.delete(route('user.dashboard.projects.destroy', project.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeletingProject(null);
                setDeleting(false);
            },
            onError: () => setDeleting(false),
        });
    };

    return (
        <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-between border-b border-[#1E1E26] px-4">
                <span className="font-['Hanken_Grotesk'] text-xs font-bold tracking-wider text-[#6B6B76] uppercase">Nucleus Explorer</span>
                <button
                    type="button"
                    title="New project"
                    onClick={() => setNewProjectOpen(true)}
                    className="flex h-6 w-6 items-center justify-center rounded-[6px] text-[#6B6B76] transition-colors hover:bg-[#1A1A22] hover:text-white"
                >
                    <Plus size={14} />
                </button>
            </div>
            <div className="themed-scrollbar flex-1 overflow-y-auto p-3">
                {projects.length === 0 ? (
                    <p className="px-1 py-2 font-['Hanken_Grotesk'] text-xs text-[#5A5A66]">No projects yet. Click + to create one.</p>
                ) : (
                    <div className="space-y-1">
                        {projects.map((project) => {
                            const active = currentUrl.startsWith(`/dashboard/${project.slug}`);
                            const isEditing = editingId === project.id;

                            if (isEditing) {
                                return (
                                    <div
                                        key={project.id}
                                        className="relative flex items-center gap-3 overflow-hidden rounded-[10px] bg-[#1A1A22] px-3 py-2 text-sm"
                                    >
                                        <File size={16} className="text-[#FF7A45]" />
                                        <input
                                            autoFocus
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={() => saveEditing(project)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    saveEditing(project);
                                                }
                                                if (e.key === 'Escape') {
                                                    e.preventDefault();
                                                    cancelEditing();
                                                }
                                            }}
                                            className="flex-1 border-b border-[#FF7A45] bg-transparent font-['Zilla_Slab'] font-medium text-white outline-none"
                                        />
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={project.id}
                                    href={route('user.dashboard.project', project.slug)}
                                    className={`group relative flex items-center gap-3 overflow-hidden rounded-[10px] px-3 py-2 text-sm transition-colors ${
                                        active
                                            ? 'bg-gradient-to-r from-[#FF7A45]/15 to-[#FF4D6D]/15 text-white'
                                            : 'text-[#9A9AA5] hover:bg-[#1A1A22] hover:text-white'
                                    }`}
                                >
                                    {active && (
                                        <span className="absolute inset-y-0 left-0 w-[3px] rounded-l-[10px] bg-gradient-to-b from-[#FF7A45] to-[#FF4D6D]" />
                                    )}
                                    <File size={16} className={active ? 'text-[#FF7A45]' : ''} />
                                    <span className="flex-1 truncate font-['Zilla_Slab'] font-medium">{project.name}</span>

                                    <span className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                        <button
                                            type="button"
                                            title="Edit project"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                startEditing(project);
                                            }}
                                            className={`flex h-6 w-6 items-center justify-center rounded-[6px] transition-colors ${
                                                active
                                                    ? 'text-white/70 hover:bg-white/15 hover:text-white'
                                                    : 'text-[#6B6B76] hover:bg-[#26262F] hover:text-white'
                                            }`}
                                        >
                                            <Pencil size={13} />
                                        </button>
                                        <button
                                            type="button"
                                            title="Delete project"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setDeletingProject(project);
                                            }}
                                            className={`flex h-6 w-6 items-center justify-center rounded-[6px] transition-colors ${
                                                active
                                                    ? 'text-white/70 hover:bg-white/15 hover:text-[#FF4D6D]'
                                                    : 'text-[#6B6B76] hover:bg-[#26262F] hover:text-[#FF4D6D]'
                                            }`}
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
            <NewProjectDialog open={newProjectOpen} onOpenChange={setNewProjectOpen} onCreate={handleCreateProject} />
            <DeleteProjectDialog
                project={deletingProject}
                open={deletingProject !== null}
                onOpenChange={(open) => !open && setDeletingProject(null)}
                onConfirm={handleDeleteProject}
                submitting={deleting}
            />
        </div>
    );
}
