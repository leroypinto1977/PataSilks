"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Bride from Delhi",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content:
        "The silk saree I bought for my wedding was absolutely stunning! The quality is unmatched and the colors are so vibrant. Everyone complimented me on my choice.",
      rating: 5,
    },
    {
      name: "Meera Krishnan",
      role: "Fashion Designer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content:
        "As a designer, I appreciate the intricate work and attention to detail. Patta Silks maintains the traditional craftsmanship while offering contemporary designs.",
      rating: 5,
    },
    {
      name: "Anita Reddy",
      role: "Classical Dancer",
      avatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
      content:
        "Perfect for my dance performances! The fabric drapes beautifully and the colors don't fade even after multiple uses. Truly premium quality.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-pink-50 to-primary-pink-100 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-pink-400 to-blush rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blush to-rose-gold rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-rose-gold to-primary-pink-400 rounded-full blur-lg" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        {/* Header */}
        <motion.div variants={cardVariants} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur rounded-full px-6 py-3 shadow-lg mb-6"
          >
            <Quote className="text-primary-pink-600" size={20} />
            <span className="text-primary-pink-700 font-semibold">
              Customer Stories
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
            What Our Customers
            <span className="bg-gradient-to-r from-primary-pink-600 to-primary-pink-700 bg-clip-text text-transparent">
              {" "}
              Say
            </span>
          </h2>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Hear from women who have made Patta Silks a part of their most
            cherished moments
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50 h-full relative overflow-hidden">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-pink-50/50 to-blush/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Quote Icon */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-r from-primary-pink-500 to-primary-pink-700 rounded-full flex items-center justify-center opacity-20">
                  <Quote size={20} className="text-white" />
                </div>

                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary-pink-200"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-primary-pink-500 to-primary-pink-700 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div variants={cardVariants} className="text-center mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-pink-600 to-primary-pink-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <Star size={20} className="text-yellow-300" />
            <span className="font-semibold">Read More Reviews</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
