"use client";

import { motion } from "framer-motion";
import {
  RotateCcw,
  Clock,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
} from "lucide-react";

export default function ReturnsPage() {
  const returnSteps = [
    {
      step: "1",
      title: "Contact Us",
      description:
        "Reach out to our customer service team to initiate your return.",
      icon: Mail,
    },
    {
      step: "2",
      title: "Get Return Label",
      description:
        "We'll provide you with a prepaid return label and instructions.",
      icon: RotateCcw,
    },
    {
      step: "3",
      title: "Package & Ship",
      description: "Pack your item securely and ship it back to us.",
      icon: Clock,
    },
    {
      step: "4",
      title: "Receive Refund",
      description:
        "Once we receive and inspect your return, we'll process your refund.",
      icon: CheckCircle,
    },
  ];

  const returnPolicy = [
    {
      title: "30-Day Return Window",
      description:
        "You have 30 days from the delivery date to return your items.",
      icon: Clock,
    },
    {
      title: "Original Condition",
      description:
        "Items must be in original condition with tags and packaging.",
      icon: CheckCircle,
    },
    {
      title: "Free Returns",
      description: "We provide free return shipping for all domestic returns.",
      icon: RotateCcw,
    },
    {
      title: "Quick Processing",
      description:
        "Refunds are processed within 5-7 business days of receiving your return.",
      icon: CheckCircle,
    },
  ];

  const nonReturnableItems = [
    "Custom-made or personalized items",
    "Items worn or used beyond normal try-on",
    "Items damaged by misuse or negligence",
    "Items returned after 30 days",
    "Items without original tags or packaging",
    "Sale items marked as final sale",
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
              className="inline-flex items-center space-x-2 bg-rich-beige/10 border border-rich-beige/20 rounded-full px-6 py-3 mb-6"
            >
              <RotateCcw className="text-rich-beige" size={20} />
              <span className="text-rich-beige font-semibold">
                Returns & Exchanges
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Easy Returns &<span className="text-rich-beige"> Exchanges</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto"
            >
              We want you to love your purchase. If you're not completely
              satisfied, we offer hassle-free returns and exchanges.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Return Process */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How to Return
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center relative"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-rich-beige text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>
                <div className="w-16 h-16 bg-rich-beige/10 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                  <step.icon className="w-8 h-8 text-rich-beige" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-700 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Return Policy */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Return Policy
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnPolicy.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="w-12 h-12 bg-rich-beige/10 rounded-lg flex items-center justify-center mb-4">
                  <policy.icon className="w-6 h-6 text-rich-beige" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {policy.title}
                </h3>
                <p className="text-gray-700 text-sm">{policy.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Exchange Process */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Exchanges
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Size Exchanges
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Free size exchanges within 30 days</li>
                  <li>• Available for different sizes of the same item</li>
                  <li>• Subject to stock availability</li>
                  <li>• We'll send the new size once we receive your return</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Color Exchanges
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Free color exchanges within 30 days</li>
                  <li>• Available for different colors of the same item</li>
                  <li>• Subject to stock availability</li>
                  <li>
                    • We'll send the new color once we receive your return
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Non-Returnable Items */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Non-Returnable Items
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start space-x-4 mb-6">
              <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <h3 className="text-xl font-bold text-gray-900">Please Note</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {nonReturnableItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Refund Information */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Refund Information
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Refund Timeline
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Processing time: 5-7 business days</li>
                <li>• Credit card refunds: 3-5 business days</li>
                <li>• PayPal refunds: 1-3 business days</li>
                <li>• Bank transfers: 5-10 business days</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Refund Methods
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Original payment method</li>
                <li>• Store credit (if requested)</li>
                <li>• Bank transfer (for large amounts)</li>
                <li>• PayPal (if original payment was via PayPal)</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center bg-rich-beige/5 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help with Your Return?
          </h3>
          <p className="text-gray-700 mb-6">
            Our customer service team is here to help you with any questions
            about returns or exchanges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-rich-beige text-white px-8 py-3 rounded-lg font-semibold hover:bg-rich-beige/90 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="mailto:returns@pattasilks.com"
              className="border border-rich-beige text-rich-beige px-8 py-3 rounded-lg font-semibold hover:bg-rich-beige hover:text-white transition-colors"
            >
              Email Returns Team
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
