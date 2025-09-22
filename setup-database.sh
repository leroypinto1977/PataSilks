#!/bin/bash

# Patta Silks Database Setup Script
# This script sets up the complete database schema in Supabase

echo "🔧 Setting up Patta Silks Database"
echo "================================="
echo ""

# Check if required env variables exist
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with your Supabase credentials"
    exit 1
fi

# Extract Supabase URL from .env.local
SUPABASE_URL=$(grep "NEXT_PUBLIC_SUPABASE_URL" .env.local | cut -d '=' -f2)
SUPABASE_ANON_KEY=$(grep "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local | cut -d '=' -f2)

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ]; then
    echo "❌ Supabase credentials not found in .env.local"
    echo "Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    exit 1
fi

echo "📋 Database Setup Instructions:"
echo ""
echo "1. Go to your Supabase dashboard: https://supabase.com/dashboard"
echo "2. Navigate to your project: ${SUPABASE_URL}"
echo "3. Go to 'SQL Editor' in the left sidebar"
echo "4. Create a new query and paste the contents of 'supabase-setup.sql'"
echo "5. Click 'Run' to execute the setup"
echo ""
echo "📁 SQL File Location: ./supabase-setup.sql"
echo ""
echo "✅ After running the SQL setup, you can:"
echo "   • Create admin users with: npm run admin:create"
echo "   • Access admin panel at: /admin"
echo "   • Start adding products and collections"
echo ""

# Offer to open the SQL file
read -p "Would you like to open the SQL file now? (y/n): " -n 1 -r
echo
if [[ $SUPABASE_URL =~ y|Y ]]; then
    if command -v code >/dev/null 2>&1; then
        code supabase-setup.sql
        echo "📝 Opened supabase-setup.sql in VS Code"
    elif command -v open >/dev/null 2>&1; then
        open supabase-setup.sql
        echo "📝 Opened supabase-setup.sql"
    else
        echo "📝 Please manually open supabase-setup.sql"
    fi
fi

echo ""
echo "🌐 Supabase Dashboard: https://supabase.com/dashboard"
echo "📚 Full setup guide: ./ADMIN_GUIDE.md"
