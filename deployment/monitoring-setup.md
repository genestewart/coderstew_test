# Monitoring Setup for CoderStew LLC

## Overview
This guide covers setting up monitoring and alerting for the CoderStew LLC website to ensure reliability and performance.

## Built-in Health Monitoring

### Health Check Endpoints
The application provides several health check endpoints:

1. **Basic Health Check**: `/health`
   - Simple status check
   - Returns JSON with status and timestamp

2. **Detailed Health Check**: `/health/detailed`
   - Database connectivity
   - Cache functionality
   - Storage access
   - Disk space monitoring

3. **System Metrics**: `/health/metrics`
   - Memory usage
   - System uptime
   - Database connections
   - Application metrics

### Example Health Check Response
```json
{
  "status": "healthy",
  "timestamp": "2025-01-31T18:50:00Z",
  "application": "CoderStew LLC",
  "version": "1.0.0",
  "checks": {
    "database": {
      "status": "healthy",
      "message": "Database connection successful"
    },
    "cache": {
      "status": "healthy",
      "message": "Cache is working correctly"
    }
  }
}
```

## External Monitoring Services

### 1. UptimeRobot (Recommended - Free)

#### Setup Steps:
1. Sign up at https://uptimerobot.com
2. Add HTTP(s) monitor for https://coderstew.com
3. Add keyword monitor for /health endpoint
4. Configure alert contacts (email, SMS, Slack)

#### Configuration:
```
Monitor Type: HTTP(s)
URL: https://coderstew.com/health
Monitoring Interval: 5 minutes
Keyword: "healthy"
Alert When: Keyword not found OR HTTP error
```

### 2. Pingdom

#### Setup:
1. Sign up at https://pingdom.com
2. Create uptime check for main domain
3. Create transaction check for contact form
4. Set up alerting rules

### 3. StatusCake (Free tier available)

#### Configuration:
```
Test Type: HTTP
URL: https://coderstew.com
Check Rate: Every 5 minutes
Timeout: 30 seconds
```

## Server-Level Monitoring

### 1. System Resource Monitoring

#### Install htop and iotop
```bash
sudo apt update
sudo apt install htop iotop nethogs
```

#### Create monitoring script
```bash
#!/bin/bash
# /usr/local/bin/system-monitor.sh

LOG_FILE="/var/log/coderstew-monitoring.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# CPU Usage
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | awk -F'%' '{print $1}')

# Memory Usage
MEMORY_USAGE=$(free | grep Mem | awk '{printf("%.2f", ($3/$2) * 100.0)}')

# Disk Usage
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')

# Log metrics
echo "[$DATE] CPU: ${CPU_USAGE}%, Memory: ${MEMORY_USAGE}%, Disk: ${DISK_USAGE}%" >> $LOG_FILE

# Alert if usage is high
if (( $(echo "$MEMORY_USAGE > 85" | bc -l) )); then
    echo "[$DATE] HIGH MEMORY USAGE: ${MEMORY_USAGE}%" >> $LOG_FILE
fi

if [[ $DISK_USAGE -gt 85 ]]; then
    echo "[$DATE] HIGH DISK USAGE: ${DISK_USAGE}%" >> $LOG_FILE
fi
```

#### Add to crontab
```bash
# Run every 5 minutes
*/5 * * * * /usr/local/bin/system-monitor.sh
```

### 2. Log Monitoring

#### Laravel Log Monitoring
```bash
#!/bin/bash
# /usr/local/bin/log-monitor.sh

LARAVEL_LOG="/path/to/coderstew-llc/storage/logs/laravel.log"
ERROR_COUNT=$(grep -c "ERROR" $LARAVEL_LOG | tail -n 100)

if [[ $ERROR_COUNT -gt 5 ]]; then
    echo "$(date): High error count detected: $ERROR_COUNT errors in last 100 lines" | mail -s "CoderStew LLC - High Error Rate" admin@coderstew.com
fi
```

## Application Performance Monitoring

### 1. Laravel Telescope (Development)
For detailed application debugging (not recommended for production):

```bash
composer require laravel/telescope --dev
php artisan telescope:install
php artisan migrate
```

### 2. Custom Performance Metrics

#### Response Time Tracking
Add to routes/web.php middleware:
```php
Route::middleware(['response.time'])->group(function () {
    // Your routes
});
```

#### Create ResponseTimeMiddleware:
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ResponseTimeMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $start = microtime(true);
        
        $response = $next($request);
        
        $duration = microtime(true) - $start;
        
        // Log slow requests (> 2 seconds)
        if ($duration > 2.0) {
            Log::warning('Slow request detected', [
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'duration' => $duration,
                'memory' => memory_get_peak_usage(true)
            ]);
        }
        
        return $response;
    }
}
```

## Database Monitoring

### 1. Query Performance
Add to AppServiceProvider:
```php
use Illuminate\Support\Facades\DB;

