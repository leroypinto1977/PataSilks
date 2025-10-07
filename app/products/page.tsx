import { Suspense } from "react";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilters } from "@/components/products/product-filters";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchParams {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  featured?: string;
  newArrivals?: string;
}

async function getProducts(searchParams: SearchParams) {
  try {
    // Fetch products from API
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/products`,
      {
        cache: "no-store", // Ensure fresh data
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    let products = await response.json();

    // Apply filters
    if (searchParams.category) {
      products = products.filter(
        (p: any) =>
          p.category?.name.toLowerCase() ===
          searchParams.category?.toLowerCase()
      );
    }

    if (searchParams.featured === "true") {
      products = products.filter((p: any) => p.featured);
    }

    if (searchParams.newArrivals === "true") {
      products = products.filter((p: any) => p.new_arrival);
    }

    if (searchParams.minPrice) {
      products = products.filter(
        (p: any) => p.price >= parseInt(searchParams.minPrice!)
      );
    }

    if (searchParams.maxPrice) {
      products = products.filter(
        (p: any) => p.price <= parseInt(searchParams.maxPrice!)
      );
    }

    // Apply sorting
    switch (searchParams.sortBy) {
      case "price-asc":
        products.sort((a: any, b: any) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a: any, b: any) => b.price - a.price);
        break;
      case "name-asc":
        products.sort((a: any, b: any) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        products.sort((a: any, b: any) => b.name.localeCompare(a.name));
        break;
      default:
        products.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return empty array on error
  }
}

async function getCategories() {
  try {
    // Fetch categories from API
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/categories`,
      {
        cache: "no-store", // Ensure fresh data
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return empty array on error
  }
}

async function getPriceRange() {
  try {
    // Fetch products to calculate price range
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/products`,
      {
        cache: "no-store", // Ensure fresh data
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products for price range");
    }

    const products = await response.json();
    const prices = products
      .filter((p: any) => p.active)
      .map((p: any) => p.price);

    if (prices.length === 0) {
      return { min: 0, max: 0 };
    }

    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  } catch (error) {
    console.error("Error fetching price range:", error);
    return { min: 0, max: 0 }; // Return default range on error
  }
}

function getPageTitle(searchParams: SearchParams) {
  if (searchParams.newArrivals === "true") {
    return "New Arrivals";
  }
  if (searchParams.featured === "true") {
    return "Featured Collection";
  }
  if (searchParams.category) {
    return `${
      searchParams.category.charAt(0).toUpperCase() +
      searchParams.category.slice(1)
    } Collection`;
  }
  return "All Products";
}

function getPageDescription(searchParams: SearchParams) {
  if (searchParams.newArrivals === "true") {
    return "Discover our latest collection of handwoven silk sarees and traditional textiles, fresh from our master artisans.";
  }
  if (searchParams.featured === "true") {
    return "Our handpicked collection showcasing the finest craftsmanship and most exquisite designs.";
  }
  if (searchParams.category) {
    return `Explore our beautiful ${searchParams.category} collection featuring authentic Indian textiles.`;
  }
  return "Explore our complete collection of premium silk sarees, lehengas, and traditional Indian textiles.";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [products, categories, priceRange] = await Promise.all([
    getProducts(searchParams),
    getCategories(),
    getPriceRange(),
  ]);

  const pageTitle = getPageTitle(searchParams);
  const pageDescription = getPageDescription(searchParams);

  return (
    <div className="bg-premium-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {pageTitle}
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl">{pageDescription}</p>
          {searchParams.category && (
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-rich-brown/10 to-rich-brown/20 text-rich-brown border border-rich-brown/30">
              {searchParams.category.charAt(0).toUpperCase() +
                searchParams.category.slice(1)}{" "}
              Collection
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                <ProductFilters
                  categories={categories}
                  priceRange={priceRange}
                  currentFilters={searchParams}
                />
              </Suspense>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <Suspense
              fallback={
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-96 w-full" />
                  ))}
                </div>
              }
            >
              <ProductGrid products={products} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
