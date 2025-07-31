<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Thank you for contacting CoderStew LLC</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #FF9410 0%, #E6C417 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .content {
            background-color: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .summary-box {
            background-color: white;
            border: 2px solid #FF9410;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .next-steps {
            background-color: #70E000;
            background: linear-gradient(135deg, #70E000 0%, #63B1C7 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 14px;
            color: #666;
            text-align: center;
        }
        .contact-info {
            background-color: #f0f0f0;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">&lt;CoderStew /&gt;</div>
        <h1>Thank You, {{ $inquiry->name }}!</h1>
        <p>Your inquiry has been received</p>
    </div>

    <div class="content">
        <p>Hello {{ $inquiry->name }},</p>

        <p>Thank you for reaching out to CoderStew LLC! We've received your inquiry about <strong>{{ $inquiry->formatted_project_type }}</strong> and are excited to learn more about your project.</p>

        <div class="summary-box">
            <h3 style="color: #FF9410; margin-top: 0;">Your Inquiry Summary</h3>
            <p><strong>Project Type:</strong> {{ $inquiry->formatted_project_type }}</p>
            @if($inquiry->budget_range)
                <p><strong>Budget Range:</strong> {{ $inquiry->formatted_budget_range }}</p>
            @endif
            @if($inquiry->timeline)
                <p><strong>Timeline:</strong> {{ $inquiry->formatted_timeline }}</p>
            @endif
            <p><strong>Preferred Contact:</strong> {{ ucfirst($inquiry->preferred_contact) }}</p>
            <p><strong>Submitted:</strong> {{ $inquiry->created_at->format('M j, Y g:i A') }}</p>
        </div>

        <div class="next-steps">
            <h3 style="margin-top: 0;">What Happens Next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
                <li><strong>Within 24-48 hours:</strong> We'll review your project details and get back to you</li>
                <li><strong>Free Consultation:</strong> We'll schedule a call to discuss your needs in detail</li>
                <li><strong>Custom Proposal:</strong> You'll receive a tailored solution with timeline and pricing</li>
                <li><strong>Project Kickoff:</strong> Once approved, we'll start bringing your vision to life</li>
            </ul>
        </div>

        <p>We pride ourselves on clear communication and delivering quality solutions on time. Your project is important to us, and we're committed to providing the expertise you need to succeed.</p>

        @if($inquiry->timeline === 'asap')
            <div style="background-color: #fee; border-left: 4px solid #e74c3c; padding: 15px; margin: 20px 0;">
                <p style="margin: 0;"><strong>⚠️ Urgent Timeline Noted:</strong> We understand you need this ASAP. We'll prioritize your inquiry and reach out within the next few hours.</p>
            </div>
        @endif

        <div class="contact-info">
            <h4 style="margin-top: 0;">Need to reach us immediately?</h4>
            <p style="margin-bottom: 0;">
                📧 Email: <a href="mailto:contact@coderstew.com">contact@coderstew.com</a><br>
                🕒 Business Hours: Monday - Friday, 9:00 AM - 6:00 PM EST
            </p>
        </div>

        <div class="footer">
            <p><strong>CoderStew LLC</strong><br>
            Professional Programming & IT Services</p>
            
            <p style="margin-top: 15px;">
                <small>This is an automated confirmation. Please do not reply to this email. 
                If you need to update your inquiry, please send a new message through our contact form.</small>
            </p>
        </div>
    </div>
</body>
</html>