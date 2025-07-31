<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use App\Helpers\SEOHelper;

class SEOMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Only process HTML responses
        $contentType = $response->headers->get('Content-Type', '');
        if (!str_contains($contentType, 'text/html') && !empty($contentType)) {
            return $response;
        }

        // Determine page type and generate appropriate SEO data
        $path = $request->path();
        $seoData = $this->getSEODataForPath($path, $request);

        // Share SEO data with all views
        View::share('seoData', $seoData);
        View::share('structuredData', SEOHelper::generatePageStructuredData($seoData['pageType'], $seoData));

        return $response;
    }

    /**
     * Get SEO data based on the current path
     */
    private function getSEODataForPath(string $path, Request $request): array
    {
        $baseUrl = $request->getSchemeAndHttpHost();
        
        switch ($path) {
            case '/':
                return [
                    'pageType' => 'home',
                    'title' => 'CoderStew LLC - Professional Programming & IT Services',
                    'description' => 'Expert freelance programming and IT services. Custom web applications, mobile development, system integration, and technical consulting for businesses of all sizes.',
                    'url' => $baseUrl,
                    'og:type' => 'website',
                ];

            case 'contact':
                return [
                    'pageType' => 'contact',
                    'title' => 'Contact CoderStew LLC - Get Your Project Started',
                    'description' => 'Ready to start your project? Contact CoderStew LLC for professional programming and IT services. Free consultation and competitive pricing.',
                    'url' => $baseUrl . '/contact',
                    'og:type' => 'website',
                ];

            default:
                return [
                    'pageType' => 'page',
                    'title' => 'CoderStew LLC - Professional Programming & IT Services',
                    'description' => 'Expert freelance programming and IT services for businesses.',
                    'url' => $baseUrl . '/' . $path,
                    'og:type' => 'website',
                ];
        }
    }
}