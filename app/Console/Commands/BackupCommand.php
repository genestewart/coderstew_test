<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class BackupCommand extends Command
{
    protected $signature = 'backup:run 
                           {--type=full : Type of backup (full, database, files)}
                           {--compress : Compress the backup files}
                           {--notify : Send email notification when complete}';

    protected $description = 'Create backup of database and/or files for CoderStew LLC website';

    public function handle()
    {
        $type = $this->option('type');
        $compress = $this->option('compress');
        $notify = $this->option('notify');
        
        $timestamp = Carbon::now()->format('Y-m-d_H-i-s');
        $backupDir = "backups/{$timestamp}";
        
        $this->info("Starting backup process...");
        $this->info("Backup type: {$type}");
        $this->info("Timestamp: {$timestamp}");
        
        try {
            // Create backup directory
            if (!Storage::exists($backupDir)) {
                Storage::makeDirectory($backupDir);
            }
            
            $backupSize = 0;
            $backupFiles = [];
            
            // Database backup
            if ($type === 'full' || $type === 'database') {
                $this->info("Creating database backup...");
                $backupSize += $this->backupDatabase($backupDir, $compress);
                $backupFiles[] = 'database.sql' . ($compress ? '.gz' : '');
            }
            
            // Files backup
            if ($type === 'full' || $type === 'files') {
                $this->info("Creating files backup...");
                $backupSize += $this->backupFiles($backupDir, $compress);
                $backupFiles[] = 'files.tar' . ($compress ? '.gz' : '');
            }
            
            // Clean old backups
            $this->cleanOldBackups();
            
            $this->info("✅ Backup completed successfully!");
            $this->info("Backup location: storage/app/{$backupDir}");
            $this->info("Total size: " . $this->formatBytes($backupSize));
            
            // Send notification email
            if ($notify && config('production.backup.notification_email')) {
                $this->sendNotificationEmail($backupDir, $backupFiles, $backupSize);
            }
            
            return Command::SUCCESS;
            
        } catch (\Exception $e) {
            $this->error("Backup failed: " . $e->getMessage());
            
            if ($notify && config('production.backup.notification_email')) {
                $this->sendErrorNotification($e->getMessage());
            }
            
            return Command::FAILURE;
        }
    }
    
    private function backupDatabase(string $backupDir, bool $compress = false): int
    {
        $filename = $backupDir . '/database.sql';
        
        // Get database configuration
        $connection = config('database.default');
        $config = config("database.connections.{$connection}");
        
        if ($config['driver'] === 'mysql') {
            $command = sprintf(
                'mysqldump --host=%s --port=%s --user=%s --password=%s %s > %s',
                $config['host'],
                $config['port'],
                $config['username'],
                $config['password'],
                $config['database'],
                storage_path("app/{$filename}")
            );
        } else {
            // For SQLite or other databases
            $tables = DB::select('SELECT name FROM sqlite_master WHERE type="table"');
            $sql = '';
            
            foreach ($tables as $table) {
                $sql .= "-- Table: {$table->name}\n";
                $sql .= "DROP TABLE IF EXISTS `{$table->name}`;\n";
                
                // Get CREATE TABLE statement
                $create = DB::select("SELECT sql FROM sqlite_master WHERE type='table' AND name=?", [$table->name]);
                if (!empty($create)) {
                    $sql .= $create[0]->sql . ";\n\n";
                }
                
                // Get table data
                $rows = DB::table($table->name)->get();
                foreach ($rows as $row) {
                    $values = array_map(function($value) {
                        return is_null($value) ? 'NULL' : "'" . addslashes($value) . "'";
                    }, (array) $row);
                    
                    $sql .= "INSERT INTO `{$table->name}` VALUES (" . implode(', ', $values) . ");\n";
                }
                $sql .= "\n";
            }
            
            Storage::put($filename, $sql);
        }
        
        $size = Storage::size($filename);
        
        if ($compress) {
            $this->compressFile(storage_path("app/{$filename}"));
            $size = Storage::size($filename . '.gz');
        }
        
        return $size;
    }
    
    private function backupFiles(string $backupDir, bool $compress = false): int
    {
        $filename = $backupDir . '/files.tar';
        $excludes = [
            '--exclude=storage/logs/*',
            '--exclude=storage/framework/cache/*',
            '--exclude=storage/framework/sessions/*',
            '--exclude=storage/framework/views/*',
            '--exclude=node_modules',
            '--exclude=.git',
            '--exclude=backups',
        ];
        
        $command = sprintf(
            'tar -cf %s %s .',
            storage_path("app/{$filename}"),
            implode(' ', $excludes)
        );
        
        exec($command);
        
        $size = Storage::size($filename);
        
        if ($compress) {
            $this->compressFile(storage_path("app/{$filename}"));
            $size = Storage::size($filename . '.gz');
        }
        
        return $size;
    }
    
    private function compressFile(string $filepath): void
    {
        $command = "gzip {$filepath}";
        exec($command);
    }
    
    private function cleanOldBackups(): void
    {
        $retentionDays = config('production.backup.retention_days', 30);
        $cutoffDate = Carbon::now()->subDays($retentionDays);
        
        $backupDirectories = Storage::directories('backups');
        
        foreach ($backupDirectories as $dir) {
            $dirName = basename($dir);
            
            // Check if directory name is a timestamp
            if (preg_match('/^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}$/', $dirName)) {
                $dirDate = Carbon::createFromFormat('Y-m-d_H-i-s', $dirName);
                
                if ($dirDate->lt($cutoffDate)) {
                    Storage::deleteDirectory($dir);
                    $this->info("Deleted old backup: {$dir}");
                }
            }
        }
    }
    
    private function sendNotificationEmail(string $backupDir, array $files, int $size): void
    {
        $email = config('production.backup.notification_email');
        
        if (!$email) {
            return;
        }
        
        Mail::raw(
            "Backup completed successfully!\n\n" .
            "Location: {$backupDir}\n" .
            "Files: " . implode(', ', $files) . "\n" .
            "Total Size: " . $this->formatBytes($size) . "\n" .
            "Timestamp: " . now()->toDateTimeString() . "\n\n" .
            "CoderStew LLC Backup System",
            function ($message) use ($email) {
                $message->to($email)
                       ->subject('Backup Completed - CoderStew LLC');
            }
        );
    }
    
    private function sendErrorNotification(string $error): void
    {
        $email = config('production.backup.notification_email');
        
        if (!$email) {
            return;
        }
        
        Mail::raw(
            "Backup failed!\n\n" .
            "Error: {$error}\n" .
            "Timestamp: " . now()->toDateTimeString() . "\n\n" .
            "Please check the server and try again.\n\n" .
            "CoderStew LLC Backup System",
            function ($message) use ($email) {
                $message->to($email)
                       ->subject('Backup Failed - CoderStew LLC');
            }
        );
    }
    
    private function formatBytes(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $i = 0;
        
        while ($bytes >= 1024 && $i < 3) {
            $bytes /= 1024;
            $i++;
        }
        
        return round($bytes, 2) . ' ' . $units[$i];
    }
}