"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, User, Mail, Phone } from "lucide-react";

export default function PrivacyPage() {
  const privacySections = [
    {
      title: "Information We Collect",
      icon: User,
      content: [
        "Personal information (name, email, phone number, shipping address)",
        "Payment information (processed securely through third-party providers)",
        "Order history and preferences",
        "Website usage data and analytics",
        "Communication preferences",
      ],
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        "Process and fulfill your orders",
        "Provide customer support and service",
        "Send order updates and shipping notifications",
        "Improve our website and services",
        "Send marketing communications (with your consent)",
      ],
    },
    {
      title: "Information Sharing",
      icon: Shield,
      content: [
        "We do not sell your personal information to third parties",
        "We may share information with service providers (shipping, payment processing)",
        "We may share information if required by law",
        "We may share information to protect our rights or safety",
        "We may share information in case of business transfers",
      ],
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "We use industry-standard encryption to protect your data",
        "We implement secure servers and databases",
        "We regularly update our security measures",
        "We limit access to personal information to authorized personnel",
        "We use secure payment processing systems",
      ],
    },
  ];

  const rights = [
    "Access your personal information",
    "Correct inaccurate information",
    "Delete your personal information",
    "Object to processing of your information",
    "Data portability",
    "Withdraw consent for marketing communications",
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
              <Shield className="text-rich-beige" size={20} />
              <span className="text-rich-beige font-semibold">
                Privacy Policy
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Your Privacy
              <span className="text-rich-beige"> Matters</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto"
            >
              We are committed to protecting your privacy and ensuring the
              security of your personal information. This policy explains how we
              collect, use, and protect your data.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-rich-beige/5 rounded-2xl p-6 mb-12"
        >
          <p className="text-gray-700">
            <strong>Last Updated:</strong> December 2024
          </p>
          <p className="text-gray-700 mt-2">
            This Privacy Policy describes how Patta Silks collects, uses, and
            protects your personal information when you visit our website or
            make a purchase.
          </p>
        </motion.div>

        {/* Privacy Sections */}
        <div className="space-y-12">
          {privacySections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-rich-beige/10 rounded-lg flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-rich-beige" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-rich-beige rounded-full flex-shrink-0 mt-2"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>

        {/* Your Rights */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights</h2>
          <p className="text-gray-700 mb-6">
            You have the following rights regarding your personal information:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {rights.map((right, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-rich-beige rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">{right}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Cookies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              We use cookies to enhance your browsing experience, analyze site
              traffic, and personalize content. You can control cookie settings
              through your browser preferences.
            </p>
            <p>
              <strong>Types of cookies we use:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Essential cookies for website functionality</li>
              <li>Analytics cookies to understand user behavior</li>
              <li>Marketing cookies for personalized advertising</li>
              <li>Preference cookies to remember your settings</li>
            </ul>
          </div>
        </motion.section>

        {/* Third-Party Services */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Third-Party Services
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              We may use third-party services for payment processing, shipping,
              analytics, and marketing. These services have their own privacy
              policies and data practices.
            </p>
            <p>
              <strong>Third-party services we use:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Payment processors (Stripe, PayPal)</li>
              <li>Shipping providers (FedEx, UPS, DHL)</li>
              <li>Analytics services (Google Analytics)</li>
              <li>Email marketing platforms</li>
              <li>Customer support tools</li>
            </ul>
          </div>
        </motion.section>

        {/* Contact Information */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-rich-beige/5 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-700">privacy@pattasilks.com</p>
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
                Data Protection Officer
              </h3>
              <p className="text-gray-700">dpo@pattasilks.com</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
