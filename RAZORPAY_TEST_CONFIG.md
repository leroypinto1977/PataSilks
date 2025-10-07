# Razorpay Test Configuration

## Quick Setup for Testing

### 1. Get Test Credentials

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up and complete verification
3. Go to **Settings** > **API Keys**
4. Generate **Test API Keys** (starts with `rzp_test_`)
5. Copy the Key ID and Key Secret

### 2. Add to .env.local

Create or update your `.env.local` file with:

```env
# Razorpay Test Configuration
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_secret_key_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id_here

# Other required variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=your_database_url
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Test the Flow

1. **Add items to cart** from products page
2. **Go to cart** and click "Proceed to Checkout"
3. **Fill checkout form** with test data
4. **Click "Place Order"** - should open Razorpay modal
5. **Use test card:** `4111 1111 1111 1111`
6. **Complete payment** - should create order in database

### 4. Debug Steps

If payment doesn't work:

1. **Check browser console** for errors
2. **Check server logs** for API errors
3. **Verify environment variables** are loaded
4. **Test with test payment page** at `/test-payment`

### 5. Test Cards

- **Success:** `4111 1111 1111 1111`
- **Failure:** `4000 0000 0000 0002`
- **Expiry:** Any future date (e.g., 12/25)
- **CVV:** Any 3 digits (e.g., 123)

### 6. Common Issues

- **"Payment gateway not configured"** - Check environment variables
- **"Invalid key"** - Make sure you're using test keys
- **"Payment failed"** - Check if you're using correct test card
- **"Order not created"** - Check database connection and logs

### 7. Verification

After successful payment:

- **Order created** in database
- **Stock reduced** for purchased items
- **New order banner** appears in admin dashboard
- **Order visible** in admin orders page
