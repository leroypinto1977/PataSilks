import { redirect, notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { AdminSidebar } from "@/components/admin/sidebar";
import { ProductForm } from "@/components/admin/product-form";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

async function getProduct(id: string) {
  const supabase = createSupabaseAdminClient();
  
  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .eq("id", id)
    .single();

  if (error || !product) {
    return null;
  }

  return {
    ...product,
    category: product.categories,
  };
}

async function getCategories() {
  const supabase = createSupabaseAdminClient();
  
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return categories || [];
}

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/signin");
  }

  // Check if user has admin role
  const { data: profile } = (await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()) as { data: { role: "user" | "admin" } | null };

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  const [product, categories] = await Promise.all([
    getProduct(params.id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream-50 flex">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-brown-900 mb-2">
              Edit Product
            </h1>
            <p className="text-brown-700">Update product information</p>
          </div>

          <ProductForm categories={categories} product={product} />
        </div>
      </div>
    </div>
  );
}
