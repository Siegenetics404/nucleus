<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $project = $request->user()->projects()->create($validated);

        return redirect()->route('user.dashboard.project', $project);
    }

    public function show(Project $project): Response
    {
        abort_unless($project->user_id === auth()->id(), 403);

        return Inertia::render('User/Dashboard', [
            'activeProject' => $project,
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        abort_unless($project->user_id === auth()->id(), 403);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $project->update($validated);

        return back();
    }

    public function destroy(Project $project): RedirectResponse
    {
        abort_unless($project->user_id === auth()->id(), 403);

        $wasActive = request()->headers->get('referer', '');
        $slug = $project->slug;

        $project->delete();

        // If the user was viewing this exact project when deleting it,
        // send them back to the plain dashboard instead of a dead link.
        if (str_contains($wasActive, "/dashboard/{$slug}")) {
            return redirect()->route('user.dashboard');
        }

        return back();
    }
}
