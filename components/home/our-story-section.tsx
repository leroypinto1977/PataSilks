import { CheckCircle } from "lucide-react";
import Image from "next/image";

export function OurStorySection() {
  const storyPoints = [
    {
      title: "We began as a small boutique,",
      description:
        "dedicated to offering authentic sarees crafted with care and tradition.",
    },
    {
      title: "We choose only premium fabrics and skilled craftsmanship.",
      description: "",
    },
    {
      title:
        "Designs that respect heritage while embracing contemporary fashion.",
      description: "",
    },
    {
      title: "Expanded with the trust and love of our valued customers.",
      description: "",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-primary-brown-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1583391733956-6c78376b9ed2?w=600&h=800&fit=crop&crop=faces"
                alt="Four women in beautiful traditional Indian sarees showcasing different styles"
                width={600}
                height={800}
                className="w-full h-[600px] object-cover"
                priority
              />

              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-brown-600/10 to-blush/10"></div>

              {/* Decorative corner elements */}
              <div className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-white/40 rounded-tl-lg"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-white/40 rounded-br-lg"></div>
            </div>

            {/* Floating decorative element */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-brown-200 to-blush rounded-full opacity-80 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blush to-rose-gold/50 rounded-full opacity-60 blur-xl"></div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We started with a simple dream — to bring the timeless charm of
              sarees to women everywhere. From a small beginning, our passion
              for quality fabrics and authentic craftsmanship has grown into a
              trusted saree destination. Every saree in our collection is a
              blend of tradition and modern style, made to celebrate your unique
              moments.
            </p>

            <div className="space-y-6">
              {storyPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-6 h-6 text-primary-brown-600 fill-current" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium leading-relaxed">
                      {point.title}
                    </p>
                    {point.description && (
                      <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                        {point.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional story highlights */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-primary-brown-600 mb-1">
                  500+
                </div>
                <div className="text-sm text-gray-700">Happy Customers</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-primary-brown-700 mb-1">
                  50+
                </div>
                <div className="text-sm text-gray-700">Unique Designs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
