# Patta Silks CMS - Admin Setup Guide

## 🚀 Quick Start: Creating Your First Admin User

### Step 1: Create a User Account

1. Go to your website: `http://localhost:3000`
2. Click "Sign Up" and create a new account with your desired admin email
3. Complete the sign-up process and verify your email if required

### Step 2: Upgrade to Admin

Run the admin creation script:

```bash
npm run admin:create
```

Follow the prompts:

- Choose option **1** to create an admin user
- Enter the email address you just signed up with
- The script will upgrade that user to admin status

### Step 3: Access Admin Dashboard

1. Sign in with your admin account
2. You'll see a "Admin Dashboard" button in the navigation
3. Click it to access the full CMS at `/admin`

---

## 🛠 Admin Features Overview

### 📊 Dashboard (`/admin`)

- **Overview Stats**: Total products, orders, customers
- **Recent Activity**: Latest orders and products
- **Quick Actions**: Add products, manage collections

### 📦 Products Management (`/admin/products`)

- **Add New Products**: Rich form with image upload
- **Edit Existing**: Update product details, pricing, images
- **Inventory Management**: Track stock, mark as sold
- **Categories**: Organize by collections

### 🏷 Collections Management (`/admin/collections`)

- **Create Collections**: Organize products by categories
- **Edit Collections**: Update names and descriptions
- **View Products**: See all products in each collection
- **Analytics**: Track collection performance

### 🛒 Orders Management (`/admin/orders`)

- **Order Tracking**: View all customer orders
- **Status Updates**: Mark as processing, shipped, delivered
- **Customer Details**: Contact information and shipping
- **Payment Tracking**: Monitor payment status

### 👥 User Management (`/admin/users`)

- **View All Users**: Customer accounts and admin users
- **Role Management**: Promote users to admin
- **Activity Tracking**: User engagement metrics

---

## 🎨 Collections CMS Features

### Creating Collections

1. Go to **Admin → Collections**
2. Click **"New Collection"**
3. Add:
   - **Name**: e.g., "Bridal Collection", "Festive Sarees"
   - **Description**: Detailed description for customers
4. Click **"Create Collection"**

### Managing Collections

- **Grid/List View**: Switch between visual layouts
- **Search**: Find collections quickly
- **Edit**: Update collection details
- **Delete**: Remove empty collections
- **Product Count**: See how many products in each collection

### Adding Products to Collections

1. Go to **Admin → Products → Add New Product**
2. Select the collection from the dropdown
3. Fill in product details
4. Upload images
5. Save product

---

## 🔑 Admin Permissions

### Admin Users Can:

- ✅ Access `/admin` dashboard
- ✅ Create, edit, delete products
- ✅ Manage collections and categories
- ✅ View and update orders
- ✅ Manage user accounts
- ✅ View analytics and reports

### Regular Users Can:

- ✅ Browse products and collections
- ✅ Add items to cart
- ✅ Place orders
- ✅ View their order history
- ❌ Access admin areas

---

## 🛡 Security Features

### Authentication

- **Supabase Auth**: Secure authentication system
- **Role-Based Access**: Admin vs user permissions
- **Session Management**: Automatic logout on inactivity

### Data Protection

- **Server-Side Validation**: All forms validated on backend
- **SQL Injection Protection**: Parameterized queries
- **File Upload Security**: Image validation and sanitization

---

## 📈 Advanced Admin Operations

### Bulk Operations

```bash
# List all current admins
npm run admin:create
# Choose option 2 to list admins
```

### Database Management

```bash
# View database in browser
npm run db:studio

# Apply schema changes
npm run db:push

# Seed sample data
npm run db:seed
```

### Environment Setup

Make sure your `.env.local` has:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database
DATABASE_URL=your_database_url
```

---

## 🎯 Best Practices

### Product Management

1. **High-Quality Images**: Upload multiple angles
2. **Detailed Descriptions**: Include fabric, care instructions
3. **Proper Categorization**: Use collections effectively
4. **SEO-Friendly**: Use descriptive names and tags

### Collection Organization

1. **Clear Naming**: Use intuitive collection names
2. **Seasonal Collections**: Create time-based collections
3. **Occasion-Based**: Wedding, Party, Casual, etc.
4. **Regular Updates**: Keep collections fresh

### Order Management

1. **Quick Response**: Update order status promptly
2. **Communication**: Keep customers informed
3. **Inventory Sync**: Mark items as sold when shipped
4. **Analytics**: Track popular products and collections

---

## 🆘 Troubleshooting

### Can't Access Admin Panel?

1. Verify your user role in the database
2. Clear browser cache and cookies
3. Try logging out and back in
4. Run the admin creation script again

### Database Errors?

1. Check your environment variables
2. Ensure Supabase connection is working
3. Verify database schema is up to date

### Image Upload Issues?

1. Check file size (max 5MB recommended)
2. Verify image format (JPG, PNG, WebP)
3. Ensure sufficient storage space

---

## 📞 Support

For technical support or questions:

1. Check this documentation first
2. Review the console logs for errors
3. Verify all environment variables are set
4. Contact your development team

---

**🎉 Congratulations! Your Patta Silks CMS is ready to use!**
