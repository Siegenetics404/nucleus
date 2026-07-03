import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePage } from '@inertiajs/react';
import { FormEventHandler, useMemo, useState } from 'react';

interface Project {
    id: number;
    name: string;
    slug: string;
}
interface PageProps {
    projects: Project[];
    [key: string]: unknown;
}

interface NewProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreate: (name: string) => void;
}

function getAvailableName(desired: string, existingNames: string[]): string {
    const taken = new Set(existingNames.map((n) => n.toLowerCase()));
    if (!taken.has(desired.toLowerCase())) return desired;

    let i = 1;
    while (taken.has(`${desired} (${i})`.toLowerCase())) {
        i++;
    }
    return `${desired} (${i})`;
}

export default function NewProjectDialog({ open, onOpenChange, onCreate }: NewProjectDialogProps) {
    const { projects } = usePage<PageProps>().props;
    const [name, setName] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const trimmed = name.trim();
    const isDuplicate = useMemo(() => trimmed !== '' && projects.some((p) => p.name.toLowerCase() === trimmed.toLowerCase()), [trimmed, projects]);
    const suggestedName = useMemo(
        () =>
            isDuplicate
                ? getAvailableName(
                      trimmed,
                      projects.map((p) => p.name),
                  )
                : trimmed,
        [isDuplicate, trimmed, projects],
    );

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!trimmed || submitting) return;

        setSubmitting(true);
        onCreate(isDuplicate ? suggestedName : trimmed);
        setName('');
        setSubmitting(false);
    };

    const handleOpenChange = (next: boolean) => {
        if (!next) setName('');
        onOpenChange(next);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-['Zilla_Slab']">New project</DialogTitle>
                    <DialogDescription className="font-['Hanken_Grotesk']">Give your project a name to get started.</DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="project-name" className="mb-2 block font-['Hanken_Grotesk'] text-sm text-[#C8C8D0]">
                            Project name
                        </Label>
                        <Input
                            id="project-name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="My nucleus project"
                            className="border-[#26262F] bg-[#0B0B0F] font-['Zilla_Slab'] font-medium text-white placeholder:font-['Hanken_Grotesk'] placeholder:font-normal placeholder:text-[#5A5A66] focus-visible:border-[#FF7A45] focus-visible:ring-[#FF7A45]/40"
                        />
                        {isDuplicate && (
                            <p className="font-['Hanken_Grotesk'] text-xs text-[#F5A623]">
                                A project named "{trimmed}" already exists — this will be created as "{suggestedName}".
                            </p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => handleOpenChange(false)}
                            className="font-['Hanken_Grotesk'] text-[#9A9AA5] hover:bg-[#1A1A22] hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={!trimmed || submitting}
                            className="border-0 bg-gradient-to-r from-[#FF7A45] to-[#FF4D6D] font-['Hanken_Grotesk'] text-white hover:opacity-90"
                        >
                            Create project
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
