"use client";

import { motion } from "framer-motion";
import { Ruler, Info, AlertCircle } from "lucide-react";

export default function SizeGuidePage() {
  const sareeMeasurements = [
    { size: "XS", blouse: "30-32", petticoat: "28-30", length: "5.5m" },
    { size: "S", blouse: "32-34", petticoat: "30-32", length: "6m" },
    { size: "M", blouse: "34-36", petticoat: "32-34", length: "6m" },
    { size: "L", blouse: "36-38", petticoat: "34-36", length: "6.5m" },
    { size: "XL", blouse: "38-40", petticoat: "36-38", length: "6.5m" },
    { size: "XXL", blouse: "40-42", petticoat: "38-40", length: "7m" },
  ];

  const lehengaMeasurements = [
    {
      size: "XS",
      bust: "30-32",
      waist: "26-28",
      hips: "34-36",
      length: "38-40",
    },
    {
      size: "S",
      bust: "32-34",
      waist: "28-30",
      hips: "36-38",
      length: "40-42",
    },
    {
      size: "M",
      bust: "34-36",
      waist: "30-32",
      hips: "38-40",
      length: "42-44",
    },
    {
      size: "L",
      bust: "36-38",
      waist: "32-34",
      hips: "40-42",
      length: "44-46",
    },
    {
      size: "XL",
      bust: "38-40",
      waist: "34-36",
      hips: "42-44",
      length: "46-48",
    },
    {
      size: "XXL",
      bust: "40-42",
      waist: "36-38",
      hips: "44-46",
      length: "48-50",
    },
  ];

  const measuringTips = [
    {
      title: "Bust Measurement",
      description:
        "Measure around the fullest part of your chest, keeping the tape parallel to the ground.",
      icon: Ruler,
    },
    {
      title: "Waist Measurement",
      description:
        "Measure around your natural waistline, which is the narrowest part of your torso.",
      icon: Ruler,
    },
    {
      title: "Hip Measurement",
      description:
        "Measure around the fullest part of your hips, about 7-9 inches below your waist.",
      icon: Ruler,
    },
    {
      title: "Length Measurement",
      description:
        "For sarees, measure from your shoulder to the desired length. For lehengas, measure from waist to ankle.",
      icon: Ruler,
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
              <Ruler className="text-rich-beige" size={20} />
              <span className="text-rich-beige font-semibold">Size Guide</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Find Your Perfect
              <span className="text-rich-beige"> Size</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto"
            >
              Use our comprehensive size guide to find the perfect fit for your
              sarees, lehengas, and other traditional wear.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Measuring Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How to Measure
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {measuringTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-rich-beige/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <tip.icon className="w-8 h-8 text-rich-beige" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {tip.title}
                </h3>
                <p className="text-gray-700 text-sm">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Saree Size Chart */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Saree Size Chart
          </h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-rich-beige/10">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                      Size
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                      Blouse (inches)
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                      Petticoat (inches)
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                      Saree Length
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sareeMeasurements.map((measurement, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {measurement.size}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {measurement.blouse}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {measurement.petticoat}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {measurement.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Lehenga Size Chart */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Lehenga Size Chart
          </h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-rich-beige/10">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                      Size
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                      Bust (inches)
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                      Waist (inches)
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                      Hips (inches)
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                      Length (inches)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lehengaMeasurements.map((measurement, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {measurement.size}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {measurement.bust}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {measurement.waist}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {measurement.hips}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {measurement.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Important Notes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-rich-beige/5 rounded-2xl p-8"
        >
          <div className="flex items-start space-x-4 mb-6">
            <AlertCircle className="w-6 h-6 text-rich-beige flex-shrink-0 mt-1" />
            <h3 className="text-xl font-bold text-gray-900">Important Notes</h3>
          </div>
          <div className="space-y-4 text-gray-700">
            <p>
              • All measurements are in inches and are approximate. Actual
              measurements may vary slightly.
            </p>
            <p>
              • For the most accurate fit, we recommend getting professionally
              measured.
            </p>
            <p>
              • If you're between sizes, we recommend choosing the larger size
              for comfort.
            </p>
            <p>
              • Custom sizing is available for special occasions. Please contact
              us for more information.
            </p>
            <p>
              • Sarees can be adjusted by a local tailor if needed, but we
              recommend choosing the closest size.
            </p>
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help with Sizing?
          </h3>
          <p className="text-gray-700 mb-6">
            Our customer service team is here to help you find the perfect fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-rich-beige text-white px-8 py-3 rounded-lg font-semibold hover:bg-rich-beige/90 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="tel:+15551234567"
              className="border border-rich-beige text-rich-beige px-8 py-3 rounded-lg font-semibold hover:bg-rich-beige hover:text-white transition-colors"
            >
              Call Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
