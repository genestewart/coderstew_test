<?php

namespace App\Helpers;

class ImageOptimizer
{
    /**
     * Generate srcset for responsive images
     */
    public static function generateSrcSet(string $imagePath, array $sizes = [320, 640, 768, 1024, 1280, 1920]): string
    {
        $pathInfo = pathinfo($imagePath);
        $srcset = [];

        foreach ($sizes as $size) {
            $optimizedPath = self::getOptimizedImagePath($imagePath, $size);
            $srcset[] = "{$optimizedPath} {$size}w";
        }

        return implode(', ', $srcset);
    }

    /**
     * Get optimized image path (for future implementation with actual image processing)
     */
    public static function getOptimizedImagePath(string $imagePath, int $width = null): string
    {
        // For now, return original path
        // In production, this would return path to optimized/resized images
        if ($width && $width < 1920 && str_contains($imagePath, '.jpg')) {
            // Future: return optimized image path
            // return "/images/optimized/{$width}/{$imagePath}";
        }
        
        return $imagePath;
    }

    /**
     * Get WebP alternative if available
     */
    public static function getWebPPath(string $imagePath): string
    {
        $pathInfo = pathinfo($imagePath);
        $webpPath = $pathInfo['dirname'] . '/' . $pathInfo['filename'] . '.webp';
        
        // Check if WebP version exists
        if (file_exists(public_path($webpPath))) {
            return $webpPath;
        }
        
        return $imagePath;
    }

    /**
     * Generate picture element with modern formats
     */
    public static function generatePictureElement(
        string $imagePath, 
        string $alt, 
        array $sizes = ['(max-width: 768px) 100vw', '50vw'],
        string $class = ''
    ): string {
        $webpPath = self::getWebPPath($imagePath);
        $srcset = self::generateSrcSet($imagePath);
        $webpSrcset = self::generateSrcSet($webpPath);
        $sizesAttr = implode(', ', $sizes);

        return "
        <picture>
            <source srcset=\"{$webpSrcset}\" sizes=\"{$sizesAttr}\" type=\"image/webp\">
            <img src=\"{$imagePath}\" 
                 srcset=\"{$srcset}\" 
                 sizes=\"{$sizesAttr}\" 
                 alt=\"{$alt}\" 
                 class=\"{$class}\"
                 loading=\"lazy\"
                 decoding=\"async\">
        </picture>";
    }
}