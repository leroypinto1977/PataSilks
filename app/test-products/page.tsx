import Link from "next/link";
import { mockProducts } from "@/lib/mock-data";

export default function TestProductsPage() {
  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold text-brown-900 mb-8 text-center">
          Test Product Pages
        </h1>
        <p className="text-brown-700 text-center mb-12">
          Click on any product below to test the individual product page design
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {mockProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="block group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100 hover:border-amber-300 transition-all duration-300 group-hover:shadow-xl">
                <div className="flex items-start space-x-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-bold text-brown-900 group-hover:text-amber-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-brown-600 text-sm mt-1">
                      {product.categories?.name}
                    </p>
                    <p className="text-amber-600 font-bold text-xl mt-2">
                      ₹{product.price.toLocaleString()}
                    </p>
                    <div className="flex gap-2 mt-3">
                      {product.featured && (
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                      {product.new_arrival && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          New Arrival
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-brown-400 group-hover:text-amber-600 transition-colors">
                    →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-brown-600 text-sm">
            Note: This is using mock data for testing.
            <br />
            Replace with Supabase integration once database is set up.
          </p>
        </div>
      </div>
    </div>
  );
}
