<?php

namespace App\Http\Controllers;

use App\Enums\StatusEnum;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function index()
    {
        return Inertia::render('home', [
            'tasks' => DB::table('tasks')->paginate(15)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Task::create([
            ...$validated,
            'status' => StatusEnum::ToDo,
        ]);

        return back()->with('success', 'Dodano zadanie');
    }

    public function update(Request $request, Task $task): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes',
            'status' => ['sometimes','required', Rule::enum(StatusEnum::class)],
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

    public function destroy(Task $task)
    {
        $task->delete();
        return back()->with('success', 'Zadanie usunięte');
    }
}