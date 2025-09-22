import { Suspense } from "react";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilters } from "@/components/products/product-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { mockProducts, mockCategories } from "@/lib/mock-data";

interface SearchParams {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  featured?: string;
  newArrivals?: string;
}

async function getProducts(searchParams: SearchParams) {
  // Using mock data for now - replace with Supabase once database is set up
  let products = mockProducts.filter((p) => p.active);

  // Apply filters
  if (searchParams.category) {
    products = products.filter(
      (p) =>
        p.categories?.name.toLowerCase() ===
        searchParams.category?.toLowerCase()
    );
  }

  if (searchParams.featured === "true") {
    products = products.filter((p) => p.featured);
  }

  if (searchParams.newArrivals === "true") {
    products = products.filter((p) => p.new_arrival);
  }

  if (searchParams.minPrice) {
    products = products.filter(
      (p) => p.price >= parseInt(searchParams.minPrice!)
    );
  }

  if (searchParams.maxPrice) {
    products = products.filter(
      (p) => p.price <= parseInt(searchParams.maxPrice!)
    );
  }

  // Apply sorting
  switch (searchParams.sortBy) {
    case "price-asc":
      products.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      products.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      products.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      products.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      products.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  }

  return products;
}

async function getCategories() {
  // Using mock data for now - replace with Supabase once database is set up
  return mockCategories;
}

async function getPriceRange() {
  // Using mock data for now - replace with Supabase once database is set up
  const prices = mockProducts.filter((p) => p.active).map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
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
    <div className="min-h-screen bg-primary-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
            {pageTitle}
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl">{pageDescription}</p>
          {searchParams.category && (
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-primary-pink-100 to-blush text-primary-pink-700 border border-primary-pink-200">
              {searchParams.category.charAt(0).toUpperCase() +
                searchParams.category.slice(1)}{" "}
              Collection
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
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
