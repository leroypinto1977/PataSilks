"use client";

import { motion } from "framer-motion";
import { Scissors, Users, Award, Clock } from "lucide-react";

export function StorySection() {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-brown-50 to-primary-brown-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur rounded-full px-6 py-3 shadow-lg"
              >
                <Clock className="text-primary-brown-600" size={20} />
                <span className="text-primary-brown-700 font-semibold">
                  Heritage Since 1850
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-4xl lg:text-5xl font-serif font-bold text-gray-900"
              >
                Our Story of
                <span className="bg-gradient-to-r from-rose-gold to-primary-brown-400 bg-clip-text text-transparent">
                  {" "}
                  Craftsmanship
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-700 leading-relaxed"
              >
                For over{" "}
                <span className="font-semibold text-primary-brown-700">
                  175 years
                </span>
                , Patta Silks has been the epitome of traditional Indian textile
                artistry. Our journey began in the royal courts of South India,
                where master weavers created magnificent silk sarees for queens
                and princesses.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-700 leading-relaxed"
              >
                Today, we continue this legacy by preserving ancient weaving
                techniques while embracing contemporary design sensibilities.
                Each piece tells a story of
                <span className="font-semibold text-primary-brown-700">
                  {" "}
                  dedication, skill, and passion
                </span>
                passed down through generations.
              </motion.p>
            </div>

            {/* Stats Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-white/60 backdrop-blur rounded-2xl p-6 shadow-lg border border-primary-brown-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-gold to-primary-brown-400 rounded-full flex items-center justify-center">
                    <Scissors className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">500+</p>
                    <p className="text-sm text-gray-600">Master Artisans</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur rounded-2xl p-6 shadow-lg border border-rose-gold/30">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-gold to-primary-brown-400 rounded-full flex items-center justify-center">
                    <Award className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">50+</p>
                    <p className="text-sm text-gray-600">Awards Won</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div variants={itemVariants} className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="col-span-2 aspect-video rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.pexels.com/photos/7262340/pexels-photo-7262340.jpeg"
                  alt="Master artisan weaving silk"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Small Images */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src="https://images.pexels.com/photos/8105134/pexels-photo-8105134.jpeg"
                  alt="Traditional silk threads"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src="https://images.pexels.com/photos/6966644/pexels-photo-6966644.jpeg"
                  alt="Intricate silk patterns"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-primary-brown-500 to-primary-brown-700 text-white rounded-full p-4 shadow-xl"
            >
              <Users size={24} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
