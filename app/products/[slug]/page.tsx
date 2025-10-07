import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/products/product-details";
import { ProductImages } from "@/components/products/product-images";
import { RelatedProducts } from "@/components/products/related-products";
import Link from "next/link";
import { ArrowLeft, Home, ShoppingBag } from "lucide-react";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  slug: string;
  category: {
    name: string;
    id?: string;
  };
  category_id?: string;
  fabric: string;
  color: string;
  featured?: boolean;
  new_arrival?: boolean;
  active: boolean;
  in_stock: boolean;
  stock_count: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/products`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();
    const product = products.find((p: Product) => p.slug === slug);
    return product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

async function getRelatedProducts(
  categoryId: string,
  currentProductId: string
): Promise<Product[]> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/products`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();
    return products
      .filter(
        (p: Product) =>
          (p.category_id || p.category.id) === categoryId &&
          p.id !== currentProductId &&
          p.active
      )
      .slice(0, 4);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 bg-rich-brown text-white rounded-lg hover:bg-rich-brown/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = await getRelatedProducts(
    product.category_id || product.category.id || "",
    product.id
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link
                href="/"
                className="hover:text-rich-brown flex items-center"
              >
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/products"
                className="hover:text-rich-brown flex items-center"
              >
                <ShoppingBag className="w-4 h-4 mr-1" />
                Products
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/products?category=${product.category.name.toLowerCase()}`}
                className="hover:text-rich-brown"
              >
                {product.category.name}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <ProductImages images={product.images} name={product.name} />

          {/* Product Details */}
          <ProductDetails product={product} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </div>
    </div>
  );
}

// Metadata will be handled by the layout or can be set dynamically
