<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Carbon\Carbon;

class SitemapController extends Controller
{
    /**
     * Generate dynamic XML sitemap
     */
    public function index(Request $request): Response
    {
        $baseUrl = $request->getSchemeAndHttpHost();
        $lastModified = Carbon::now()->format('Y-m-d\TH:i:sP');
        
        // Define static pages with their priorities and change frequencies
        $pages = [
            [
                'url' => $baseUrl,
                'lastmod' => $lastModified,
                'changefreq' => 'weekly',
                'priority' => '1.0'
            ],
            [
                'url' => $baseUrl . '/contact',
                'lastmod' => $lastModified,
                'changefreq' => 'monthly',
                'priority' => '0.8'
            ],
        ];

        // Generate XML sitemap
        $xml = $this->generateSitemapXML($pages);

        return response($xml, 200)
            ->header('Content-Type', 'application/xml')
            ->header('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    }

    /**
     * Generate XML sitemap content
     */
    private function generateSitemapXML(array $pages): string
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;

        foreach ($pages as $page) {
            $xml .= '  <url>' . PHP_EOL;
            $xml .= '    <loc>' . htmlspecialchars($page['url']) . '</loc>' . PHP_EOL;
            $xml .= '    <lastmod>' . htmlspecialchars($page['lastmod']) . '</lastmod>' . PHP_EOL;
            $xml .= '    <changefreq>' . htmlspecialchars($page['changefreq']) . '</changefreq>' . PHP_EOL;
            $xml .= '    <priority>' . htmlspecialchars($page['priority']) . '</priority>' . PHP_EOL;
            $xml .= '  </url>' . PHP_EOL;
        }

        $xml .= '</urlset>' . PHP_EOL;

        return $xml;
    }

    /**
     * Generate robots.txt dynamically (optional enhancement)
     */
    public function robots(Request $request): Response
    {
        $baseUrl = $request->getSchemeAndHttpHost();
        
        $robotsTxt = "# Robots.txt for CoderStew LLC\n";
        $robotsTxt .= "User-agent: *\n";
        $robotsTxt .= "Allow: /\n";
        $robotsTxt .= "Disallow: /api/\n";
        $robotsTxt .= "Disallow: /admin/\n";
        $robotsTxt .= "Disallow: /storage/\n";
        $robotsTxt .= "Disallow: /vendor/\n";
        $robotsTxt .= "Disallow: /*.json$\n";
        $robotsTxt .= "Disallow: /*.log$\n\n";
        $robotsTxt .= "# Crawl delay\n";
        $robotsTxt .= "Crawl-delay: 1\n\n";
        $robotsTxt .= "# Sitemap location\n";
        $robotsTxt .= "Sitemap: {$baseUrl}/sitemap.xml\n\n";
        $robotsTxt .= "# Specific rules for major search engines\n";
        $robotsTxt .= "User-agent: Googlebot\n";
        $robotsTxt .= "Allow: /\n";
        $robotsTxt .= "Disallow: /api/\n";
        $robotsTxt .= "Crawl-delay: 1\n\n";
        $robotsTxt .= "User-agent: Bingbot\n";
        $robotsTxt .= "Allow: /\n";
        $robotsTxt .= "Disallow: /api/\n";
        $robotsTxt .= "Crawl-delay: 2\n";

        return response($robotsTxt, 200)
            ->header('Content-Type', 'text/plain')
            ->header('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    }
}