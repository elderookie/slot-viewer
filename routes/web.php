<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function () {
    return view('calendar');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/calendar', [ScheduleController::class, 'index']);
Route::get('/getSchedule', [ScheduleController::class, 'getSchedule']);
Route::get('/reservation', [ReservationController::class, 'store']);
// Route::get('/reservation/{id}', [ReservationController::class, 'show']);
// Route::get('/reservation/{id}/edit', [ReservationController::class, 'edit']);
// Route::patch('/reservation/{id}', [ReservationController::class, 'update']);
// Route::delete('/reservation/{id}', [ReservationController::class, 'destroy']);

Route::post('/reservation', 'ReservationController@store');

require __DIR__.'/auth.php';
