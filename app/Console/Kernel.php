<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Daily database backup at 2 AM
        $schedule->command('backup:run --type=database --compress --notify')
                 ->dailyAt('02:00')
                 ->onOneServer()
                 ->runInBackground();

        // Weekly full backup on Sundays at 1 AM
        $schedule->command('backup:run --type=full --compress --notify')
                 ->weeklyOn(0, '01:00')
                 ->onOneServer()
                 ->runInBackground();

        // Clear old logs weekly
        $schedule->command('log:clear')
                 ->weekly()
                 ->onOneServer();

        // Health check every 5 minutes (could be used for monitoring)
        $schedule->call(function () {
            // Log health status for monitoring
            $healthController = new \App\Http\Controllers\HealthController();
            $health = $healthController->detailed();
            
            if ($health->getData()->status !== 'healthy') {
                \Log::warning('System health check failed', (array) $health->getData());
            }
        })->everyFiveMinutes();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}