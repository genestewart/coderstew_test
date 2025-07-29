<?php

namespace Tests\Feature;

use Tests\TestCase;

class TailwindConfigTest extends TestCase
{
    /**
     * Test that CoderStew brand colors are properly configured in Tailwind
     */
    public function test_brand_colors_are_configured()
    {
        $configPath = base_path('tailwind_config.js');
        $this->assertFileExists($configPath, 'Tailwind config file should exist');
        
        $configContent = file_get_contents($configPath);
        
        // Test that brand colors are defined
        $this->assertStringContainsString('primary-orange', $configContent, 'Primary orange color should be defined');
        $this->assertStringContainsString('#FF9410', $configContent, 'Primary orange hex value should be correct');
        
        $this->assertStringContainsString('golden-yellow', $configContent, 'Golden yellow color should be defined');
        $this->assertStringContainsString('#E6C417', $configContent, 'Golden yellow hex value should be correct');
        
        $this->assertStringContainsString('bright-green', $configContent, 'Bright green color should be defined');
        $this->assertStringContainsString('#70E000', $configContent, 'Bright green hex value should be correct');
        
        $this->assertStringContainsString('sky-blue', $configContent, 'Sky blue color should be defined');
        $this->assertStringContainsString('#63B1C7', $configContent, 'Sky blue hex value should be correct');
        
        $this->assertStringContainsString('dark-gray', $configContent, 'Dark gray color should be defined');
        $this->assertStringContainsString('#171717', $configContent, 'Dark gray hex value should be correct');
    }
    
    /**
     * Test that the Tailwind config has proper structure
     */
    public function test_tailwind_config_structure()
    {
        $configPath = base_path('tailwind_config.js');
        $configContent = file_get_contents($configPath);
        
        // Test that theme.extend.colors exists
        $this->assertStringContainsString('theme:', $configContent, 'Theme section should exist');
        $this->assertStringContainsString('extend:', $configContent, 'Extend section should exist');
        $this->assertStringContainsString('colors:', $configContent, 'Colors section should exist');
    }
}