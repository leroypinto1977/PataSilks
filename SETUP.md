# Patta Silks - Complete Setup Instructions

## 🎯 Overview

This is a Next.js 13+ luxury silk saree e-commerce application with Supabase backend and complete authentication system.

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env.local` file with your Supabase credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-setup.sql`
4. Run the SQL script to create all tables, policies, and sample data

### 4. Create Admin User

1. Sign up through the application first (this creates your auth.users record)
2. In Supabase SQL Editor, find your user ID:
   ```sql
   SELECT id, email FROM auth.users;
   ```
3. Update your profile to admin role:
   ```sql
   UPDATE profiles
   SET role = 'ADMIN'
   WHERE id = 'your-user-id-here';
   ```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Architecture

### Authentication System

- **Supabase Auth**: Complete authentication with sign-up/sign-in
- **Role-based Access**: USER and ADMIN roles
- **Middleware Protection**: Routes protected based on authentication status
- **SSR Support**: Server-side rendering with cookie-based sessions

### Database Schema

- **profiles**: User information linked to auth.users
- **categories**: Product categories (Sarees, Lehengas, etc.)
- **products**: Complete product catalog with images, pricing, inventory
- **orders**: Customer orders with status tracking
- **order_items**: Individual items within orders

### Key Features

- 🔐 Complete authentication flow (sign-up, sign-in, sign-out)
- 👑 Admin dashboard for product and order management
- 🛒 Shopping cart functionality
- 📱 Responsive design with Tailwind CSS
- 🔒 Row Level Security (RLS) for data protection
- ⚡ Real-time updates with Supabase realtime
- 🎨 Modern UI components with shadcn/ui

## 📁 Project Structure

```
├── app/                    # Next.js 13+ App Router
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   └── products/          # Product catalog
├── components/            # React components
│   ├── auth-provider.tsx  # Auth context provider
│   ├── admin/             # Admin components
│   ├── cart/              # Cart components
│   ├── layout/            # Layout components
│   ├── products/          # Product components
│   └── ui/                # UI components (shadcn/ui)
├── lib/                   # Utility functions
│   ├── supabase.ts        # Supabase client setup
│   ├── auth-context.tsx   # Authentication context
│   └── utils.ts           # Helper utilities
├── types/                 # TypeScript type definitions
│   └── database.ts        # Database types
└── middleware.ts          # Route protection middleware
```

## 🔐 Authentication Flow

### Public Routes

- `/` - Home page
- `/products` - Product catalog
- `/products/[id]` - Individual product pages

### Protected Routes (Require Login)

- `/cart` - Shopping cart
- `/checkout` - Checkout process

### Admin Routes (Require Admin Role)

- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/products/new` - Add new product
- `/admin/products/[id]` - Edit product

## 🛠️ API Endpoints

### Products

- `GET /api/admin/products` - Get all products (admin)
- `POST /api/admin/products` - Create product (admin)
- `GET /api/admin/products/[id]` - Get product by ID (admin)
- `PUT /api/admin/products/[id]` - Update product (admin)
- `DELETE /api/admin/products/[id]` - Delete product (admin)

## 🎨 UI Components

The application uses shadcn/ui components for consistent design:

- **Forms**: Input, Button, Label, Textarea
- **Navigation**: Header with dropdown menus
- **Data Display**: Cards, Tables, Badges
- **Feedback**: Alerts, Toasts, Loading states

## 🔒 Security Features

### Row Level Security (RLS)

- Users can only view/edit their own data
- Admins have full access to all data
- Products are publicly viewable but only admins can modify

### Middleware Protection

- Redirects unauthenticated users to sign-in page
- Protects admin routes from non-admin users
- Preserves intended destination after authentication

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot read properties of null"** - Usually auth-related

   - Check if user is properly signed in
   - Verify middleware configuration

2. **Database connection errors**

   - Verify environment variables are correct
   - Check Supabase project settings

3. **RLS policy errors**
   - Ensure you've run the complete SQL setup script
   - Check if user has correct role assigned

### Getting Help

- Check browser console for detailed error messages
- Verify network requests in Developer Tools
- Check Supabase logs for database issues

## 📚 Technologies Used

- **Framework**: Next.js 13+ (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Language**: TypeScript
- **Deployment**: Vercel-ready

## 🎯 Next Steps

1. **Complete the database setup** by running the SQL script
2. **Create your admin user** following the instructions above
3. **Add your own products** through the admin dashboard
4. **Customize the design** to match your brand
5. **Set up payment processing** (Stripe, Razorpay, etc.)
6. **Configure email templates** in Supabase Auth
7. **Add more product categories** as needed

## 🤝 Support

If you encounter any issues during setup:

1. Check this README for troubleshooting steps
2. Verify all environment variables are correctly set
3. Ensure the SQL script was executed successfully
4. Check Supabase dashboard for any error logs

---

**Happy selling! 🛍️**
