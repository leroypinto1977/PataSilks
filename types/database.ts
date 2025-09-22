// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: "user" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin";
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          original_price: number | null;
          images: string[];
          active: boolean;
          in_stock: boolean;
          stock_count: number;
          sold: boolean;
          sold_at: string | null;
          fabric: string | null;
          color: string | null;
          size: string | null;
          weight: string | null;
          occasion: string | null;
          slug: string | null;
          tags: string[];
          featured: boolean;
          new_arrival: boolean;
          category_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          original_price?: number | null;
          images?: string[];
          active?: boolean;
          in_stock?: boolean;
          stock_count?: number;
          sold?: boolean;
          sold_at?: string | null;
          fabric?: string | null;
          color?: string | null;
          size?: string | null;
          weight?: string | null;
          occasion?: string | null;
          slug?: string | null;
          tags?: string[];
          featured?: boolean;
          new_arrival?: boolean;
          category_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          original_price?: number | null;
          images?: string[];
          active?: boolean;
          in_stock?: boolean;
          stock_count?: number;
          sold?: boolean;
          sold_at?: string | null;
          fabric?: string | null;
          color?: string | null;
          size?: string | null;
          weight?: string | null;
          occasion?: string | null;
          slug?: string | null;
          tags?: string[];
          featured?: boolean;
          new_arrival?: boolean;
          category_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          total: number;
          status:
            | "PENDING"
            | "CONFIRMED"
            | "PROCESSING"
            | "SHIPPED"
            | "DELIVERED"
            | "CANCELLED";
          shipping_address: any | null;
          billing_address: any | null;
          payment_method: string | null;
          payment_status: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
          tracking_number: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total: number;
          status?:
            | "PENDING"
            | "CONFIRMED"
            | "PROCESSING"
            | "SHIPPED"
            | "DELIVERED"
            | "CANCELLED";
          shipping_address?: any | null;
          billing_address?: any | null;
          payment_method?: string | null;
          payment_status?: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
          tracking_number?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total?: number;
          status?:
            | "PENDING"
            | "CONFIRMED"
            | "PROCESSING"
            | "SHIPPED"
            | "DELIVERED"
            | "CANCELLED";
          shipping_address?: any | null;
          billing_address?: any | null;
          payment_method?: string | null;
          payment_status?: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
          tracking_number?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity?: number;
          price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price?: number;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      handle_new_user: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      user_role: "USER" | "ADMIN";
      order_status:
        | "PENDING"
        | "CONFIRMED"
        | "PROCESSING"
        | "SHIPPED"
        | "DELIVERED"
        | "CANCELLED";
      payment_status: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
    };
  };
}

// Type aliases for easier use
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type CategoryInsert =
  Database["public"]["Tables"]["categories"]["Insert"];
export type CategoryUpdate =
  Database["public"]["Tables"]["categories"]["Update"];

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
export type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
export type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"];

export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
export type OrderItemInsert =
  Database["public"]["Tables"]["order_items"]["Insert"];
export type OrderItemUpdate =
  Database["public"]["Tables"]["order_items"]["Update"];

// Extended types with relationships
export type ProductWithCategory = Product & {
  categories: Category;
};

export type OrderWithItems = Order & {
  order_items: (OrderItem & {
    products: Product;
  })[];
};

export type OrderWithUser = Order & {
  profiles: Profile;
};

// User role enum
export type UserRole = "USER" | "ADMIN";

// Order status enum
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

// Payment status enum
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
