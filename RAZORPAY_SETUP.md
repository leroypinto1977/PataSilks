# Razorpay Payment Gateway Setup

## Sandbox Testing Setup

### 1. Create Razorpay Account

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up for a developer account
3. Complete the account verification process

### 2. Get Test Credentials

1. Go to your Razorpay Dashboard
2. Navigate to **Settings** > **API Keys**
3. Generate **Test API Keys** (not Live keys)
4. Copy the **Key ID** and **Key Secret**

### 3. Environment Variables

Add these to your `.env.local` file:

```env
# Razorpay Sandbox Configuration
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_secret_key_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
```

### 4. Test Cards

Use these test card details for testing:

#### Successful Payment

- **Card Number:** 4111 1111 1111 1111
- **Expiry:** Any future date (e.g., 12/25)
- **CVV:** Any 3 digits (e.g., 123)
- **Name:** Any name

#### Failed Payment

- **Card Number:** 4000 0000 0000 0002
- **Expiry:** Any future date
- **CVV:** Any 3 digits
- **Name:** Any name

### 5. Test UPI IDs

- **Success:** success@razorpay
- **Failure:** failure@razorpay

### 6. Webhook Testing (Optional)

For webhook testing, you can use:

- **URL:** `https://your-domain.com/api/webhooks/razorpay`
- Use ngrok for local testing: `ngrok http 3000`

### 7. Testing Flow

1. Add items to cart
2. Go to checkout page
3. Fill customer details
4. Click "Place Order"
5. Use test card details
6. Complete payment
7. Verify order creation in admin dashboard

### 8. Production Setup

When ready for production:

1. Switch to **Live API Keys** in Razorpay Dashboard
2. Update environment variables with live credentials
3. Remove test prefixes from keys
4. Test with real payment methods

### 9. Common Issues

- **Invalid Key:** Make sure you're using test keys for development
- **Payment Failed:** Check if you're using correct test card numbers
- **Webhook Issues:** Ensure webhook URL is accessible
- **CORS Issues:** Make sure domain is whitelisted in Razorpay dashboard

### 10. Dashboard Access

- **Test Dashboard:** https://dashboard.razorpay.com/app/dashboard
- **Live Dashboard:** https://dashboard.razorpay.com/app/live-dashboard

## Security Notes

- Never commit real API keys to version control
- Use environment variables for all sensitive data
- Test thoroughly in sandbox before going live
- Monitor transactions in Razorpay dashboard



