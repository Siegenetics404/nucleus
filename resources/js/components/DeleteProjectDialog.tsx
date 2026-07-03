import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler, useEffect, useState } from 'react';

interface Project {
    id: number;
    name: string;
    slug: string;
}

interface DeleteProjectDialogProps {
    project: Project | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (project: Project) => void;
    submitting?: boolean;
}

export default function DeleteProjectDialog({ project, open, onOpenChange, onConfirm, submitting = false }: DeleteProjectDialogProps) {
    const [confirmValue, setConfirmValue] = useState('');

    useEffect(() => {
        if (!open) setConfirmValue('');
    }, [open]);

    if (!project) return null;

    const isMatch = confirmValue === project.name;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!isMatch || submitting) return;
        onConfirm(project);
    };

    const handleOpenChange = (next: boolean) => {
        if (!next) setConfirmValue('');
        onOpenChange(next);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-['Zilla_Slab'] text-[#FF4D6D]">Delete project</DialogTitle>
                    <DialogDescription className="font-['Hanken_Grotesk']">
                        This will permanently delete <span className="font-semibold text-white">{project.name}</span>. This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="confirm-name" className="mb-2 block font-['Hanken_Grotesk'] text-sm text-[#C8C8D0]">
                            Type <span className="font-['Zilla_Slab'] font-medium text-white">{project.name}</span> to confirm.
                        </Label>
                        <Input
                            id="confirm-name"
                            autoFocus
                            autoComplete="off"
                            value={confirmValue}
                            onChange={(e) => setConfirmValue(e.target.value)}
                            placeholder={project.name}
                            className="border-[#26262F] bg-[#0B0B0F] font-['Hanken_Grotesk'] text-white placeholder:text-[#5A5A66] focus-visible:border-[#FF4D6D] focus-visible:ring-[#FF4D6D]/40"
                        />
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
                            disabled={!isMatch || submitting}
                            className="border-0 bg-[#FF4D6D] font-['Hanken_Grotesk'] text-white hover:bg-[#FF4D6D]/90 disabled:opacity-40"
                        >
                            Delete project
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
