import { Card, CardContent } from "@/components/ui/card";
import { Truck, ShoppingBag, HeadphonesIcon, RotateCcw } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { animations } from "@/lib/animations";

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
    <section className="py-20 bg-premium-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Why Choose <span className="text-rich-brown">Us</span>
            </motion.h2>
            <motion.p
              className="text-lg text-gray-700 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              We source only the finest fabrics to ensure every saree feels
              luxurious and lasts for years.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.4,
                  },
                },
              }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: "easeOut" },
                    },
                  }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                >
                  <Card className="border border-rich-brown/20 shadow-sm hover:shadow-xl transition-all duration-300 bg-white hover:bg-premium-beige/5 group">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className="flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <div className="w-12 h-12 bg-rich-brown/10 rounded-lg flex items-center justify-center group-hover:bg-rich-brown/20 transition-colors duration-300">
                            <feature.icon className="w-6 h-6 text-rich-brown group-hover:text-rich-brown transition-colors duration-300" />
                          </div>
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-rich-brown transition-colors duration-300">
                            {feature.title}
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop&crop=faces"
                alt="Two women in traditional Indian sarees"
                width={600}
                height={800}
                className="w-full h-[600px] object-cover"
                priority
              />

              {/* Animated decorative dots pattern */}
              <motion.div
                className="absolute -top-4 -left-4 w-20 h-20 opacity-10"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-rich-brown rounded-full"
                      animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Animated decorative dots pattern bottom right */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-20 h-20 opacity-10"
                animate={{
                  rotate: [0, -360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-rich-brown rounded-full"
                      animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        delay: i * 0.15,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
