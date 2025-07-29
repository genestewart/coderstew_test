<?php

namespace Tests\Feature;

use Tests\TestCase;

class TypographyTest extends TestCase
{
    /**
     * Test that typography configuration is set up in Tailwind
     */
    public function test_typography_fonts_are_configured()
    {
        $configPath = base_path('tailwind_config.js');
        $this->assertFileExists($configPath, 'Tailwind config file should exist');
        
        $configContent = file_get_contents($configPath);
        
        // Test that font families are defined
        $this->assertStringContainsString('fontFamily', $configContent, 'Font family configuration should exist');
        $this->assertStringContainsString('Inter', $configContent, 'Inter font should be configured');
        $this->assertStringContainsString('system-ui', $configContent, 'System font fallback should be configured');
    }
    
    /**
     * Test that Google Fonts are properly loaded
     */
    public function test_google_fonts_integration()
    {
        // Test that font loading is configured
        $appCssPath = base_path('resources/css/app.css');
        $this->assertFileExists($appCssPath, 'App CSS file should exist');
        
        $cssContent = file_get_contents($appCssPath);
        
        // Check for Google Fonts import or font-face declarations
        $hasGoogleFonts = str_contains($cssContent, '@import') || 
                         str_contains($cssContent, '@font-face') ||
                         str_contains($cssContent, 'font-display');
        
        $this->assertTrue($hasGoogleFonts, 'Google Fonts should be integrated via CSS');
    }
    
    /**
     * Test that typography utility classes are available
     */
    public function test_typography_utility_classes()
    {
        $configPath = base_path('tailwind_config.js');
        $configContent = file_get_contents($configPath);
        
        // Test that typography configuration exists
        $this->assertStringContainsString('fontSize', $configContent, 'Font size configuration should exist');
        
        // Verify that custom font sizes are defined if any
        $hasCustomTypography = str_contains($configContent, 'fontSize') && 
                              str_contains($configContent, 'lineHeight');
        
        $this->assertTrue($hasCustomTypography, 'Typography scale should be configured');
    }
    
    /**
     * Test that font fallbacks are properly configured
     */
    public function test_font_fallbacks()
    {
        $configPath = base_path('tailwind_config.js');
        $configContent = file_get_contents($configPath);
        
        // Test that system font fallbacks are included
        $this->assertStringContainsString('sans-serif', $configContent, 'Sans-serif fallback should be included');
        
        // Test that system UI fonts are configured for better performance
        $hasSystemFallbacks = str_contains($configContent, 'system-ui') || 
                             str_contains($configContent, '-apple-system') ||
                             str_contains($configContent, 'BlinkMacSystemFont');
        
        $this->assertTrue($hasSystemFallbacks, 'System font fallbacks should be available');
    }
}