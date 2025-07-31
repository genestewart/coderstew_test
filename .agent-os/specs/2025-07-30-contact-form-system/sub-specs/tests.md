# Tests Specification

This is the tests coverage details for the spec detailed in @.agent-os/specs/2025-07-30-contact-form-system/spec.md

> Created: 2025-07-30
> Version: 1.0.0

## Test Coverage

### Unit Tests

**ContactInquiry Model**
- Test model relationships and attribute casting
- Test validation rules at model level
- Test scope methods for filtering inquiries by status
- Test accessor/mutator methods for formatting display data
- Test soft delete functionality

**ContactRequest Validation**
- Test all validation rules with valid data
- Test validation failures for each required field
- Test email format validation with various invalid formats
- Test string length validations for all text fields
- Test enum validations for select field options
- Test custom error message translations

**ContactRateLimit Middleware**
- Test rate limiting allows requests under threshold
- Test rate limiting blocks requests over threshold
- Test rate limiting resets after time decay
- Test IP address extraction and key generation
- Test proper HTTP status codes and error messages

### Integration Tests

**Contact Form Submission Flow**
- Test successful form submission with valid data saves to database
- Test successful submission triggers admin notification email
- Test successful submission triggers user confirmation email
- Test successful submission returns proper JSON response
- Test successful submission redirects to thank you page

**Contact Form Validation**
- Test form submission with missing required fields returns validation errors
- Test form submission with invalid email format returns email error
- Test form submission with invalid enum values returns appropriate errors
- Test form submission exceeding character limits returns length errors
- Test CSRF token validation prevents unauthorized submissions

**Email System Integration**
- Test admin notification email contains all submitted form data
- Test user confirmation email uses professional template
- Test email queue processing handles failures gracefully
- Test email sending respects environment configuration settings

**Rate Limiting Integration**
- Test multiple rapid submissions from same IP get rate limited
- Test rate limiting allows submissions after cooldown period
- Test rate limiting logs blocked attempts for security monitoring

### Feature Tests

**Complete Contact Form Workflow**
- Test user can visit contact page and see form with all fields
- Test user can fill out form with valid data and submit successfully
- Test user sees appropriate success message after submission
- Test user receives confirmation email after successful submission
- Test admin receives notification email with inquiry details
- Test form displays validation errors for invalid submissions
- Test form prevents spam with honeypot and rate limiting

**Contact Page Navigation**
- Test contact page loads correctly with proper form elements
- Test thank you page displays after successful submission
- Test form maintains user input after validation errors
- Test responsive design works on mobile and desktop viewports

**Admin Inquiry Management**
- Test inquiries are stored in database with proper data structure
- Test inquiry status can be updated for follow-up tracking
- Test soft delete functionality preserves inquiry history
- Test admin can view inquiry details and add follow-up notes

### Mocking Requirements

**Email Service Mocking**
- **Laravel Mail**: Mock Mail facade to prevent actual email sending during tests
- **Queue System**: Mock queue jobs to test email dispatch without queue processing
- **SMTP Service**: Mock external SMTP service calls for integration tests

**Rate Limiting Service**
- **RateLimiter Facade**: Mock rate limiting service to test different scenarios
- **Cache Backend**: Mock cache operations for rate limiting key storage

**Database Interactions**
- **Eloquent Queries**: Use database transactions for test isolation
- **Model Factories**: Create ContactInquiry factory for generating test data

**External Services**
- **IP Address Detection**: Mock request IP for rate limiting tests
- **User Agent Parsing**: Mock user agent strings for analytics data

### Test Data Setup

**Valid Form Data**
```php
[
    'full_name' => 'John Smith',
    'email' => 'john@example.com',
    'company' => 'ABC Corp',
    'phone' => '555-123-4567',
    'project_type' => 'web_development',
    'budget_range' => '15k_50k',
    'timeline' => '3_6_months',
    'project_description' => 'We need a custom e-commerce platform for our business.',
    'preferred_contact' => 'email'
]
```

**Invalid Form Data Scenarios**
- Missing required fields (name, email, project_type, etc.)
- Invalid email formats ('invalid-email', 'user@', '@domain.com')
- Invalid enum values ('invalid_project_type', 'wrong_budget')
- Too short project description (< 20 characters)
- Too long project description (> 2000 characters)
- SQL injection attempts in text fields

**Rate Limiting Test Scenarios**
- Single IP making 3 requests within hour (should succeed)
- Single IP making 4 requests within hour (4th should fail)
- Multiple IPs making requests (should not interfere)
- Requests after rate limit cooldown period (should succeed)

### Performance Testing

**Form Submission Performance**
- Test form submission response time under normal load
- Test database insert performance with large volumes
- Test email queue processing efficiency
- Test rate limiting performance impact

**Memory and Resource Usage**
- Test form validation memory usage with large form data
- Test email template rendering resource consumption
- Test database connection pooling during high volume