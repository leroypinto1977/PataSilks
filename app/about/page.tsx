"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Users, Clock, Heart } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { icon: Users, value: "15,000+", label: "Happy Customers" },
    { icon: Award, value: "50+", label: "Awards Won" },
    { icon: Clock, value: "175+", label: "Years of Heritage" },
    { icon: Heart, value: "500+", label: "Master Artisans" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-premium-beige to-warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Our Story of
              <span className="text-rich-brown"> Heritage</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto"
            >
              For over 175 years, we have been crafting exquisite silk sarees
              and traditional textiles, preserving ancient techniques while
              embracing modern elegance.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-rich-brown/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-rich-brown" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                A Legacy of Excellence
              </h2>
              <div className="space-y-6 text-gray-700">
                <p>
                  Founded in 1850, Patta Silks began as a small family business
                  in the royal courts of South India. Our master weavers created
                  magnificent silk sarees for queens and princesses,
                  establishing a tradition of unparalleled craftsmanship.
                </p>
                <p>
                  Today, we continue this legacy by preserving ancient weaving
                  techniques while embracing contemporary design sensibilities.
                  Each piece tells a story of dedication, skill, and passion
                  passed down through generations.
                </p>
                <p>
                  Our commitment to quality and authenticity has made us a
                  trusted name in luxury Indian textiles, serving customers
                  worldwide with the finest silk sarees, lehengas, and
                  traditional wear.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/7262340/pexels-photo-7262340.jpeg"
                alt="Master artisan weaving silk"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-20 bg-premium-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Craftsmanship
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Every piece is handcrafted by skilled artisans using traditional
              techniques passed down through generations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-rich-brown/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-rich-brown" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Premium Materials
              </h3>
              <p className="text-gray-700">
                We source only the finest silk threads and materials from
                trusted suppliers across India.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-rich-brown/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-rich-brown" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Master Artisans
              </h3>
              <p className="text-gray-700">
                Our skilled craftsmen bring decades of experience and
                traditional knowledge to every creation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-rich-brown/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-rich-brown" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Attention to Detail
              </h3>
              <p className="text-gray-700">
                Every stitch, every pattern, every detail is carefully crafted
                to perfection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              To preserve and promote the rich heritage of Indian textile
              craftsmanship while creating contemporary pieces that celebrate
              tradition and embrace modern elegance. We are committed to
              supporting our artisan community and ensuring that these beautiful
              traditions continue to thrive for generations to come.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
