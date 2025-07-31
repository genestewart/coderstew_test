# SSL Certificate Setup for CoderStew LLC

## Overview
This guide covers SSL certificate setup for the CoderStew LLC website on Hostinger or similar hosting providers.

## Option 1: Hostinger Free SSL (Recommended)

### Step 1: Enable SSL in Hostinger Control Panel
1. Log into your Hostinger control panel
2. Navigate to SSL Certificates section
3. Select your domain (coderstew.com)
4. Click "Enable Free SSL"
5. Wait for certificate generation (usually 5-15 minutes)

### Step 2: Verify SSL Installation
```bash
# Test SSL certificate
curl -I https://coderstew.com

# Check certificate details
openssl s_client -connect coderstew.com:443 -servername coderstew.com
```

### Step 3: Update Laravel Configuration
Ensure these settings in `.env`:
```env
APP_URL=https://coderstew.com
FORCE_HTTPS=true
SECURE_HEADERS=true
SESSION_SECURE_COOKIE=true
```

## Option 2: Let's Encrypt (For VPS/Dedicated Servers)

### Install Certbot
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install certbot python3-certbot-apache

# CentOS/RHEL
sudo yum install certbot python3-certbot-apache
```

### Generate Certificate
```bash
# For Apache
sudo certbot --apache -d coderstew.com -d www.coderstew.com

# For Nginx
sudo certbot --nginx -d coderstew.com -d www.coderstew.com
```

### Auto-renewal Setup
```bash
# Add cron job for auto-renewal
sudo crontab -e

# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## Apache Virtual Host Configuration

### HTTP to HTTPS Redirect
Create/update `.htaccess` in public directory:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Force HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    # Remove public from URL
    RewriteCond %{REQUEST_URI} !^/public/
    RewriteRule ^(.*)$ /public/$1 [L]
</IfModule>
```

### SSL Virtual Host
```apache
<VirtualHost *:443>
    ServerName coderstew.com
    ServerAlias www.coderstew.com
    DocumentRoot /path/to/coderstew-llc/public
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    SSLCertificateChainFile /path/to/chain.crt
    
    # Security headers
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    
    # Cache control
    <FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 month"
        Header append Cache-Control "public"
    </FilesMatch>
    
    ErrorLog ${APACHE_LOG_DIR}/coderstew_ssl_error.log
    CustomLog ${APACHE_LOG_DIR}/coderstew_ssl_access.log combined
</VirtualHost>
```

## Nginx Configuration

### Server Block
```nginx
server {
    listen 80;
    server_name coderstew.com www.coderstew.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name coderstew.com www.coderstew.com;
    root /path/to/coderstew-llc/public;
    
    index index.php;
    
    # SSL Configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options DENY always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Laravel configuration
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
    
    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }
}
```

## Security Best Practices

### 1. Update Laravel Security Configuration
```php
// config/session.php
'secure' => env('SESSION_SECURE_COOKIE', true),
'same_site' => 'lax',

// Add to .env
SESSION_SECURE_COOKIE=true
SANCTUM_STATEFUL_DOMAINS=coderstew.com,www.coderstew.com
```

### 2. Enable Security Headers Middleware
The application already includes security headers in the `SEOMiddleware`.

### 3. Update robots.txt for HTTPS
```txt
# robots.txt
Sitemap: https://coderstew.com/sitemap.xml
```

## Testing SSL Installation

### 1. SSL Labs Test
Visit: https://www.ssllabs.com/ssltest/analyze.html?d=coderstew.com

### 2. Security Headers Test
Visit: https://securityheaders.com/?q=coderstew.com

### 3. Manual Verification
```bash
# Check certificate expiration
echo | openssl s_client -servername coderstew.com -connect coderstew.com:443 2>/dev/null | openssl x509 -noout -dates

# Test HTTPS redirect
curl -I http://coderstew.com

# Verify security headers
curl -I https://coderstew.com
```

## Troubleshooting

### Common Issues
1. **Mixed Content**: Ensure all resources load over HTTPS
2. **Redirect Loops**: Check .htaccess and server configuration
3. **Certificate Errors**: Verify certificate chain and validity

### Debug Commands
```bash
# Check SSL certificate
openssl x509 -in certificate.crt -text -noout

# Verify certificate chain
openssl verify -CAfile chain.crt certificate.crt

# Test specific cipher
openssl s_client -cipher 'ECDHE-RSA-AES256-GCM-SHA384' -connect coderstew.com:443
```

## Maintenance

### Certificate Renewal
- **Hostinger Free SSL**: Auto-renewed
- **Let's Encrypt**: Auto-renewed via cron job
- **Paid SSL**: Manual renewal required

### Monitoring
- Set up monitoring for certificate expiration
- Monitor SSL Labs grade
- Check security headers regularly