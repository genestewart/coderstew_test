<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Contact Inquiry</title>
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
            background-color: #FF9410;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background-color: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .field {
            margin-bottom: 15px;
        }
        .field-label {
            font-weight: bold;
            color: #FF9410;
            margin-bottom: 5px;
        }
        .field-value {
            background-color: white;
            padding: 10px;
            border-radius: 4px;
            border-left: 4px solid #FF9410;
        }
        .urgent {
            background-color: #fee;
            border-left-color: #e74c3c;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>New Contact Inquiry</h1>
        <p>From {{ $inquiry->name }}</p>
    </div>

    <div class="content">
        <div class="field">
            <div class="field-label">Contact Information</div>
            <div class="field-value">
                <strong>Name:</strong> {{ $inquiry->name }}<br>
                <strong>Email:</strong> <a href="mailto:{{ $inquiry->email }}">{{ $inquiry->email }}</a><br>
                @if($inquiry->company)
                    <strong>Company:</strong> {{ $inquiry->company }}<br>
                @endif
                @if($inquiry->phone)
                    <strong>Phone:</strong> <a href="tel:{{ $inquiry->phone }}">{{ $inquiry->phone }}</a><br>
                @endif
                <strong>Preferred Contact:</strong> {{ ucfirst($inquiry->preferred_contact) }}
            </div>
        </div>

        <div class="field">
            <div class="field-label">Project Details</div>
            <div class="field-value{{ $inquiry->timeline === 'asap' ? ' urgent' : '' }}">
                <strong>Project Type:</strong> {{ $inquiry->formatted_project_type }}<br>
                @if($inquiry->budget_range)
                    <strong>Budget Range:</strong> {{ $inquiry->formatted_budget_range }}<br>
                @endif
                @if($inquiry->timeline)
                    <strong>Timeline:</strong> {{ $inquiry->formatted_timeline }}
                    @if($inquiry->timeline === 'asap')
                        <span style="color: #e74c3c; font-weight: bold;"> ⚠️ URGENT</span>
                    @endif
                    <br>
                @endif
            </div>
        </div>

        <div class="field">
            <div class="field-label">Project Description</div>
            <div class="field-value">
                {{ $inquiry->message }}
            </div>
        </div>

        <div class="field">
            <div class="field-label">Submission Details</div>
            <div class="field-value">
                <strong>Submitted:</strong> {{ $inquiry->created_at->format('M j, Y g:i A T') }}<br>
                <strong>IP Address:</strong> {{ $inquiry->ip_address }}<br>
                <strong>Status:</strong> {{ ucfirst($inquiry->status) }}
            </div>
        </div>

        <div class="footer">
            <p><strong>Next Steps:</strong></p>
            <ul>
                <li>Reply to this email to respond directly to {{ $inquiry->name }}</li>
                <li>Update the inquiry status in the admin panel</li>
                <li>Schedule a follow-up call if requested</li>
            </ul>
            
            <p style="margin-top: 20px;">
                <small>This inquiry was submitted through the CoderStew LLC contact form.</small>
            </p>
        </div>
    </div>
</body>
</html>