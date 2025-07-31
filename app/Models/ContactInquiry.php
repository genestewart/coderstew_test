<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactInquiry extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'company',
        'phone',
        'project_type',
        'budget_range',
        'timeline',
        'message',
        'preferred_contact',
        'ip_address',
        'user_agent',
        'status'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Get the validation rules for contact inquiry.
     *
     * @return array<string, string>
     */
    public static function validationRules(): array
    {
        return [
            'name' => 'required|string|min:2|max:255',
            'email' => 'required|email|max:255',
            'company' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'project_type' => 'required|in:web_application,mobile_app,website,api_development,it_support,system_integration,other',
            'budget_range' => 'nullable|in:under_5k,5k_10k,10k_25k,25k_50k,50k_plus,discuss',
            'timeline' => 'nullable|in:asap,1_month,1_3_months,3_6_months,6_plus_months,flexible',
            'message' => 'required|string|min:20|max:2000',
            'preferred_contact' => 'nullable|in:email,phone,either',
        ];
    }

    /**
     * Get the validation messages for contact inquiry.
     *
     * @return array<string, string>
     */
    public static function validationMessages(): array
    {
        return [
            'name.required' => 'Full name is required.',
            'name.min' => 'Name must be at least 2 characters.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'project_type.required' => 'Please select a project type.',
            'project_type.in' => 'Please select a valid project type.',
            'message.required' => 'Project description is required.',
            'message.min' => 'Project description must be at least 20 characters.',
            'message.max' => 'Project description cannot exceed 2000 characters.',
        ];
    }

    /**
     * Scope a query to only include inquiries with a specific status.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $status
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope a query to only include recent inquiries.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $days
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeRecent($query, $days = 30)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    /**
     * Get the formatted project type for display.
     *
     * @return string
     */
    public function getFormattedProjectTypeAttribute(): string
    {
        return match($this->project_type) {
            'web_application' => 'Web Application',
            'mobile_app' => 'Mobile App',
            'website' => 'Business Website',
            'api_development' => 'API Development',
            'it_support' => 'IT Support & Consultation',
            'system_integration' => 'System Integration',
            'other' => 'Other',
            default => ucfirst(str_replace('_', ' ', $this->project_type))
        };
    }

    /**
     * Get the formatted budget range for display.
     *
     * @return string|null
     */
    public function getFormattedBudgetRangeAttribute(): ?string
    {
        if (!$this->budget_range) {
            return null;
        }

        return match($this->budget_range) {
            'under_5k' => 'Under $5,000',
            '5k_10k' => '$5,000 - $10,000',
            '10k_25k' => '$10,000 - $25,000',
            '25k_50k' => '$25,000 - $50,000',
            '50k_plus' => '$50,000+',
            'discuss' => 'Let\'s discuss',
            default => ucfirst(str_replace('_', ' ', $this->budget_range))
        };
    }

    /**
     * Get the formatted timeline for display.
     *
     * @return string|null
     */
    public function getFormattedTimelineAttribute(): ?string
    {
        if (!$this->timeline) {
            return null;
        }

        return match($this->timeline) {
            'asap' => 'ASAP (Rush job)',
            '1_month' => 'Within 1 month',
            '1_3_months' => '1-3 months',
            '3_6_months' => '3-6 months',
            '6_plus_months' => '6+ months',
            'flexible' => 'Flexible',
            default => ucfirst(str_replace('_', ' ', $this->timeline))
        };
    }
}
