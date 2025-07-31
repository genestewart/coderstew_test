<?php

namespace App\Http\Controllers;

use App\Models\ContactInquiry;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    /**
     * Store a new contact inquiry.
     */
    public function store(Request $request): JsonResponse
    {
        // Rate limiting
        $key = 'contact-form:' . $request->ip();
        
        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);
            
            return response()->json([
                'success' => false,
                'message' => "Too many submission attempts. Please try again in {$seconds} seconds."
            ], 429);
        }

        // Validate the request
        $validator = Validator::make($request->all(), ContactInquiry::validationRules(), ContactInquiry::validationMessages());

        if ($validator->fails()) {
            RateLimiter::hit($key, 60); // Increment rate limit on validation failure
            
            return response()->json([
                'success' => false,
                'message' => 'Please check your form data and try again.',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Create the contact inquiry
            $inquiry = ContactInquiry::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'company' => $request->input('company'),
                'phone' => $request->input('phone'),
                'project_type' => $request->input('project_type'),
                'budget_range' => $request->input('budget_range'),
                'timeline' => $request->input('timeline'),
                'message' => $request->input('message'),
                'preferred_contact' => $request->input('preferred_contact', 'email'),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'status' => 'new'
            ]);

            // Send email notifications
            $this->sendEmailNotifications($inquiry);

            // Clear rate limiting on successful submission
            RateLimiter::clear($key);

            return response()->json([
                'success' => true,
                'message' => 'Thank you for your inquiry! We\'ll get back to you within 24-48 hours.'
            ], 201);

        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Contact form submission failed', [
                'error' => $e->getMessage(),
                'email' => $request->input('email'),
                'ip' => $request->ip()
            ]);

            RateLimiter::hit($key, 60);

            return response()->json([
                'success' => false,
                'message' => 'We encountered an error processing your inquiry. Please try again or contact us directly.'
            ], 500);
        }
    }

    /**
     * Send email notifications for a new contact inquiry.
     */
    private function sendEmailNotifications(ContactInquiry $inquiry): void
    {
        try {
            // Send notification to admin
            Mail::send('emails.contact.admin-notification', compact('inquiry'), function ($message) use ($inquiry) {
                $message->to(config('mail.admin_email', 'contact@coderstew.com'))
                        ->subject('New Contact Inquiry from ' . $inquiry->name)
                        ->replyTo($inquiry->email, $inquiry->name);
            });

            // Send confirmation to user
            Mail::send('emails.contact.user-confirmation', compact('inquiry'), function ($message) use ($inquiry) {
                $message->to($inquiry->email, $inquiry->name)
                        ->subject('Thank you for contacting CoderStew LLC')
                        ->from(config('mail.from.address', 'contact@coderstew.com'), config('mail.from.name', 'CoderStew LLC'));
            });

        } catch (\Exception $e) {
            // Log email sending errors but don't fail the request
            \Log::error('Failed to send contact form emails', [
                'error' => $e->getMessage(),
                'inquiry_id' => $inquiry->id,
                'email' => $inquiry->email
            ]);
        }
    }
}