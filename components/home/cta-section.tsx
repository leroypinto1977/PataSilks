"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-brown-50 to-primary-brown-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur rounded-full px-6 py-3 shadow-lg mb-6"
              >
                <ShoppingBag className="text-primary-brown-600" size={20} />
                <span className="text-primary-brown-700 font-semibold">
                  Ready to Shop?
                </span>
              </motion.div>

              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
                Experience the Magic of
                <span className="block bg-gradient-to-r from-primary-brown-600 to-primary-brown-700 bg-clip-text text-transparent">
                  Authentic Silk
                </span>
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Step into our world of exquisite silk sarees where tradition
                meets contemporary elegance. Whether you're shopping online or
                visiting our showroom, we're here to help you find the perfect
                saree for your special moments.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center space-x-3 bg-gradient-to-r from-primary-brown-600 to-primary-brown-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <ShoppingBag size={20} />
                  <span className="font-semibold">Shop Collection</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.div>
              </Link>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center space-x-3 bg-white/80 backdrop-blur border-2 border-primary-brown-600 text-primary-brown-700 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <Phone size={20} />
                <span className="font-semibold">Book Appointment</span>
              </motion.div>
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-primary-brown-200"
            >
              {[
                { number: "175+", label: "Years Heritage" },
                { number: "500+", label: "Master Artisans" },
                { number: "10K+", label: "Happy Customers" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary-brown-700">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Contact Info & Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid gap-6">
              {/* Visit Showroom Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-brown-50/50 to-blush/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-brown-500 to-primary-brown-600 rounded-2xl flex items-center justify-center">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Visit Our Showroom
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Experience our collections in person. Our experts will
                        help you find the perfect saree.
                      </p>
                      <div className="text-sm text-gray-600">
                        <p>123 Silk Street, Fashion District</p>
                        <p>Mumbai, Maharashtra 400001</p>
                        <p className="mt-2 font-semibold">Open: 10 AM - 8 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Personal Consultation Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/20 to-primary-brown-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-gold to-primary-brown-400 rounded-2xl flex items-center justify-center">
                      <Phone size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Personal Consultation
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Get personalized styling advice from our fashion experts
                        via phone or video call.
                      </p>
                      <div className="text-sm text-gray-600">
                        <p className="font-semibold">Call: +91 98765 43210</p>
                        <p>WhatsApp: +91 98765 43210</p>
                        <p className="mt-2">Free consultation available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 pt-6"
            >
              {[
                "Free Shipping",
                "Easy Returns",
                "Authentic Guarantee",
                "Expert Support",
              ].map((badge, index) => (
                <div
                  key={index}
                  className="bg-primary-brown-100 text-primary-brown-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {badge}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
