<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contact_inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('company')->nullable();
            $table->string('phone', 20)->nullable();
            $table->enum('project_type', [
                'web_application',
                'mobile_app',
                'website',
                'api_development',
                'it_support',
                'system_integration',
                'other'
            ]);
            $table->enum('budget_range', [
                'under_5k',
                '5k_10k',
                '10k_25k',
                '25k_50k',
                '50k_plus',
                'discuss'
            ])->nullable();
            $table->enum('timeline', [
                'asap',
                '1_month',
                '1_3_months',
                '3_6_months',
                '6_plus_months',
                'flexible'
            ])->nullable();
            $table->text('message');
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

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_inquiries');
    }
};
