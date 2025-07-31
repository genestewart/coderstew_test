<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::post('/contact', [ContactController::class, 'store'])
    ->middleware(['throttle.contact-form']);