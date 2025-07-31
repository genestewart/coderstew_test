<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\Admin\ContentController;
use Illuminate\Support\Facades\Route;

Route::post('/contact', [ContactController::class, 'store'])
    ->middleware(['throttle.contact-form']);

// Admin content management routes (would need authentication middleware in production)
Route::prefix('admin')->group(function () {
    Route::get('/content', [ContentController::class, 'index']);
    Route::get('/content/{section}', [ContentController::class, 'show']);
    Route::put('/content/{section}', [ContentController::class, 'update']);
    Route::post('/content/{section}/reset', [ContentController::class, 'reset']);
});