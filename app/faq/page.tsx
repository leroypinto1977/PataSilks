"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "General Questions",
      items: [
        {
          question: "What makes Patta Silks special?",
          answer:
            "Patta Silks has been crafting exquisite silk sarees for over 175 years, combining traditional techniques with modern elegance. Our master artisans use only the finest materials and time-honored weaving methods to create each piece.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship worldwide! We offer secure international shipping to most countries. Shipping costs and delivery times vary by location. Please check our shipping page for detailed information.",
        },
        {
          question: "How can I track my order?",
          answer:
            "Once your order is shipped, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.",
        },
      ],
    },
    {
      title: "Product Information",
      items: [
        {
          question: "How do I choose the right size?",
          answer:
            "We provide detailed size charts for each product. For sarees, we recommend measuring your blouse and petticoat sizes. Our customer service team is also available to help you find the perfect fit.",
        },
        {
          question: "Are your products authentic?",
          answer:
            "Absolutely! All our products are 100% authentic and come with certificates of authenticity. We source our materials directly from trusted suppliers and work only with certified artisans.",
        },
        {
          question: "Do you offer custom designs?",
          answer:
            "Yes, we offer custom design services for special occasions. Please contact our design team with your requirements, and we'll work with you to create a unique piece.",
        },
      ],
    },
    {
      title: "Orders & Shipping",
      items: [
        {
          question: "How long does shipping take?",
          answer:
            "Domestic orders typically arrive within 3-5 business days. International shipping takes 7-14 business days depending on the destination. Express shipping options are available for urgent orders.",
        },
        {
          question: "What if my order is damaged?",
          answer:
            "We take great care in packaging your orders. If you receive a damaged item, please contact us immediately with photos, and we'll arrange for a replacement or refund.",
        },
        {
          question: "Can I modify or cancel my order?",
          answer:
            "You can modify or cancel your order within 2 hours of placing it. After that, the order enters our production process and cannot be changed.",
        },
      ],
    },
    {
      title: "Returns & Exchanges",
      items: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for unused items in original condition. Custom-made items and sale items are not eligible for returns. Please keep your receipt and original packaging.",
        },
        {
          question: "How do I return an item?",
          answer:
            "To return an item, contact our customer service team to initiate the return process. We'll provide you with a return label and instructions. Returns are processed within 5-7 business days of receipt.",
        },
        {
          question: "Do you offer exchanges?",
          answer:
            "Yes, we offer exchanges for different sizes or colors, subject to availability. Exchange requests must be made within 30 days of purchase.",
        },
      ],
    },
    {
      title: "Care & Maintenance",
      items: [
        {
          question: "How should I care for my silk saree?",
          answer:
            "Silk sarees should be dry cleaned only. Store them in a cool, dry place, preferably in a cotton bag. Avoid direct sunlight and moisture. Iron on low heat with a cloth between the iron and fabric.",
        },
        {
          question: "Can I wash my silk saree at home?",
          answer:
            "We strongly recommend professional dry cleaning for silk sarees to maintain their quality and longevity. Home washing can damage the fabric and affect the color and texture.",
        },
        {
          question: "How should I store my saree?",
          answer:
            "Store your saree in a cotton or muslin bag in a cool, dry place. Avoid plastic bags as they can trap moisture. Fold carefully to avoid creases, or hang on a padded hanger.",
        },
      ],
    },
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
              <HelpCircle className="text-rich-beige" size={20} />
              <span className="text-rich-beige font-semibold">
                Frequently Asked Questions
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              How Can We
              <span className="text-rich-beige"> Help You?</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto"
            >
              Find answers to common questions about our products, shipping,
              returns, and more.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {category.title}
              </h2>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 10 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);

                  return (
                    <div
                      key={itemIndex}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900">
                          {item.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 text-gray-700">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 bg-rich-beige/5 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-700 mb-6">
            Can't find the answer you're looking for? Our customer service team
            is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-rich-beige text-white px-8 py-3 rounded-lg font-semibold hover:bg-rich-beige/90 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="mailto:support@pattasilks.com"
              className="border border-rich-beige text-rich-beige px-8 py-3 rounded-lg font-semibold hover:bg-rich-beige hover:text-white transition-colors"
            >
              Email Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
