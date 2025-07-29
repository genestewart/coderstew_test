# Technical Stack

> Last Updated: 2025-07-29
> Version: 1.0.0

## Core Technologies

### Application Framework
- **Framework:** Laravel
- **Version:** 11.0+
- **Language:** PHP 8.2+

### Database
- **Primary:** SQLite (for development)
- **Version:** Latest
- **ORM:** Eloquent

## Frontend Stack

### JavaScript Framework
- **Framework:** Vue.js
- **Version:** 3.0+
- **Build Tool:** Vite

### Import Strategy
- **Strategy:** ES modules
- **Package Manager:** npm
- **Node Version:** 22 LTS

### CSS Framework
- **Framework:** TailwindCSS
- **Version:** 4.0+
- **PostCSS:** Yes

### UI Components
- **Library:** Custom components with Tailwind
- **Version:** Latest
- **Installation:** Via npm

## Brand Identity

### Color Palette
- **Primary Orange:** #FF9410
- **Golden Yellow:** #E6C417  
- **Bright Green:** #70E000
- **Sky Blue:** #63B1C7
- **Dark Gray:** #171717

### Fonts
- **Provider:** Google Fonts
- **Loading Strategy:** Self-hosted for performance

### Icons
- **Library:** Lucide
- **Implementation:** Vue components

### Logo
- **Format:** SVG
- **Location:** public/assets/ (to be uploaded)

## Infrastructure

### Application Hosting
- **Platform:** Hostinger
- **Service:** VPS / Shared Hosting
- **Region:** Based on user base location

### Database Hosting
- **Provider:** Hostinger
- **Service:** MySQL Database (production)
- **Backups:** Regular automated backups

### Asset Storage
- **Provider:** Hostinger
- **Service:** File storage / CDN
- **Access:** Standard file serving

## Deployment

### CI/CD Pipeline
- **Platform:** GitHub Actions (or Hostinger Git deployment)
- **Trigger:** Push to main/staging branches
- **Tests:** Run before deployment

### Environments
- **Production:** main branch
- **Staging:** staging branch
- **Development:** Local SQLite database

## Form Processing

### Contact Form
- **Backend:** Laravel validation and mail system
- **Frontend:** Vue.js reactive forms
- **Validation:** Client-side and server-side
- **Email Service:** Laravel Mail (SMTP configuration)