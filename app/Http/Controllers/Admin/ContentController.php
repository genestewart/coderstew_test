<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ContentController extends Controller
{
    /**
     * Get all content items
     */
    public function index(): JsonResponse
    {
        $content = $this->loadContent();
        
        return response()->json([
            'success' => true,
            'data' => $content
        ]);
    }

    /**
     * Update content item
     */
    public function update(Request $request, string $section): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $content = $this->loadContent();
            $content[$section] = $request->input('content');
            
            $this->saveContent($content);

            // Clear relevant caches
            $this->clearContentCache();

            return response()->json([
                'success' => true,
                'message' => 'Content updated successfully',
                'data' => $content[$section]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update content',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get specific content section
     */
    public function show(string $section): JsonResponse
    {
        $content = $this->loadContent();
        
        if (!isset($content[$section])) {
            return response()->json([
                'success' => false,
                'message' => 'Content section not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $content[$section]
        ]);
    }

    /**
     * Reset content to defaults
     */
    public function reset(Request $request, string $section): JsonResponse
    {
        try {
            $defaults = $this->getDefaultContent();
            
            if (!isset($defaults[$section])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid content section'
                ], 400);
            }

            $content = $this->loadContent();
            $content[$section] = $defaults[$section];
            
            $this->saveContent($content);
            $this->clearContentCache();

            return response()->json([
                'success' => true,
                'message' => 'Content reset to defaults',
                'data' => $content[$section]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to reset content',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Load content from storage
     */
    private function loadContent(): array
    {
        $contentFile = 'content/site-content.json';
        
        if (Storage::exists($contentFile)) {
            $content = json_decode(Storage::get($contentFile), true);
            return $content ?: $this->getDefaultContent();
        }
        
        return $this->getDefaultContent();
    }

    /**
     * Save content to storage
     */
    private function saveContent(array $content): void
    {
        $contentFile = 'content/site-content.json';
        
        // Create backup before saving
        if (Storage::exists($contentFile)) {
            $backup = 'content/backups/site-content-' . date('Y-m-d-H-i-s') . '.json';
            Storage::copy($contentFile, $backup);
        }
        
        Storage::put($contentFile, json_encode($content, JSON_PRETTY_PRINT));
    }

    /**
     * Get default content structure
     */
    private function getDefaultContent(): array
    {
        return [
            'hero' => [
                'title' => 'Professional Programming & IT Services',
                'subtitle' => 'Custom web applications, mobile development, and technical consulting for businesses that demand excellence.',
                'cta_text' => 'Start Your Project',
                'cta_link' => '/contact'
            ],
            'services' => [
                [
                    'id' => 'web-development',
                    'title' => 'Web Development',
                    'description' => 'Custom web applications built with Laravel, Vue.js, and modern technologies.',
                    'features' => [
                        'Responsive design',
                        'Database integration',
                        'API development',
                        'Performance optimization'
                    ]
                ],
                [
                    'id' => 'mobile-apps',
                    'title' => 'Mobile Applications',
                    'description' => 'Native and cross-platform mobile apps for iOS and Android.',
                    'features' => [
                        'Native development',
                        'Cross-platform solutions',
                        'App store deployment',
                        'Maintenance & updates'
                    ]
                ],
                [
                    'id' => 'it-consulting',
                    'title' => 'IT Consulting',
                    'description' => 'Technical guidance and system architecture planning for your business.',
                    'features' => [
                        'System architecture',
                        'Technology selection',
                        'Process optimization',
                        'Security audits'
                    ]
                ]
            ],
            'about' => [
                'title' => 'Expert Technical Solutions',
                'description' => 'With years of experience in software development and IT consulting, we provide reliable, scalable solutions tailored to your business needs.',
                'skills' => [
                    'Laravel & PHP',
                    'Vue.js & JavaScript',
                    'MySQL & Database Design',
                    'System Integration',
                    'Cloud Deployment',
                    'Security Best Practices'
                ]
            ],
            'contact' => [
                'title' => 'Let\'s Discuss Your Project',
                'description' => 'Ready to start your next project? Get in touch and let\'s discuss how we can help bring your vision to life.',
                'email' => 'contact@coderstew.com',
                'response_time' => '24-48 hours',
                'consultation' => 'Free initial consultation'
            ]
        ];
    }

    /**
     * Clear content-related caches
     */
    private function clearContentCache(): void
    {
        // Clear view cache
        if (function_exists('opcache_reset')) {
            opcache_reset();
        }
        
        // Clear application cache
        \Artisan::call('cache:clear');
        \Artisan::call('view:clear');
    }
}