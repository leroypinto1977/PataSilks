"use client";

import { motion } from "framer-motion";
import { Mail, Gift, Sparkles } from "lucide-react";
import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-premium-beige to-warm-beige relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-rich-brown/10 to-premium-beige/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-rich-brown/10 to-premium-beige/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur rounded-full px-6 py-3 shadow-lg mb-6"
            >
              <Mail className="text-rich-brown" size={20} />
              <span className="text-rich-brown font-semibold">
                Stay Connected
              </span>
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Join Our Exclusive
              <span className="block text-rich-brown">Silk Circle</span>
            </h2>

            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Be the first to discover new collections, exclusive designs, and
              special offers. Plus, get{" "}
              <span className="text-rich-brown font-semibold">10% off</span>{" "}
              your first purchase!
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: Gift,
                title: "Exclusive Offers",
                description: "Early access to sales and special discounts",
              },
              {
                icon: Sparkles,
                title: "New Collections",
                description: "First to know about latest designs and arrivals",
              },
              {
                icon: Mail,
                title: "Style Tips",
                description: "Expert advice on styling and caring for silk",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-rich-brown rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <benefit.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Subscription Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-lg mx-auto"
          >
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Welcome to the Silk Circle!
                </h3>
                <p className="text-green-600">
                  Check your email for your exclusive 10% discount code.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-6 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-rich-brown focus:ring-2 focus:ring-rich-brown/20 transition-all duration-200"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-8 py-4 bg-rich-brown text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Subscribe
                  </motion.button>
                </div>
                <p className="text-sm text-gray-600">
                  By subscribing, you agree to our privacy policy. Unsubscribe
                  anytime.
                </p>
              </form>
            )}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-600"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-sm">5000+ Happy Customers</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-rich-brown rounded-full" />
              <span className="text-sm">Weekly Style Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-rich-brown rounded-full" />
              <span className="text-sm">No Spam, Ever</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
