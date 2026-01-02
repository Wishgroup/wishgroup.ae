# Email Configuration Guide

## Quick Setup

1. **Create `.env` file** in the `server/` directory:
   ```bash
   cd server
   cp env.template .env
   ```

2. **Edit `.env` file** with your email credentials:
   ```env
   # Email Configuration - Secure SSL/TLS Settings
   SMTP_HOST=mail.wishgroup.ae
   SMTP_PORT=465
   SMTP_USER=info@wishgroup.ae
   SMTP_PASS=YourEmailPasswordHere
   EMAIL_FROM=info@wishgroup.ae
   EMAIL_TO=info@wishgroup.ae
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Test the email connection**:
   - Visit: `http://localhost:5001/email/test`
   - Or use curl:
     ```bash
     curl http://localhost:5001/email/test
     ```

## Email Server Settings (from cPanel)

Based on your cPanel configuration:

- **Incoming Server:** `mail.wishgroup.ae`
  - IMAP Port: 993
  - POP3 Port: 995
- **Outgoing Server:** `mail.wishgroup.ae`
  - SMTP Port: 465 (SSL/TLS - Recommended)
  - Alternative: Port 587 (TLS)
- **Username:** `info@wishgroup.ae`
- **Password:** Your email account password
- **Authentication:** Required for IMAP, POP3, and SMTP

## Configuration Details

The server is configured to use:
- **Port 465** with SSL/TLS encryption (secure)
- **Authentication** enabled
- **TLS** with `rejectUnauthorized: false` (for cPanel compatibility)

## Testing

### Test Email Connection
```bash
GET http://localhost:5001/email/test
```

This will:
1. Verify SMTP connection
2. Send a test email to `info@wishgroup.ae`
3. Return configuration status

### Test Newsletter Subscription
```bash
POST http://localhost:5001/newsletter/subscribe
Content-Type: application/json

{
  "email": "test@example.com"
}
```

## Troubleshooting

### Email Not Sending

1. **Check .env file exists** and has correct values
2. **Verify password** is correct (use email account password)
3. **Check port** - Use 465 for SSL or 587 for TLS
4. **Test connection** using `/email/test` endpoint
5. **Check server logs** for detailed error messages

### Common Issues

- **"Email transporter is not configured"**
  - Solution: Create `.env` file with SMTP settings

- **"Authentication failed"**
  - Solution: Verify username and password in `.env`

- **"Connection timeout"**
  - Solution: Check SMTP_HOST and SMTP_PORT are correct
  - Try port 587 if 465 doesn't work

- **"Certificate error"**
  - Solution: Already handled with `rejectUnauthorized: false`

## Production Deployment

When deploying to production:

1. Set environment variables in your hosting platform
2. Or ensure `.env` file is in the server directory
3. Restart the server after configuration changes
4. Test using `/email/test` endpoint

## Security Notes

- Never commit `.env` file to version control
- Use strong email account passwords
- Port 465 (SSL) is more secure than 587 (TLS)
- Consider using environment variables in production instead of `.env` file


