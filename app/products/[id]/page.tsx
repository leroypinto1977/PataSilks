import { notFound } from "next/navigation";
import { ProductImages } from "@/components/products/product-images";
import { ProductDetails } from "@/components/products/product-details";
import { ProductCard } from "@/components/products/product-card";
import { mockProducts } from "@/lib/mock-data";

async function getProduct(slug: string) {
  // Using mock data for now - replace with Supabase once database is set up
  const product = mockProducts.find((p) => p.slug === slug);
  return product || null;
}

async function getRelatedProducts(categoryId: string, productId: string) {
  // Using mock data for now - replace with Supabase once database is set up
  const related = mockProducts
    .filter(
      (p) => p.category_id === categoryId && p.id !== productId && p.active
    )
    .slice(0, 3);

  return related;
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.category_id,
    product.id
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-primary-pink-700 transition-colors">
            Home
          </a>
          <span>/</span>
          <a
            href="/products"
            className="hover:text-primary-pink-700 transition-colors"
          >
            Products
          </a>
          <span>/</span>
          <span className="text-primary-pink-700 font-medium">
            {product.categories?.name}
          </span>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate">
            {product.name}
          </span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-6">
            <ProductImages images={product.images || []} alt={product.name} />

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-primary-pink-100">
                <div className="w-8 h-8 mx-auto mb-2 text-primary-pink-600">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-gray-900">Authentic</p>
                <p className="text-xs text-gray-600">Handcrafted</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-primary-pink-100">
                <div className="w-8 h-8 mx-auto mb-2 text-primary-pink-600">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-gray-900">Quality</p>
                <p className="text-xs text-gray-600">Assured</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-primary-pink-100">
                <div className="w-8 h-8 mx-auto mb-2 text-primary-pink-600">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-gray-900">Support</p>
                <p className="text-xs text-gray-600">24/7</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <ProductDetails product={product} />
          </div>
        </div>

        {/* Additional Product Information */}
        <div className="mt-16 grid lg:grid-cols-3 gap-8">
          {/* Product Specifications */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-primary-pink-100">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Product Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Fabric & Craft
                  </h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Material: {product.fabric || "Pure Silk"}</li>
                    <li>• Weaving: Handloom Traditional</li>
                    <li>
                      • Origin:{" "}
                      {product.fabric?.includes("Kanjivaram")
                        ? "Tamil Nadu"
                        : product.fabric?.includes("Banarasi")
                        ? "Varanasi"
                        : "India"}
                    </li>
                    <li>• Thread Count: Premium Quality</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Styling</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Color: {product.color || "As shown"}</li>
                    <li>
                      • Occasion: {product.occasion || "Festive, Wedding"}
                    </li>
                    <li>• Length: 6.5 meters (with blouse piece)</li>
                    <li>• Border: Traditional motifs</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Care Instructions
                  </h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Dry clean only recommended</li>
                    <li>• Store in cotton cloth</li>
                    <li>• Avoid direct sunlight</li>
                    <li>• Iron on medium heat with cloth</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Availability
                  </h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>
                      • Stock: {product.stock_count || 0} pieces available
                    </li>
                    <li>• Processing: 2-3 business days</li>
                    <li>• Shipping: 5-7 business days</li>
                    <li>• Returns: 7-day easy returns</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Size Guide */}
          <div className="bg-gradient-to-br from-primary-pink-50 to-primary-pink-100 rounded-2xl p-8 border border-primary-pink-200">
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
              Size Guide
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">Saree Length:</span>
                <span className="font-medium text-gray-900">6.5 meters</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Blouse Piece:</span>
                <span className="font-medium text-gray-900">0.8 meters</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Width:</span>
                <span className="font-medium text-gray-900">1.2 meters</span>
              </div>
              <div className="pt-4 border-t border-primary-pink-200">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Blouse Size Guide
                </h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div>S: 32-34 inches</div>
                  <div>M: 36-38 inches</div>
                  <div>L: 40-42 inches</div>
                  <div>XL: 44-46 inches</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                You May Also Like
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Discover more exquisite pieces from our curated collection of
                traditional and contemporary designs
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
