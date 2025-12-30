# Email Setup Guide for Tashjeel Hosting

This guide explains how to configure email functionality for the Wish Group website when hosted on Tashjeel.

## Overview

The website now includes automatic email collection and auto-reply functionality for:
1. **Career Applications** - When users apply for positions
2. **Contact Inquiries** - When users submit the contact form
3. **Newsletter Subscriptions** - When users subscribe via the footer
4. **Chatbot Inquiries** - When users submit inquiries through the chatbot

All submissions will:
- Send an email notification to the appropriate company email address
- Automatically send a confirmation email to the customer

## Backend Endpoints

The following endpoints have been added/updated:

- `POST /careers/apply` - Career application submission
- `POST /contact/inquiry` - Contact form inquiry
- `POST /newsletter/subscribe` - Newsletter subscription (updated with auto-reply)
- `POST /chatbot/inquiry` - Chatbot inquiry (updated with auto-reply)

## Configuration

### Step 1: Configure SMTP Settings

1. Navigate to the `server/` directory
2. Copy `env.template` to `.env`:
   ```bash
   cp env.template .env
   ```

3. Edit the `.env` file with your SMTP credentials:

```env
# SMTP Configuration
SMTP_HOST=smtp.your-domain.com
SMTP_PORT=587
SMTP_USER=noreply@wishgroup.ae
SMTP_PASS=your-email-password
EMAIL_FROM=noreply@wishgroup.ae

# Email Recipients
EMAIL_TO=careers@wishgroup.ae
CAREERS_EMAIL=careers@wishgroup.ae
CONTACT_EMAIL=info@wishgroup.ae
```

### Step 2: Tashjeel SMTP Settings

For Tashjeel hosting, you'll need to use your domain's email SMTP settings. Common configurations:

**Option 1: Using Tashjeel's Email Service**
- SMTP Host: `mail.tashjeel.com` or `smtp.your-domain.com`
- SMTP Port: `587` (TLS) or `465` (SSL)
- SMTP User: Your full email address (e.g., `noreply@wishgroup.ae`)
- SMTP Pass: Your email account password

**Option 2: Using cPanel Email**
- SMTP Host: `mail.wishgroup.ae` (your domain)
- SMTP Port: `587` or `465`
- SMTP User: Full email address
- SMTP Pass: Email account password

**Option 3: Using Gmail/Google Workspace**
- SMTP Host: `smtp.gmail.com`
- SMTP Port: `587`
- SMTP User: Your Gmail address
- SMTP Pass: App-specific password (not regular password)

### Step 3: Test Email Configuration

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```

2. Test the endpoints using curl or Postman:
   ```bash
   curl -X POST http://localhost:5001/contact/inquiry \
     -H "Content-Type: application/json" \
     -d '{
       "fullName": "Test User",
       "email": "test@example.com",
       "phone": "+971501234567",
       "message": "Test inquiry"
     }'
   ```

3. Check both:
   - Company email inbox (should receive inquiry notification)
   - Customer email inbox (should receive auto-reply)

## Email Templates

### Career Application Auto-Reply
- Subject: "Thank You for Your Application - Wish Group"
- Includes: Personalized greeting, position applied for, next steps

### Contact Inquiry Auto-Reply
- Subject: "Thank You for Contacting Wish Group"
- Includes: Personalized greeting, response timeline (24-48 hours), contact information

### Newsletter Subscription Auto-Reply
- Subject: "Thank You for Contacting Wish Group"
- Includes: Confirmation message, contact information

### Chatbot Inquiry Auto-Reply
- Subject: "Thank You for Contacting Wish Group"
- Includes: Personalized greeting, response timeline, contact information

## Frontend Configuration

The frontend automatically uses the API base URL from environment variables:

```env
VITE_API_URL=https://your-domain.com/api
```

If not set, it defaults to `http://localhost:5001` for development.

## Troubleshooting

### Emails Not Sending

1. **Check SMTP Credentials**
   - Verify username and password are correct
   - Ensure email account exists and is active

2. **Check SMTP Port**
   - Port 587 (TLS) is most common
   - Port 465 (SSL) requires `secure: true` in transporter config
   - Port 25 is often blocked by hosting providers

3. **Check Firewall/Security**
   - Ensure Tashjeel allows outbound SMTP connections
   - Some hosting providers block SMTP on certain ports

4. **Check Server Logs**
   - Review backend server console for error messages
   - Check for authentication failures or connection timeouts

### Auto-Reply Not Working

- Verify `EMAIL_FROM` is set correctly
- Ensure the "from" email address is authorized to send emails
- Check spam/junk folders for auto-reply emails

### Common Error Messages

- **"Invalid login"**: Check SMTP_USER and SMTP_PASS
- **"Connection timeout"**: Check SMTP_HOST and SMTP_PORT
- **"Authentication failed"**: Verify email credentials
- **"Relay access denied"**: SMTP server requires authentication

## Production Deployment

When deploying to Tashjeel:

1. Set environment variables in your hosting control panel
2. Ensure the backend server is running and accessible
3. Update `VITE_API_URL` in frontend build to point to your production API
4. Test all email endpoints after deployment
5. Monitor server logs for any email-related errors

## Security Notes

- Never commit `.env` files to version control
- Use strong passwords for email accounts
- Consider using app-specific passwords for Gmail/Google Workspace
- Regularly rotate email account passwords
- Monitor email sending for unusual activity

## Support

For Tashjeel-specific SMTP configuration, contact Tashjeel support with:
- Your domain name
- Email account details
- Required SMTP settings

For application-specific issues, check server logs and verify all environment variables are set correctly.

