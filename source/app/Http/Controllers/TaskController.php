<?php

namespace App\Http\Controllers;

use App\Enums\StatusEnum;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('home', [
            'tasks' => Task::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'status' => ['required', Rule::enum(StatusEnum::class)],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'status' => ['required', Rule::enum(StatusEnum::class)],
        ]);

        //status flow
        if(isset($validated['status'])){
            $newStatus = StatusEnum::from($validated['status']);

            if(!$task->status->canTransitionTo($newStatus)) {
                return back()->withErrors([
                    'status' => "Nie można przejść z {$task->status->label()} do {$newStatus->label()}",
                ]);
            }
        }
        $task->update($validated);
        return back()->with('success', 'Zadanie zaktualizowane');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
