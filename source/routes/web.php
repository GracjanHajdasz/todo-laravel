<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TaskController;


//Route::inertia('/', 'welcome')->name('home');

Route::get('/', [TaskController::class, 'index'])->name('home');
Route::patch('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';