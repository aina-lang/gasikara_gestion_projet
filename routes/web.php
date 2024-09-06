<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DolibarrRedirectController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\DolibarrAuthMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
});

// Route::post('/dolibarr/redirect', [DolibarrRedirectController::class, 'handleRedirect']);


Route::middleware([DolibarrAuthMiddleware::class])->group(function () {

    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name("home");

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name("login.get");
    Route::post('/login', [LoginController::class, 'login'])->name("login");
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
    Route::get('/register', [LoginController::class, 'login'])->name("register");

    Route::get('/projects/', function () {
        return Inertia::render('Project/index');
    });
    Route::get('/projects/add', function () {
        return Inertia::render('Project/add');
    });
});
