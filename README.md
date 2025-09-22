# Patta Silks - E-commerce Website

A premium e-commerce website for traditional Indian textiles built with Next.js, Prisma, and SQLite.

## Features

- **Modern E-commerce Platform**: Built with Next.js 13+ with App Router
- **Authentication**: NextAuth.js for secure user authentication
- **Admin Dashboard**: Complete admin panel for product management
- **Product Catalog**: Browse products by categories with filters
- **Shopping Cart**: Full cart functionality with Zustand state management
- **Responsive Design**: Beautiful, responsive UI with Tailwind CSS
- **Database**: SQLite database with Prisma ORM

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS + Custom UI components
- **State Management**: Zustand
- **UI Components**: Radix UI + Custom components
- **Icons**: Lucide React
- **Image Handling**: Next.js Image component with external image support

## Prerequisites

- Node.js 18+
- npm or yarn

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd "/path/to/your/patta-silks"
npm install
```

### 2. Environment Setup

The `.env` file is already configured with:

- SQLite database path
- NextAuth secret and URL
- Placeholder values for future services (Cloudinary, UploadThing)

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Create and push database schema
npx prisma db push

# Seed the database with sample data
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the next available port).

## Database Schema

The application uses the following main models:

- **User**: User accounts with role-based access (USER/ADMIN)
- **Category**: Product categories (Sarees, Lehengas, Dupattas)
- **Product**: Product catalog with images, pricing, and category relationships
- **Order**: Order management with order items

## Default Admin Account

- **Email**: admin@patasilks.com
- **Password**: admin123

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── products/         # Product-related components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   ├── store.ts          # Zustand store
│   └── utils.ts          # Utility functions
├── prisma/               # Database schema and seed
└── types/                # TypeScript type definitions
```

## Key Features Implemented

### Frontend

- Homepage with hero section and featured products
- Product catalog with filtering and search
- Individual product pages with image galleries
- Shopping cart functionality
- Admin dashboard for product management
- Responsive design for all devices

### Backend

- RESTful API routes for products and admin operations
- Database operations with Prisma
- Image handling with JSON serialization for SQLite compatibility
- Authentication middleware for protected routes

### Authentication

- Credential-based authentication
- Role-based access control (USER/ADMIN)
- Protected admin routes

## Data Handling Notes

- **Images**: Stored as JSON strings in SQLite for compatibility, automatically transformed to arrays for frontend use
- **Product Data**: Includes automatic transformation between database and frontend formats
- **Categories**: Hierarchical product organization

## Customization

### Adding New Products

1. Access admin dashboard at `/admin`
2. Navigate to Products section
3. Use "Add New Product" form

### Styling

- Tailwind CSS configuration in `tailwind.config.ts`
- Custom color scheme with brown/amber theme
- Component styles in individual component files

### Database Changes

1. Modify `prisma/schema.prisma`
2. Run `npx prisma db push`
3. Update seed file if needed
4. Run `npm run db:seed`

## Development Notes

- The application uses SQLite for development simplicity
- Images are handled through external URLs (Pexels placeholders)
- Product images are stored as JSON strings and automatically converted for frontend use
- Admin functionality is fully implemented with create, read, update, delete operations

## Production Deployment

For production deployment:

1. Consider switching to PostgreSQL or MySQL
2. Set up proper image storage (Cloudinary, AWS S3, etc.)
3. Configure environment variables for production
4. Set up proper domain and SSL

## Support

This is a complete e-commerce solution for traditional Indian textiles with all necessary features for a modern online store.
