"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Clock,
  Shield,
  Globe,
  Package,
  CheckCircle,
} from "lucide-react";

export default function ShippingPage() {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      duration: "5-7 business days",
      price: "Free on orders over $100",
      description: "Our standard shipping option for domestic orders.",
      icon: Truck,
    },
    {
      name: "Express Shipping",
      duration: "2-3 business days",
      price: "$15",
      description: "Fast delivery for urgent orders within the country.",
      icon: Clock,
    },
    {
      name: "International Shipping",
      duration: "7-14 business days",
      price: "Varies by location",
      description: "Worldwide shipping to most countries.",
      icon: Globe,
    },
    {
      name: "Premium Shipping",
      duration: "1-2 business days",
      price: "$25",
      description: "White-glove service with insurance and tracking.",
      icon: Shield,
    },
  ];

  const shippingFeatures = [
    {
      title: "Secure Packaging",
      description:
        "All items are carefully packaged in premium materials to ensure they arrive in perfect condition.",
      icon: Package,
    },
    {
      title: "Real-time Tracking",
      description:
        "Track your order from our warehouse to your doorstep with detailed updates.",
      icon: CheckCircle,
    },
    {
      title: "Insurance Included",
      description:
        "All shipments are insured against loss or damage during transit.",
      icon: Shield,
    },
    {
      title: "Worldwide Delivery",
      description:
        "We ship to over 50 countries worldwide with reliable delivery partners.",
      icon: Globe,
    },
  ];

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
    "Japan",
    "South Korea",
    "Singapore",
    "Hong Kong",
    "UAE",
    "Saudi Arabia",
    "India",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-premium-beige to-warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 bg-rich-brown/10 border border-rich-brown/20 rounded-full px-6 py-3 mb-6"
            >
              <Truck className="text-rich-brown" size={20} />
              <span className="text-rich-brown font-semibold">
                Shipping Information
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Fast & Secure
              <span className="text-rich-brown"> Delivery</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto"
            >
              We ensure your precious silk sarees and traditional wear reach you
              safely and on time, no matter where you are in the world.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Shipping Options */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Shipping Options
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-rich-brown/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <option.icon className="w-8 h-8 text-rich-brown" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {option.name}
                </h3>
                <p className="text-rich-brown font-semibold mb-2">
                  {option.duration}
                </p>
                <p className="text-gray-600 font-semibold mb-3">
                  {option.price}
                </p>
                <p className="text-gray-700 text-sm">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Shipping Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Our Shipping?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="w-12 h-12 bg-rich-brown/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-rich-brown" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Delivery Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Delivery Timeline
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-rich-brown/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-rich-brown" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Order Processing
                </h3>
                <p className="text-gray-700">1-2 business days</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-rich-brown/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-rich-brown" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Packaging
                </h3>
                <p className="text-gray-700">Same day</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-rich-brown/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-rich-brown" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Transit
                </h3>
                <p className="text-gray-700">2-14 days depending on service</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* International Shipping */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            International Shipping
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Countries We Ship To
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {countries.map((country, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 text-sm">{country}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Important Notes
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Customs duties and taxes may apply</li>
                  <li>• Delivery times may vary due to customs processing</li>
                  <li>
                    • Some countries may have restrictions on silk imports
                  </li>
                  <li>• We provide all necessary documentation</li>
                  <li>• Tracking is available for all international orders</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-rich-brown/5 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Shipping FAQ
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                How do I track my order?
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                You'll receive a tracking number via email once your order
                ships. Use this number on our website or the carrier's website.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">
                Can I change my shipping address?
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                You can change your shipping address within 2 hours of placing
                your order. After that, contact our customer service.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What if my package is damaged?
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Contact us immediately with photos of the damage. We'll arrange
                for a replacement or refund.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">
                Do you offer same-day delivery?
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Same-day delivery is available in select cities for orders
                placed before 12 PM.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
