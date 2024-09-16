<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DolibarrRedirectController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ConferenceController;
use App\Http\Middleware\DolibarrAuthMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route pour obtenir le token CSRF
Route::get('/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
});

// Routes protégées par le middleware DolibarrAuthMiddleware
Route::middleware([DolibarrAuthMiddleware::class])->group(function () {

    // Accueil
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name("home");

    // Profil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

    // Authentification
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name("login.get");
    Route::post('/login', [LoginController::class, 'login'])->name("login");
    Route::get('/register', [LoginController::class, 'showRegisterForm'])->name("register.get");
    Route::post('/register', [LoginController::class, 'register'])->name("register");

    // Gestion des projets
    Route::prefix('projects')->group(function () {
     
        Route::get('/', [ProjectController::class, 'index'])->name('projects.index');
        Route::get('/add', [ProjectController::class, 'create'])->name('projects.add');
        Route::post('/add', [ProjectController::class, 'store'])->name('projects.store');
        Route::get('/edit/{id}', [ProjectController::class, 'edit'])->name('projects.edit');
        Route::put('/edit/{id}', [ProjectController::class, 'update'])->name('projects.update');
        Route::get('/show/{id}', [ProjectController::class, 'show'])->name('projects.show');
        Route::delete('/delete/{id}', [ProjectController::class, 'destroy'])->name('projects.delete');
    });

    // Gestion des catégories
    Route::prefix('categories')->group(function () {
        Route::get('/', [CategoryController::class, 'index'])->name('categories.index');
        Route::get('/add', [CategoryController::class, 'create'])->name('categories.add');
        Route::post('/add', [CategoryController::class, 'store'])->name('categories.store');
        Route::get('/edit/{id}', [CategoryController::class, 'edit'])->name('categories.edit');
        Route::put('/edit/{id}', [CategoryController::class, 'update'])->name('categories.update');
        Route::get('/show/{id}', [CategoryController::class, 'show'])->name('categories.show');
        Route::delete('/delete/{id}', [CategoryController::class, 'destroy'])->name('categories.delete');
    });

    // Gestion des tâches
    Route::prefix('tasks')->group(function () {
        Route::get('/', [TaskController::class, 'index'])->name('tasks.index');
        Route::get('/add', [TaskController::class, 'create'])->name('tasks.add');
        Route::post('/add', [TaskController::class, 'store'])->name('tasks.store');
        Route::get('/edit/{id}', [TaskController::class, 'edit'])->name('tasks.edit');
        Route::put('/edit/{id}', [TaskController::class, 'update'])->name('tasks.update');
        Route::get('/show/{id}', [TaskController::class, 'show'])->name('tasks.show');
        Route::delete('/delete/{id}', [TaskController::class, 'destroy'])->name('tasks.delete');
    });

    // Gestion des événements
    Route::prefix('events')->group(function () {
        Route::get('/', [EventController::class, 'index'])->name('events.index');
        Route::get('/add', [EventController::class, 'create'])->name('events.add');
        Route::post('/add', [EventController::class, 'store'])->name('events.store');
        Route::get('/edit/{id}', [EventController::class, 'edit'])->name('events.edit');
        Route::put('/edit/{id}', [EventController::class, 'update'])->name('events.update');
        Route::get('/show/{id}', [EventController::class, 'show'])->name('events.show');
        Route::delete('/delete/{id}', [EventController::class, 'destroy'])->name('events.delete');
    });

    // Gestion des conférences
    Route::prefix('conferences')->group(function () {
        Route::get('/', [ConferenceController::class, 'index'])->name('conferences.index');
        Route::get('/add', [ConferenceController::class, 'create'])->name('conferences.add');
        Route::post('/add', [ConferenceController::class, 'store'])->name('conferences.store');
        Route::get('/edit/{id}', [ConferenceController::class, 'edit'])->name('conferences.edit');
        Route::put('/edit/{id}', [ConferenceController::class, 'update'])->name('conferences.update');
        Route::get('/show/{id}', [ConferenceController::class, 'show'])->name('conferences.show');
        Route::delete('/delete/{id}', [ConferenceController::class, 'destroy'])->name('conferences.delete');
    });
});
