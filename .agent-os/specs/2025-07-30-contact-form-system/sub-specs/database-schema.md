# Database Schema

This is the database schema implementation for the spec detailed in @.agent-os/specs/2025-07-30-contact-form-system/spec.md

> Created: 2025-07-30
> Version: 1.0.0

## Database Changes

### New Tables

#### contact_inquiries
Primary table for storing all contact form submissions

### New Columns

**contact_inquiries table:**
- `id` - Primary key (unsigned big integer, auto-increment)
- `full_name` - Varchar(255), not null
- `email` - Varchar(255), not null
- `company` - Varchar(255), nullable
- `phone` - Varchar(20), nullable
- `project_type` - Enum('web_development', 'mobile_app', 'it_support', 'consultation', 'other'), not null
- `budget_range` - Enum('1k_5k', '5k_15k', '15k_50k', '50k_plus', 'consultation_only'), not null
- `timeline` - Enum('asap', '1_3_months', '3_6_months', '6_plus_months', 'flexible'), not null
- `project_description` - Text, not null
- `preferred_contact` - Enum('email', 'phone', 'either'), default 'email'
- `ip_address` - Varchar(45), nullable (for rate limiting)
- `user_agent` - Text, nullable (for analytics)
- `status` - Enum('new', 'contacted', 'in_progress', 'completed', 'archived'), default 'new'
- `admin_notes` - Text, nullable (for internal follow-up notes)
- `created_at` - Timestamp, not null
- `updated_at` - Timestamp, not null
- `deleted_at` - Timestamp, nullable (soft deletes)

### Indexes and Constraints

#### Primary Indexes
- Primary key on `id`
- Index on `email` for quick lookup
- Index on `created_at` for chronological sorting
- Index on `status` for admin filtering
- Composite index on `ip_address` and `created_at` for rate limiting

#### Foreign Key Relationships
- No foreign key relationships required for initial implementation

#### Constraints
- Email validation at database level using CHECK constraint
- Project description minimum length validation (20 characters)
- Budget range and timeline enums constrained to specified values

## Migration Specification

### Laravel Migration (create_contact_inquiries_table.php)

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('contact_inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email');
            $table->string('company')->nullable();
            $table->string('phone', 20)->nullable();
            $table->enum('project_type', [
                'web_development',
                'mobile_app', 
                'it_support',
                'consultation',
                'other'
            ]);
            $table->enum('budget_range', [
                '1k_5k',
                '5k_15k', 
                '15k_50k',
                '50k_plus',
                'consultation_only'
            ]);
            $table->enum('timeline', [
                'asap',
                '1_3_months',
                '3_6_months', 
                '6_plus_months',
                'flexible'
            ]);
            $table->text('project_description');
            $table->enum('preferred_contact', ['email', 'phone', 'either'])->default('email');
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->enum('status', [
                'new',
                'contacted', 
                'in_progress',
                'completed',
                'archived'
            ])->default('new');
            $table->text('admin_notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('email');
            $table->index('created_at');
            $table->index('status');
            $table->index(['ip_address', 'created_at']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('contact_inquiries');
    }
};
```

## Rationale

### Table Design Decisions

**Single Table Approach**: Using one `contact_inquiries` table rather than separate tables for different inquiry types because all contact forms will have the same basic structure and requirements. This simplifies queries and maintenance.

**Enum Fields**: Using enum types for `project_type`, `budget_range`, `timeline`, `preferred_contact`, and `status` to ensure data consistency and enable efficient filtering. These fields have a limited, known set of values that are unlikely to change frequently.

**Soft Deletes**: Implementing soft deletes to maintain inquiry history for business analytics and to prevent accidental data loss. Contact inquiries are valuable business data that should be preserved.

**IP Address Tracking**: Storing IP addresses for rate limiting and spam prevention, essential for a public-facing contact form.

**Status Tracking**: Including status field to enable inquiry management workflow for business follow-up processes.

### Performance Considerations

**Strategic Indexing**: Indexes on commonly queried fields (email, created_at, status) and composite index for rate limiting queries will ensure fast query performance even as the inquiry volume grows.

**Text Field Optimization**: Using `text` type for project descriptions to accommodate detailed inquiries while keeping other fields appropriately sized.

### Data Integrity

**Required Fields**: All essential business fields are marked as non-null to ensure complete inquiry data.

**Validation Constraints**: Database-level constraints complement application-level validation for robust data integrity.

**Audit Trail**: Timestamps and soft deletes provide complete audit trail for business and legal requirements.