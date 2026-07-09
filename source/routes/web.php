<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TaskController;


//Route::inertia('/', 'welcome')->name('home');

Route::get('/', [TaskController::class, 'index'])->name('home');
Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.add');
Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.delete');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';