"use client";

import { motion } from "framer-motion";
import {
  FileText,
  AlertCircle,
  Shield,
  CreditCard,
  Truck,
  RotateCcw,
} from "lucide-react";

export default function TermsPage() {
  const termsSections = [
    {
      title: "Acceptance of Terms",
      icon: FileText,
      content: [
        "By accessing and using our website, you accept and agree to be bound by these terms and conditions.",
        "If you do not agree to these terms, please do not use our website or services.",
        "We reserve the right to modify these terms at any time without prior notice.",
        "Your continued use of our website after changes constitutes acceptance of the new terms.",
      ],
    },
    {
      title: "Use of Website",
      icon: Shield,
      content: [
        "You may use our website for lawful purposes only.",
        "You agree not to use the website in any way that could damage, disable, or impair the website.",
        "You may not attempt to gain unauthorized access to any part of the website.",
        "You agree to provide accurate and complete information when making purchases.",
      ],
    },
    {
      title: "Product Information",
      icon: AlertCircle,
      content: [
        "We strive to provide accurate product descriptions and images.",
        "Colors may vary slightly due to monitor settings and lighting conditions.",
        "Product availability is subject to stock levels.",
        "We reserve the right to modify product information without prior notice.",
      ],
    },
    {
      title: "Orders and Payment",
      icon: CreditCard,
      content: [
        "All orders are subject to acceptance and availability.",
        "We reserve the right to refuse or cancel any order at our discretion.",
        "Payment must be received before order processing begins.",
        "We accept various payment methods including credit cards and PayPal.",
      ],
    },
    {
      title: "Shipping and Delivery",
      icon: Truck,
      content: [
        "Shipping times are estimates and may vary due to various factors.",
        "We are not responsible for delays caused by shipping carriers.",
        "Risk of loss transfers to you upon delivery to the carrier.",
        "We reserve the right to change shipping methods at our discretion.",
      ],
    },
    {
      title: "Returns and Exchanges",
      icon: RotateCcw,
      content: [
        "Returns must be made within 30 days of delivery.",
        "Items must be in original condition with tags attached.",
        "Custom-made items are not eligible for return.",
        "We reserve the right to refuse returns that do not meet our criteria.",
      ],
    },
  ];

  const limitations = [
    "We are not liable for any indirect, incidental, or consequential damages",
    "Our total liability shall not exceed the amount paid for the product",
    "We are not responsible for third-party actions or services",
    "We do not guarantee uninterrupted or error-free service",
    "We are not liable for any loss of data or information",
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
              <FileText className="text-rich-brown" size={20} />
              <span className="text-rich-brown font-semibold">
                Terms of Service
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Terms of
              <span className="text-rich-brown"> Service</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto"
            >
              Please read these terms and conditions carefully before using our
              website or making a purchase. These terms govern your use of our
              services.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-rich-brown/5 rounded-2xl p-6 mb-12"
        >
          <p className="text-gray-700">
            <strong>Last Updated:</strong> December 2024
          </p>
          <p className="text-gray-700 mt-2">
            These Terms of Service govern your use of the Patta Silks website
            and services. By using our website, you agree to be bound by these
            terms.
          </p>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-12">
          {termsSections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-rich-brown/10 rounded-lg flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-rich-brown" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-rich-brown rounded-full flex-shrink-0 mt-2"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>

        {/* Intellectual Property */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Intellectual Property
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              All content on this website, including text, graphics, logos,
              images, and software, is the property of Patta Silks and is
              protected by copyright and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, or create derivative works from
              our content without our express written permission.
            </p>
            <p>
              Our trademarks and service marks are protected and may not be used
              without our permission.
            </p>
          </div>
        </motion.section>

        {/* Limitation of Liability */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Limitation of Liability
          </h2>
          <p className="text-gray-700 mb-4">
            To the maximum extent permitted by law, Patta Silks shall not be
            liable for:
          </p>
          <ul className="space-y-2">
            {limitations.map((limitation, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-rich-brown rounded-full flex-shrink-0 mt-2"></div>
                <span className="text-gray-700">{limitation}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Governing Law */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Governing Law
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              These terms shall be governed by and construed in accordance with
              the laws of India, without regard to conflict of law principles.
            </p>
            <p>
              Any disputes arising from these terms or your use of our website
              shall be subject to the exclusive jurisdiction of the courts in
              Mumbai, India.
            </p>
          </div>
        </motion.section>

        {/* Contact Information */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-12 bg-rich-brown/5 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about these Terms of Service, please
            contact us:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-700">legal@pattasilks.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-700">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-700">
                123 Silk Street, Mumbai, India 400001
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Legal Department
              </h3>
              <p className="text-gray-700">legal@pattasilks.com</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
