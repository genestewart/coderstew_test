#!/bin/bash

# CoderStew LLC Production Deployment Script
# This script handles the deployment process to Hostinger or similar hosting

set -e

echo "🚀 Starting CoderStew LLC deployment..."

# Configuration
PROJECT_NAME="coderstew-llc"
BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
LOG_FILE="deployment.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a $LOG_FILE
    exit 1
}

warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a $LOG_FILE
}

# Check if we're in the right directory
if [ ! -f "artisan" ]; then
    error "artisan file not found. Please run this script from the Laravel project root."
fi

# Create backup directory
mkdir -p $BACKUP_DIR

log "Starting deployment of $PROJECT_NAME"

# 1. Backup current database (if exists)
if [ -f ".env" ]; then
    log "Creating database backup..."
    php artisan db:dump --path="$BACKUP_DIR/database_backup.sql" || warn "Database backup failed"
fi

# 2. Backup current files
log "Creating file backup..."
tar -czf "$BACKUP_DIR/files_backup.tar.gz" --exclude=node_modules --exclude=.git --exclude=storage/logs/* --exclude=storage/framework/cache/* . || warn "File backup failed"

# 3. Update application code (if using git)
if [ -d ".git" ]; then
    log "Pulling latest code from repository..."
    git fetch origin
    git reset --hard origin/main
fi

# 4. Install/update Composer dependencies
log "Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

# 5. Install/update NPM dependencies and build assets
log "Installing NPM dependencies..."
npm ci --only=production

log "Building production assets..."
npm run build

# 6. Set up environment
if [ ! -f ".env" ]; then
    log "Setting up environment configuration..."
    cp .env.production .env
    warn "Please update .env file with your production settings before continuing!"
    read -p "Press enter after updating .env file..."
fi

# 7. Generate application key if needed
if ! grep -q "APP_KEY=base64:" .env; then
    log "Generating application key..."
    php artisan key:generate --force
fi

# 8. Run database migrations
log "Running database migrations..."
php artisan migrate --force

# 9. Clear and cache configuration
log "Optimizing application..."
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 10. Set proper permissions
log "Setting file permissions..."
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache || warn "Could not change ownership (may require sudo)"

# 11. Clear old caches
log "Clearing application cache..."
php artisan cache:clear
php artisan view:clear
php artisan route:clear

# 12. Queue restart (if using queues)
log "Restarting queue workers..."
php artisan queue:restart || warn "Queue restart failed (may not be configured)"

# 13. Create symbolic link for storage (if needed)
if [ ! -L "public/storage" ]; then
    log "Creating storage symbolic link..."
    php artisan storage:link
fi

# 14. Test application
log "Testing application..."
if curl -f -s -o /dev/null "$APP_URL" 2>/dev/null; then
    log "✅ Application is responding successfully!"
else
    warn "Application may not be responding correctly. Please check manually."
fi

# 15. Cleanup old backups (keep last 5)
log "Cleaning up old backups..."
find backups -maxdepth 1 -type d -name "20*" | sort -r | tail -n +6 | xargs rm -rf || warn "Backup cleanup failed"

log "🎉 Deployment completed successfully!"
log "Backup created at: $BACKUP_DIR"
log "Deployment log: $LOG_FILE"

echo ""
echo "Next steps:"
echo "1. Verify the website is working: $APP_URL"
echo "2. Check error logs if any issues: storage/logs/laravel.log"
echo "3. Set up SSL certificate if not already configured"
echo "4. Configure monitoring and backup automation"