<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class CompressionMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Only compress if the client accepts it
        if (!$request->header('Accept-Encoding') || 
            !str_contains($request->header('Accept-Encoding'), 'gzip')) {
            return $response;
        }

        // Only compress text-based content
        $contentType = $response->headers->get('Content-Type', '');
        $compressibleTypes = [
            'text/html',
            'text/css',
            'text/javascript',
            'application/javascript',
            'application/json',
            'text/xml',
            'application/xml',
            'text/plain'
        ];

        $shouldCompress = false;
        foreach ($compressibleTypes as $type) {
            if (str_contains($contentType, $type)) {
                $shouldCompress = true;
                break;
            }
        }

        if (!$shouldCompress) {
            return $response;
        }

        // Get the content
        $content = $response->getContent();
        
        // Don't compress if content is too small
        if (strlen($content) < 1024) {
            return $response;
        }

        // Compress the content
        $compressedContent = gzencode($content, 6);
        
        if ($compressedContent === false) {
            return $response;
        }

        // Set compressed content and headers
        $response->setContent($compressedContent);
        $response->headers->set('Content-Encoding', 'gzip');
        $response->headers->set('Content-Length', strlen($compressedContent));
        $response->headers->set('Vary', 'Accept-Encoding');

        return $response;
    }
}