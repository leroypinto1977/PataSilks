# Admin API Endpoints Documentation

## Overview

This document outlines all the admin API endpoints for the Patta Silks admin dashboard management system.

## Authentication

All admin endpoints require proper authentication and admin role verification. The endpoints use Supabase Admin Client to bypass RLS policies for administrative operations.

## Base URL

All endpoints are prefixed with `/api/admin/`

---

## User Management API

### Get All Users

**GET** `/api/admin/users`

Fetches all users with their profiles and auth information.

**Response:**

```json
{
  "users": [
    {
      "id": "user_id",
      "email": "user@example.com",
      "full_name": "User Name",
      "role": "user|admin",
      "created_at": "2024-01-01T00:00:00Z",
      "last_sign_in_at": "2024-01-01T00:00:00Z",
      "email_confirmed_at": "2024-01-01T00:00:00Z",
      "avatar_url": "url"
    }
  ]
}
```

### Update User Role

**PATCH** `/api/admin/users/{id}`

Updates a user's role between "user" and "admin".

**Request Body:**

```json
{
  "role": "admin"
}
```

### Delete User (Revoke Access)

**DELETE** `/api/admin/users/{id}`

Permanently deletes a user from both Auth and profiles.

---

## Orders Management API

### Get All Orders

**GET** `/api/admin/orders`

Fetches all orders with user profiles and order items.

**Response:**

```json
{
  "orders": [
    {
      "id": "order_id",
      "user_id": "user_id",
      "total": 25000,
      "status": "PENDING",
      "payment_status": "PENDING",
      "shipping_address": {},
      "billing_address": {},
      "payment_method": "UPI",
      "tracking_number": null,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z",
      "profiles": {
        "id": "user_id",
        "email": "customer@example.com",
        "full_name": "Customer Name"
      },
      "order_items": [
        {
          "id": "item_id",
          "quantity": 1,
          "price": 25000,
          "products": {
            "id": "product_id",
            "name": "Saree Name",
            "images": ["url1", "url2"]
          }
        }
      ],
      "itemCount": 1,
      "totalAmount": 25000
    }
  ]
}
```

### Create New Order

**POST** `/api/admin/orders`

Creates a new order with items.

**Request Body:**

```json
{
  "user_id": "user_id",
  "total": 25000,
  "status": "PENDING",
  "shipping_address": {},
  "billing_address": {},
  "payment_method": "UPI",
  "payment_status": "PENDING",
  "items": [
    {
      "product_id": "product_id",
      "quantity": 1,
      "price": 25000
    }
  ]
}
```

### Get Single Order

**GET** `/api/admin/orders/{id}`

Fetches a specific order with full details.

### Update Order

**PATCH** `/api/admin/orders/{id}`

Updates order status, payment status, or other fields.

**Request Body:**

```json
{
  "status": "SHIPPED",
  "payment_status": "PAID",
  "tracking_number": "TRK123456"
}
```

### Delete Order

**DELETE** `/api/admin/orders/{id}`

Permanently deletes an order and its items.

---

## Categories Management API

### Get All Categories

**GET** `/api/admin/categories`

Fetches all categories with product counts.

**Response:**

```json
{
  "categories": [
    {
      "id": "category_id",
      "name": "Silk Sarees",
      "description": "Premium silk sarees",
      "color": "#FF6B6B",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z",
      "productCount": 25
    }
  ]
}
```

### Create New Category

**POST** `/api/admin/categories`

Creates a new category.

**Request Body:**

```json
{
  "name": "Wedding Sarees",
  "description": "Special sarees for weddings",
  "color": "#FF6B6B"
}
```

### Get Single Category

**GET** `/api/admin/categories/{id}`

Fetches a specific category with its products.

### Update Category

**PATCH** `/api/admin/categories/{id}`

Updates category information.

**Request Body:**

```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "color": "#00FF00"
}
```

### Delete Category

**DELETE** `/api/admin/categories/{id}`

Deletes a category (only if no products are assigned).

---

## Dashboard Stats API

### Get Dashboard Statistics

**GET** `/api/admin/dashboard`

Fetches comprehensive dashboard statistics.

**Response:**

```json
{
  "stats": {
    "users": {
      "total": 150,
      "admins": 3,
      "regular": 147
    },
    "orders": {
      "total": 85,
      "pending": 12,
      "paid": 73,
      "recent": 15
    },
    "products": {
      "total": 127,
      "active": 119,
      "inStock": 115,
      "sold": 12,
      "recent": 8
    },
    "categories": {
      "total": 8
    },
    "revenue": {
      "total": 2847500,
      "avgOrderValue": 33500
    },
    "metrics": {
      "conversionRate": 48.67
    }
  }
}
```

---

## Status Enums

### Order Status

- `PENDING` - Order placed, awaiting confirmation
- `CONFIRMED` - Order confirmed by admin
- `PROCESSING` - Order being prepared
- `SHIPPED` - Order shipped to customer
- `DELIVERED` - Order delivered successfully
- `CANCELLED` - Order cancelled

### Payment Status

- `PENDING` - Payment pending
- `PAID` - Payment completed
- `FAILED` - Payment failed
- `REFUNDED` - Payment refunded

### User Roles

- `user` - Regular customer
- `admin` - Administrator with full access

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

---

## Notes

1. All admin endpoints require authentication and admin role
2. Timestamps are in ISO 8601 format
3. Prices are stored in paise (multiply by 100 for INR)
4. Image URLs are stored as arrays
5. Address fields accept JSON objects
6. User deletion is permanent and cannot be undone
7. Category deletion requires no associated products
8. Order deletion also removes associated order items
