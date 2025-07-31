<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class HealthController extends Controller
{
    /**
     * Basic health check endpoint
     */
    public function basic(): JsonResponse
    {
        return response()->json([
            'status' => 'healthy',
            'timestamp' => now()->toISOString(),
            'application' => 'CoderStew LLC',
            'version' => '1.0.0'
        ]);
    }

    /**
     * Detailed health check with system status
     */
    public function detailed(): JsonResponse
    {
        $checks = [
            'database' => $this->checkDatabase(),
            'cache' => $this->checkCache(),
            'storage' => $this->checkStorage(),
            'mail' => $this->checkMail(),
            'disk_space' => $this->checkDiskSpace(),
        ];

        $overallStatus = collect($checks)->every(fn($check) => $check['status'] === 'healthy') 
            ? 'healthy' 
            : 'unhealthy';

        return response()->json([
            'status' => $overallStatus,
            'timestamp' => now()->toISOString(),
            'application' => 'CoderStew LLC',
            'version' => '1.0.0',
            'checks' => $checks,
            'environment' => app()->environment(),
            'php_version' => PHP_VERSION,
            'laravel_version' => app()->version(),
        ]);
    }

    /**
     * System metrics endpoint
     */
    public function metrics(): JsonResponse
    {
        return response()->json([
            'timestamp' => now()->toISOString(),
            'system' => [
                'memory_usage' => [
                    'current' => memory_get_usage(true),
                    'peak' => memory_get_peak_usage(true),
                    'limit' => ini_get('memory_limit'),
                ],
                'uptime' => $this->getUptime(),
                'load_average' => $this->getLoadAverage(),
                'disk_usage' => $this->getDiskUsage(),
            ],
            'application' => [
                'total_requests' => $this->getTotalRequests(),
                'database_connections' => $this->getDatabaseConnections(),
                'cache_hit_ratio' => $this->getCacheHitRatio(),
                'response_time' => $this->getAverageResponseTime(),
            ],
            'contact_forms' => [
                'total_submissions' => $this->getContactFormSubmissions(),
                'submissions_today' => $this->getContactFormSubmissionsToday(),
                'success_rate' => $this->getContactFormSuccessRate(),
            ]
        ]);
    }

    private function checkDatabase(): array
    {
        try {
            DB::connection()->getPdo();
            $tableCount = collect(DB::select('SHOW TABLES'))->count();
            
            return [
                'status' => 'healthy',
                'message' => 'Database connection successful',
                'details' => [
                    'connection' => config('database.default'),
                    'tables' => $tableCount,
                ]
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'unhealthy',
                'message' => 'Database connection failed',
                'error' => $e->getMessage()
            ];
        }
    }

    private function checkCache(): array
    {
        try {
            $testKey = 'health_check_' . time();
            $testValue = 'test_value';
            
            Cache::put($testKey, $testValue, 60);
            $retrieved = Cache::get($testKey);
            Cache::forget($testKey);
            
            if ($retrieved === $testValue) {
                return [
                    'status' => 'healthy',
                    'message' => 'Cache is working correctly',
                    'driver' => config('cache.default')
                ];
            } else {
                return [
                    'status' => 'unhealthy',
                    'message' => 'Cache test failed'
                ];
            }
        } catch (\Exception $e) {
            return [
                'status' => 'unhealthy',
                'message' => 'Cache check failed',
                'error' => $e->getMessage()
            ];
        }
    }

    private function checkStorage(): array
    {
        try {
            $testFile = 'health_check_' . time() . '.txt';
            $testContent = 'health check test';
            
            Storage::put($testFile, $testContent);
            $retrieved = Storage::get($testFile);
            Storage::delete($testFile);
            
            if ($retrieved === $testContent) {
                return [
                    'status' => 'healthy',
                    'message' => 'Storage is working correctly',
                    'disk' => config('filesystems.default')
                ];
            } else {
                return [
                    'status' => 'unhealthy',
                    'message' => 'Storage test failed'
                ];
            }
        } catch (\Exception $e) {
            return [
                'status' => 'unhealthy',
                'message' => 'Storage check failed',
                'error' => $e->getMessage()
            ];
        }
    }

    private function checkMail(): array
    {
        try {
            $config = config('mail');
            
            return [
                'status' => 'healthy',
                'message' => 'Mail configuration loaded',
                'mailer' => $config['default'] ?? 'unknown',
                'from' => $config['from'] ?? []
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'unhealthy',
                'message' => 'Mail configuration check failed',
                'error' => $e->getMessage()
            ];
        }
    }

    private function checkDiskSpace(): array
    {
        try {
            $path = storage_path();
            $totalSpace = disk_total_space($path);
            $freeSpace = disk_free_space($path);
            $usedSpace = $totalSpace - $freeSpace;
            $usagePercentage = ($usedSpace / $totalSpace) * 100;

            $status = $usagePercentage > 90 ? 'unhealthy' : 'healthy';
            $message = $usagePercentage > 90 
                ? 'Disk space critically low' 
                : 'Disk space OK';

            return [
                'status' => $status,
                'message' => $message,
                'details' => [
                    'total' => $totalSpace,
                    'free' => $freeSpace,
                    'used' => $usedSpace,
                    'usage_percentage' => round($usagePercentage, 2)
                ]
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'unhealthy',
                'message' => 'Disk space check failed',
                'error' => $e->getMessage()
            ];
        }
    }

    private function getUptime(): ?string
    {
        if (function_exists('shell_exec')) {
            return trim(shell_exec('uptime'));
        }
        return null;
    }

    private function getLoadAverage(): ?array
    {
        if (function_exists('sys_getloadavg')) {
            return sys_getloadavg();
        }
        return null;
    }

    private function getDiskUsage(): array
    {
        $path = storage_path();
        $totalSpace = disk_total_space($path);
        $freeSpace = disk_free_space($path);
        
        return [
            'total' => $totalSpace,
            'free' => $freeSpace,
            'used' => $totalSpace - $freeSpace,
            'usage_percentage' => round((($totalSpace - $freeSpace) / $totalSpace) * 100, 2)
        ];
    }

    private function getTotalRequests(): int
    {
        // This would be implemented with actual metrics collection
        return 0;
    }

    private function getDatabaseConnections(): int
    {
        try {
            $result = DB::select('SHOW PROCESSLIST');
            return count($result);
        } catch (\Exception $e) {
            return 0;
        }
    }

    private function getCacheHitRatio(): float
    {
        // This would be implemented with actual cache metrics
        return 0.0;
    }

    private function getAverageResponseTime(): float
    {
        // This would be implemented with actual response time tracking
        return 0.0;
    }

    private function getContactFormSubmissions(): int
    {
        try {
            return DB::table('contact_inquiries')->count();
        } catch (\Exception $e) {
            return 0;
        }
    }

    private function getContactFormSubmissionsToday(): int
    {
        try {
            return DB::table('contact_inquiries')
                ->whereDate('created_at', today())
                ->count();
        } catch (\Exception $e) {
            return 0;
        }
    }

    private function getContactFormSuccessRate(): float
    {
        try {
            $total = DB::table('contact_inquiries')->count();
            $successful = DB::table('contact_inquiries')
                ->where('status', 'new')
                ->orWhere('status', 'contacted')
                ->count();
            
            return $total > 0 ? ($successful / $total) * 100 : 100.0;
        } catch (\Exception $e) {
            return 0.0;
        }
    }
}