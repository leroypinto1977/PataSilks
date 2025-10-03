import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/products/product-details";
import { ProductImages } from "@/components/products/product-images";
import { RelatedProducts } from "@/components/products/related-products";
import { client, productQueries } from "@/lib/sanity";
import { SanityProduct } from "@/types/sanity";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

async function getProduct(slug: string): Promise<SanityProduct | null> {
  try {
    const product = await client.fetch(productQueries.bySlug, { slug });
    return product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

async function getRelatedProducts(
  categoryId: string,
  currentProductId: string
): Promise<SanityProduct[]> {
  try {
    const products = await client.fetch(
      `*[_type == "product" && category._ref == $categoryId && _id != $currentProductId && active == true] | order(_createdAt desc) [0...4] {
        _id,
        name,
        slug,
        price,
        images,
        category
      }`,
      { categoryId, currentProductId }
    );
    return products || [];
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.category._id,
    product._id
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <a href="/" className="hover:text-rich-beige">
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/products" className="hover:text-rich-beige">
                Products
              </a>
            </li>
            <li>/</li>
            <li>
              <a
                href={`/products?category=${product.category.slug.current}`}
                className="hover:text-rich-beige"
              >
                {product.category.name}
              </a>
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

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - Patta Silks`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.map((img) => ({
        url: img.asset.url,
        width: 800,
        height: 600,
        alt: img.alt || product.name,
      })),
    },
  };
}
