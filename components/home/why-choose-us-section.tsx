import { Card, CardContent } from "@/components/ui/card";
import { Truck, ShoppingBag, HeadphonesIcon, RotateCcw } from "lucide-react";
import Image from "next/image";

export function WhyChooseUsSection() {
  const features = [
    {
      icon: Truck,
      title: "Fast & Free Shipping",
      description:
        "We ensure your sarees reach you as quickly as possible, without any extra delivery charges.",
    },
    {
      icon: ShoppingBag,
      title: "Easy To Shop",
      description:
        "Enjoy a smooth and simple shopping experience from browsing to checkout.",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description:
        "Need help at midnight or early morning? We're always available.",
    },
    {
      icon: RotateCcw,
      title: "Hassle Free Returns",
      description:
        "Shop with confidence—easy returns and quick exchanges guaranteed.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-pink-50 to-primary-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Features */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">
              We source only the finest fabrics to ensure every saree feels
              luxurious and lasts for years.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-pink-100 to-blush rounded-lg flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-primary-pink-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop&crop=faces"
                alt="Two women in traditional Indian sarees"
                width={600}
                height={800}
                className="w-full h-[600px] object-cover"
                priority
              />
              {/* Decorative dots pattern */}
              <div className="absolute -top-4 -left-4 w-20 h-20 opacity-20">
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-primary-pink-400 rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Decorative dots pattern bottom right */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 opacity-20">
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-rose-gold rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
