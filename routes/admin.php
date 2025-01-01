<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Admin\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Admin\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Admin\Auth\NewPasswordController;
use App\Http\Controllers\Admin\Auth\PasswordController;
use App\Http\Controllers\Admin\Auth\PasswordResetLinkController;
use App\Http\Controllers\Admin\Auth\RegisteredUserController;
use App\Http\Controllers\Admin\Auth\VerifyEmailController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest:admin')->prefix('admin')->name('admin.')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware(['auth.admin'])->prefix('admin')->name('admin.')->group(function () {


    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

Route::middleware(['auth.admin'])->prefix('admin')->name('admin.')->group(
    function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::get('/dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('dashboard');

        Route::get('/no-permission', function () {
            return Inertia::render('NoPermission');
        })->name('no_permission');
        
        Route::get('/dashboard/overview', function () {
            return Inertia::render('Overview');
        })->name('dashboard.overview');

        // Users
        Route::get('/users', [UserController::class, 'index'])->name('users')->middleware('permission:read_users,admin');;
        Route::post('/users', [UserController::class, 'store'])->name('users.store')->middleware('permission:create_users,admin');;
        Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy')->middleware('permission:delete_users,admin');;
        Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update')->middleware('permission:udpate_users,admin');;

        // Admins
        Route::get('/admins', [AdminController::class, 'index'])->name('admins')->middleware('permission:read_admins,admin');
        Route::post('/admins', [AdminController::class, 'store'])->name('admins.store')->middleware('permission:create_admins,admin');
        Route::delete('/admins/{id}', [AdminController::class, 'destroy'])->name('admins.destroy')->middleware('permission:delete_admins,admin');
        Route::put('/admins/{id}', [AdminController::class, 'update'])->name('admins.update')->middleware('permission:udpate_admins,admin');

        //Roles 
        Route::get('/roles', [RoleController::class, 'index'])->name('roles')->middleware('permission:read_roles,admin');
        Route::post('/roles', [RoleController::class, 'store'])->name('roles.store')->middleware('permission:create_roles,admin');
        Route::get('/roles/create', [RoleController::class, 'create'])->name('roles.create')->middleware('permission:create_roles,admin');
        Route::get('/roles/edit/{id}', [RoleController::class, 'edit'])->name('roles.edit')->middleware('permission:update_roles,admin');
        Route::put('/roles/{id}', [RoleController::class, 'update'])->name('roles.update')->middleware('permission:update_roles,admin');
        Route::delete('/roles/{id}', [RoleController::class, 'destroy'])->name('roles.destroy')->middleware('permission:delete_roles,admin');

    }
);
