"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Crown, Palette } from "lucide-react";

export function CraftsmanshipSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const features = [
    {
      icon: Sparkles,
      title: "Handwoven Excellence",
      description:
        "Each thread is carefully selected and woven by master artisans using techniques passed down through generations.",
      color: "from-primary-pink-500 to-primary-pink-700",
    },
    {
      icon: Heart,
      title: "Made with Love",
      description:
        "Every saree is crafted with passion and attention to detail, ensuring you feel special on every occasion.",
      color: "from-rose-gold to-primary-pink-400",
    },
    {
      icon: Crown,
      title: "Royal Heritage",
      description:
        "Our designs are inspired by the royal courts of ancient India, bringing timeless elegance to modern women.",
      color: "from-primary-pink-600 to-primary-pink-800",
    },
    {
      icon: Palette,
      title: "Vibrant Colors",
      description:
        "Using premium dyes and traditional techniques to create colors that remain vibrant for years to come.",
      color: "from-primary-pink-400 to-rose-gold",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-pink-50 to-primary-pink-100 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 border-2 border-primary-pink-300 rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-blush rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-rose-gold rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur rounded-full px-6 py-3 shadow-lg mb-6"
          >
            <Sparkles className="text-primary-pink-600" size={20} />
            <span className="text-primary-pink-700 font-semibold">
              Our Craft
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
            The Art of
            <span className="bg-gradient-to-r from-primary-pink-600 to-primary-pink-700 bg-clip-text text-transparent">
              {" "}
              Perfection
            </span>
          </h2>

          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Every Patta Silk saree is a masterpiece that combines traditional
            craftsmanship with contemporary design, creating timeless pieces
            that celebrate your elegance.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left - Video/Image Showcase */}
          <motion.div variants={itemVariants} className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main Large Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="col-span-2 aspect-video rounded-3xl overflow-hidden shadow-2xl relative"
              >
                <img
                  src="https://images.pexels.com/photos/8879441/pexels-photo-8879441.jpeg"
                  alt="Master craftsman weaving silk"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white font-semibold text-lg">
                    Master Artisan at Work
                  </p>
                  <p className="text-white/80">Creating timeless beauty</p>
                </div>
              </motion.div>

              {/* Small Images */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src="https://images.pexels.com/photos/6966629/pexels-photo-6966629.jpeg"
                  alt="Silk thread details"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src="https://images.pexels.com/photos/8879456/pexels-photo-8879456.jpeg"
                  alt="Traditional patterns"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
              className="absolute -top-6 -right-6 bg-gradient-to-r from-primary-pink-500 to-primary-pink-700 text-white rounded-full p-6 shadow-xl"
            >
              <Crown size={24} />
            </motion.div>
          </motion.div>

          {/* Right - Process Steps */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Our Crafting Process
              </h3>
              <p className="text-gray-700 leading-relaxed mb-8">
                From selecting the finest silk threads to the final finishing
                touches, every step is executed with precision and care by our
                master artisans.
              </p>
            </div>

            {/* Process Steps */}
            <div className="space-y-6">
              {[
                "Thread Selection & Preparation",
                "Traditional Loom Setup",
                "Intricate Weaving Process",
                "Quality Control & Finishing",
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center space-x-4 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-pink-500 to-primary-pink-700 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-200">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-primary-pink-700 transition-colors">
                      {step}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="group text-center"
            >
              <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-lg border border-white/50 h-full relative overflow-hidden">
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-200`}
                  >
                    <feature.icon size={28} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary-pink-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
