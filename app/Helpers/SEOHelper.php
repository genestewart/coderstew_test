<?php

namespace App\Helpers;

class SEOHelper
{
    /**
     * Default SEO configuration
     */
    protected static array $defaults = [
        'title' => 'CoderStew LLC - Professional Programming & IT Services',
        'description' => 'Expert freelance programming and IT services. Custom web applications, mobile development, system integration, and technical consulting for businesses of all sizes.',
        'keywords' => 'freelance developer, programming services, web development, Laravel, Vue.js, IT consulting, custom software, mobile applications, system integration',
        'author' => 'CoderStew LLC',
        'site_name' => 'CoderStew LLC',
        'url' => 'https://coderstew.com',
        'image' => '/assets/CoderStew_Logo.svg',
        'type' => 'website',
        'locale' => 'en_US',
    ];

    /**
     * Generate meta tags for a page
     */
    public static function generateMetaTags(array $pageData = []): array
    {
        $data = array_merge(self::$defaults, $pageData);
        
        return [
            // Basic meta tags
            'title' => $data['title'],
            'description' => $data['description'],
            'keywords' => $data['keywords'],
            'author' => $data['author'],
            'robots' => $data['robots'] ?? 'index, follow',
            'canonical' => $data['canonical'] ?? $data['url'],
            
            // Open Graph tags
            'og:title' => $data['og:title'] ?? $data['title'],
            'og:description' => $data['og:description'] ?? $data['description'],
            'og:image' => $data['og:image'] ?? $data['image'],
            'og:url' => $data['og:url'] ?? $data['url'],
            'og:type' => $data['og:type'] ?? $data['type'],
            'og:site_name' => $data['og:site_name'] ?? $data['site_name'],
            'og:locale' => $data['og:locale'] ?? $data['locale'],
            
            // Twitter Card tags
            'twitter:card' => $data['twitter:card'] ?? 'summary_large_image',
            'twitter:title' => $data['twitter:title'] ?? $data['title'],
            'twitter:description' => $data['twitter:description'] ?? $data['description'],
            'twitter:image' => $data['twitter:image'] ?? $data['image'],
            
            // Additional SEO tags
            'viewport' => 'width=device-width, initial-scale=1.0',
            'theme-color' => '#FF9410',
        ];
    }

    /**
     * Generate structured data (JSON-LD) for the business
     */
    public static function generateStructuredData(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'ProfessionalService',
            'name' => 'CoderStew LLC',
            'description' => 'Professional freelance programming and IT services specializing in custom web applications, mobile development, and system integration.',
            'url' => 'https://coderstew.com',
            'logo' => 'https://coderstew.com/assets/CoderStew_Logo.svg',
            'telephone' => '+1-XXX-XXX-XXXX', // To be updated with actual number
            'email' => 'contact@coderstew.com',
            'address' => [
                '@type' => 'PostalAddress',
                'addressCountry' => 'US',
                // Add specific address when available
            ],
            'serviceType' => [
                'Web Development',
                'Mobile Application Development',
                'System Integration',
                'IT Consulting',
                'Custom Software Development'
            ],
            'areaServed' => [
                '@type' => 'Country',
                'name' => 'United States'
            ],
            'hasOfferCatalog' => [
                '@type' => 'OfferCatalog',
                'name' => 'Programming & IT Services',
                'itemListElement' => [
                    [
                        '@type' => 'Offer',
                        'itemOffered' => [
                            '@type' => 'Service',
                            'name' => 'Web Application Development',
                            'description' => 'Custom web applications using Laravel, Vue.js, and modern technologies'
                        ]
                    ],
                    [
                        '@type' => 'Offer',
                        'itemOffered' => [
                            '@type' => 'Service',
                            'name' => 'Mobile App Development',
                            'description' => 'Native and cross-platform mobile applications'
                        ]
                    ],
                    [
                        '@type' => 'Offer',
                        'itemOffered' => [
                            '@type' => 'Service',
                            'name' => 'IT Consulting',
                            'description' => 'Technical consulting and system architecture planning'
                        ]
                    ]
                ]
            ],
            'sameAs' => [
                // Add social media profiles when available
                // 'https://linkedin.com/company/coderstew',
                // 'https://github.com/coderstew'
            ]
        ];
    }

    /**
     * Generate page-specific structured data
     */
    public static function generatePageStructuredData(string $pageType, array $data = []): array
    {
        switch ($pageType) {
            case 'contact':
                return [
                    '@context' => 'https://schema.org',
                    '@type' => 'ContactPage',
                    'name' => 'Contact CoderStew LLC',
                    'description' => 'Get in touch with CoderStew LLC for your programming and IT service needs.',
                    'mainEntity' => [
                        '@type' => 'ProfessionalService',
                        'name' => 'CoderStew LLC'
                    ]
                ];
                
            case 'service':
                return [
                    '@context' => 'https://schema.org',
                    '@type' => 'Service',
                    'name' => $data['name'] ?? 'Programming Services',
                    'description' => $data['description'] ?? 'Professional programming and IT services',
                    'provider' => [
                        '@type' => 'Organization',
                        'name' => 'CoderStew LLC'
                    ]
                ];
                
            default:
                return self::generateStructuredData();
        }
    }

    /**
     * Generate meta tags HTML
     */
    public static function renderMetaTags(array $pageData = []): string
    {
        $meta = self::generateMetaTags($pageData);
        $html = '';

        foreach ($meta as $name => $content) {
            if (in_array($name, ['title', 'canonical'])) {
                continue; // These are handled separately
            }
            
            if (str_starts_with($name, 'og:') || str_starts_with($name, 'twitter:')) {
                $html .= '<meta property="' . $name . '" content="' . htmlspecialchars($content) . '">' . "\n\t";
            } else {
                $html .= '<meta name="' . $name . '" content="' . htmlspecialchars($content) . '">' . "\n\t";
            }
        }

        return $html;
    }
}