public function boot()
{
    if (app()->environment('production')) {
        DB::listen(function ($query) {
            if ($query->time > 1000) { // Queries longer than 1 second
                Log::warning('Slow query detected', [
                    'sql' => $query->sql,
                    'bindings' => $query->bindings,
                    'time' => $query->time
                ]);
            }
        });
    }
}
```

### 2. Database Health Checks
The built-in HealthController already includes database monitoring.

## Error Tracking

### 1. Sentry Integration (Recommended)

#### Install Sentry
```bash
composer require sentry/sentry-laravel
php artisan sentry:publish --dsn=YOUR_DSN_HERE
```

#### Configuration
Add to .env:
```env
SENTRY_LARAVEL_DSN=https://your-dsn@sentry.io/project-id
```

### 2. Custom Error Alerts

#### Email Error Notifications
Add to app/Exceptions/Handler.php:
```php
public function report(Throwable $exception)
{
    if ($this->shouldReport($exception) && app()->environment('production')) {
        $this->sendErrorNotification($exception);
    }
    
    parent::report($exception);
}

private function sendErrorNotification(Throwable $exception)
{
    Mail::raw(
        "Error occurred on CoderStew LLC website:\n\n" .
        "Message: " . $exception->getMessage() . "\n" .
        "File: " . $exception->getFile() . "\n" .
        "Line: " . $exception->getLine() . "\n" .
        "Time: " . now()->toDateTimeString(),
        function ($message) {
            $message->to('admin@coderstew.com')
                   ->subject('Website Error - CoderStew LLC');
        }
    );
}
```

## Backup Monitoring

### Backup Success Verification
```bash
#!/bin/bash
# /usr/local/bin/verify-backup.sh

BACKUP_DIR="/path/to/backups"
LATEST_BACKUP=$(ls -t $BACKUP_DIR | head -n1)
BACKUP_AGE=$(find $BACKUP_DIR/$LATEST_BACKUP -mtime +1)

if [[ ! -z "$BACKUP_AGE" ]]; then
    echo "Backup is older than 24 hours!" | mail -s "Backup Alert - CoderStew LLC" admin@coderstew.com
fi
```

## SSL Certificate Monitoring

### Certificate Expiration Check
```bash
#!/bin/bash
# /usr/local/bin/ssl-monitor.sh

DOMAIN="coderstew.com"
EXPIRY_DATE=$(echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
EXPIRY_EPOCH=$(date -d "$EXPIRY_DATE" +%s)
CURRENT_EPOCH=$(date +%s)
DAYS_UNTIL_EXPIRY=$(( ($EXPIRY_EPOCH - $CURRENT_EPOCH) / 86400 ))

if [[ $DAYS_UNTIL_EXPIRY -lt 30 ]]; then
    echo "SSL certificate expires in $DAYS_UNTIL_EXPIRY days!" | mail -s "SSL Certificate Expiring - CoderStew LLC" admin@coderstew.com
fi
```

## Dashboard Setup

### Simple Monitoring Dashboard
Create a simple HTML dashboard to display health status:

```html
<!DOCTYPE html>
<html>
<head>
    <title>CoderStew LLC - System Status</title>
    <meta http-equiv="refresh" content="30">
</head>
<body>
    <h1>System Status Dashboard</h1>
    <div id="status"></div>
    
    <script>
        fetch('/health/detailed')
            .then(response => response.json())
            .then(data => {
                document.getElementById('status').innerHTML = 
                    '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
            });
    </script>
</body>
</html>
```

## Alerting Rules

### Priority Levels
1. **Critical**: Site down, database unavailable
2. **High**: High error rates, performance issues
3. **Medium**: Resource usage warnings
4. **Low**: Maintenance reminders

### Alert Channels
1. Email: admin@coderstew.com
2. SMS: For critical alerts only
3. Slack: Team notifications (if applicable)

## Monitoring Checklist

- [ ] Uptime monitoring configured
- [ ] Health check endpoints working
- [ ] Error tracking implemented
- [ ] Performance monitoring active
- [ ] Database monitoring enabled
- [ ] SSL certificate monitoring setup
- [ ] Backup verification automated
- [ ] Log rotation configured
- [ ] Alert thresholds defined
- [ ] Contact information updated

## Maintenance

### Weekly Tasks
- Review error logs
- Check system resource usage
- Verify backup integrity
- Update monitoring thresholds if needed

### Monthly Tasks
- Review monitoring metrics
- Update alert contacts
- Test alerting system
- Optimize performance based on metrics