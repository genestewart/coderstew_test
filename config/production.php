<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Production Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains production-specific configuration settings for
    | CoderStew LLC website deployment and maintenance.
    |
    */

    'deployment' => [
        'backup_before_deploy' => true,
        'run_migrations' => true,
        'clear_cache' => true,
        'optimize_autoloader' => true,
        'build_assets' => true,
    ],

    'security' => [
        'force_https' => env('FORCE_HTTPS', true),
        'secure_headers' => env('SECURE_HEADERS', true),
        'hide_server_info' => true,
        'csrf_protection' => true,
    ],

    'performance' => [
        'cache_views' => true,
        'cache_routes' => true,
        'cache_config' => true,
        'cache_events' => true,
        'enable_opcache' => true,
        'enable_gzip' => true,
    ],

    'monitoring' => [
        'error_reporting' => env('APP_DEBUG', false),
        'log_level' => env('LOG_LEVEL', 'error'),
        'log_rotation' => 'daily',
        'max_log_files' => 14,
        'monitor_disk_space' => true,
        'monitor_database' => true,
    ],

    'backup' => [
        'enabled' => true,
        'frequency' => 'daily', // daily, weekly, monthly
        'retention_days' => 30,
        'include_files' => true,
        'include_database' => true,
        'compress' => true,
        'notification_email' => env('BACKUP_NOTIFICATION_MAIL_TO'),
    ],

    'maintenance' => [
        'allowed_ips' => [
            // Add your IP addresses here for maintenance mode access
        ],
        'secret_token' => env('MAINTENANCE_SECRET_TOKEN'),
        'retry_after' => 3600, // seconds
    ],
];