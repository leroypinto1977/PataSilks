import { ProductCard } from "./product-card";
import { SanityProductPreview } from "@/types/sanity";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  slug?: string;
  category?: {
    name: string;
  };
  categories?: {
    name: string;
  };
  featured?: boolean;
  new_arrival?: boolean;
}

interface ProductGridProps {
  products: Product[] | SanityProductPreview[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-brown-700 text-lg mb-4">No products found</p>
        <p className="text-brown-600">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id || product.id} product={product} />
      ))}
    </div>
  );
}
