<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\HealthController;

// SEO and crawling routes
Route::get('/sitemap.xml', [SitemapController::class, 'index'])
    ->name('sitemap')
    ->middleware('cache.headers:public;max_age=3600');

Route::get('/robots.txt', [SitemapController::class, 'robots'])
    ->name('robots')
    ->middleware('cache.headers:public;max_age=86400');

// Health check and monitoring routes
Route::get('/health', [HealthController::class, 'basic'])
    ->name('health.basic');

Route::get('/health/detailed', [HealthController::class, 'detailed'])
    ->name('health.detailed');

Route::get('/health/metrics', [HealthController::class, 'metrics'])
    ->name('health.metrics');

// Main routes with caching for better performance
Route::get('/', function () {
    return view('app');
})->middleware('cache.headers:public;max_age=3600;etag');

Route::get('/contact', function () {
    return view('app');
})->middleware('cache.headers:public;max_age=3600;etag');

// Catch-all route for Vue Router (SPA)
Route::get('/{any}', function () {
    return view('app');
})->middleware('cache.headers:public;max_age=3600;etag')->where('any', '.*');
