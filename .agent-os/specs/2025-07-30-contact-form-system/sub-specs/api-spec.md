# API Specification

This is the API specification for the spec detailed in @.agent-os/specs/2025-07-30-contact-form-system/spec.md

> Created: 2025-07-30
> Version: 1.0.0

## Endpoints

### POST /contact

**Purpose:** Submit a new contact form inquiry with full validation and email processing
**Parameters:** 
- `full_name` (string, required): Client's full name (2-255 characters)
- `email` (string, required): Valid email address
- `company` (string, optional): Company or organization name (max 255 characters)
- `phone` (string, optional): Phone number in any format (max 20 characters)
- `project_type` (string, required): One of 'web_development', 'mobile_app', 'it_support', 'consultation', 'other'
- `budget_range` (string, required): One of '1k_5k', '5k_15k', '15k_50k', '50k_plus', 'consultation_only'
- `timeline` (string, required): One of 'asap', '1_3_months', '3_6_months', '6_plus_months', 'flexible'
- `project_description` (string, required): Detailed project description (20-2000 characters)
- `preferred_contact` (string, optional): One of 'email', 'phone', 'either' (defaults to 'email')

**Response (Success - 201 Created):**
```json
{
    "success": true,
    "message": "Thank you for your inquiry! We'll be in touch within 24-48 hours.",
    "inquiry_id": "uuid-string",
    "redirect_url": "/contact/thank-you"
}
```

**Response (Validation Error - 422 Unprocessable Entity):**
```json
{
    "success": false,
    "message": "Please correct the errors below.",
    "errors": {
        "email": ["The email field must be a valid email address."],
        "project_description": ["The project description must be at least 20 characters."]
    }
}
```

**Response (Rate Limited - 429 Too Many Requests):**
```json
{
    "success": false,
    "message": "Too many submission attempts. Please try again later.",
    "retry_after": 3600
}
```

**Errors:** 
- 422: Validation errors for invalid or missing required fields
- 429: Rate limiting exceeded (max 3 submissions per IP per hour)
- 500: Server error during processing or email sending

### GET /contact

**Purpose:** Display the contact form page with CSRF token
**Parameters:** None
**Response:** HTML page with contact form and necessary Vue.js components
**Errors:** 
- 500: Server error loading page

### GET /contact/thank-you

**Purpose:** Display thank you page after successful form submission
**Parameters:** None
**Response:** HTML page confirming successful submission with next steps
**Errors:** 
- 500: Server error loading page

## Controllers

### ContactController

#### ContactController@create
**Action:** Display contact form page
**HTTP Method:** GET
**Route:** /contact
**Business Logic:** 
- Render contact form view with CSRF token
- Pass any flash messages for user feedback
- Include necessary JavaScript and CSS assets

**Error Handling:**
- Log any template rendering errors
- Return 500 error page if view cannot be rendered

#### ContactController@store  
**Action:** Process contact form submission
**HTTP Method:** POST
**Route:** /contact
**Business Logic:**
1. Validate all form inputs using ContactRequest validation rules
2. Check rate limiting based on IP address (max 3 per hour)  
3. Store inquiry in database with IP address and user agent
4. Dispatch email notifications to admin and user
5. Return JSON response with success message and redirect URL

**Error Handling:**
- Return validation errors as JSON with 422 status
- Return rate limiting message with 429 status  
- Log email sending failures and return 500 error
- Handle database errors gracefully with user-friendly messages

#### ContactController@thankYou
**Action:** Display thank you page
**HTTP Method:** GET  
**Route:** /contact/thank-you
**Business Logic:**
- Render thank you page with success message
- Include contact information for urgent inquiries
- Provide estimated response timeframe

**Error Handling:**
- Return 500 error page if view cannot be rendered

## Request Validation

### ContactRequest Validation Rules

```php
public function rules()
{
    return [
        'full_name' => 'required|string|min:2|max:255',
        'email' => 'required|email|max:255',
        'company' => 'nullable|string|max:255',
        'phone' => 'nullable|string|max:20',
        'project_type' => 'required|in:web_development,mobile_app,it_support,consultation,other',
        'budget_range' => 'required|in:1k_5k,5k_15k,15k_50k,50k_plus,consultation_only',
        'timeline' => 'required|in:asap,1_3_months,3_6_months,6_plus_months,flexible',
        'project_description' => 'required|string|min:20|max:2000',
        'preferred_contact' => 'nullable|in:email,phone,either'
    ];
}

public function messages()
{
    return [
        'full_name.required' => 'Please provide your full name.',
        'full_name.min' => 'Name must be at least 2 characters.',
        'email.required' => 'Email address is required.',
        'email.email' => 'Please provide a valid email address.',
        'project_type.required' => 'Please select a project type.',
        'project_type.in' => 'Please select a valid project type.',
        'budget_range.required' => 'Please select a budget range.',
        'timeline.required' => 'Please select a project timeline.',
        'project_description.required' => 'Please describe your project.',
        'project_description.min' => 'Project description must be at least 20 characters.',
        'project_description.max' => 'Project description cannot exceed 2000 characters.'
    ];
}
```

## Rate Limiting Implementation

### Middleware: ContactRateLimit

```php
public function handle($request, Closure $next)
{
    $ip = $request->ip();
    $key = 'contact_form_' . $ip;
    $maxAttempts = 3;
    $decayMinutes = 60;
    
    if (RateLimiter::tooManyAttempts($key, $maxAttempts)) {
        $seconds = RateLimiter::availableIn($key);
        return response()->json([
            'success' => false,
            'message' => 'Too many submission attempts. Please try again later.',
            'retry_after' => $seconds
        ], 429);
    }
    
    RateLimiter::hit($key, $decayMinutes * 60);
    
    return $next($request);
}
```

## Email Job Integration

### ContactInquiryReceived Job

**Purpose:** Handle email notifications asynchronously for better performance
**Queue:** Default queue with retry logic
**Functionality:**
- Send admin notification email with inquiry details
- Send user confirmation email with professional acknowledgment
- Log email sending status for debugging
- Handle email failures gracefully with retry logic