import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-rich-beige">Patta Silks</h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              Discover exquisite handwoven sarees crafted with premium silk and
              timeless elegance. From Kanjivaram to Banarasi, we bring you the
              finest traditional Indian textiles.
            </p>
            <div className="flex space-x-4">
              <Facebook
                size={20}
                className="text-gray-200 hover:text-rich-beige cursor-pointer transition-colors"
              />
              <Instagram
                size={20}
                className="text-gray-200 hover:text-rich-beige cursor-pointer transition-colors"
              />
              <Twitter
                size={20}
                className="text-gray-200 hover:text-rich-beige cursor-pointer transition-colors"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-rich-beige">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/products"
                className="text-gray-200 hover:text-rich-beige transition-colors text-sm"
              >
                All Sarees
              </Link>
              <Link
                href="/products?category=kanjivaram"
                className="text-gray-200 hover:text-rich-beige transition-colors text-sm"
              >
                Kanjivaram
              </Link>
              <Link
                href="/products?category=banarasi"
                className="text-gray-200 hover:text-rich-beige transition-colors text-sm"
              >
                Banarasi
              </Link>
              <Link
                href="/products?category=chanderi"
                className="text-gray-200 hover:text-rich-beige transition-colors text-sm"
              >
                Chanderi
              </Link>
              <Link
                href="/products?newArrivals=true"
                className="text-gray-200 hover:text-rich-beige transition-colors text-sm"
              >
                New Arrivals
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-rich-beige">
              Customer Service
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="text-gray-200 hover:text-rich-beige transition-colors text-sm"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-200 hover:text-rich-beige transition-colors text-sm"
              >
                Contact
              </Link>
              <Link
                href="/shipping"
                className="text-gray-200 hover:text-rich-beige transition-colors text-sm"
              >
                Shipping Info
              </Link>
              <Link
                href="/returns"
                className="text-gray-200 hover:text-rich-beige transition-colors text-sm"
              >
                Returns
              </Link>
              <Link
                href="/size-guide"
                className="text-gray-200 hover:text-rich-beige transition-colors text-sm"
              >
                Size Guide
              </Link>
            </nav>
          </div>

          {/* Help & Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-rich-beige">
              Help & Support
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/faq"
                className="text-gray-200 hover:text-rich-beige transition-colors text-sm"
              >
                FAQ
              </Link>
              <Link
                href="/size-guide"
                className="text-gray-200 hover:text-rich-beige transition-colors text-sm"
              >
                Size Guide
              </Link>
              <Link
                href="/shipping"
                className="text-gray-200 hover:text-rich-beige transition-colors text-sm"
              >
                Shipping
              </Link>
              <Link
                href="/returns"
                className="text-gray-200 hover:text-rich-beige transition-colors text-sm"
              >
                Returns
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-rich-beige">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-rich-beige flex-shrink-0" />
                <span className="text-gray-200 text-sm">
                  123 Silk Street, Mumbai, India
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-rich-beige flex-shrink-0" />
                <span className="text-gray-200 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-rich-beige flex-shrink-0" />
                <span className="text-gray-200 text-sm">
                  info@pattasilks.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-200 text-sm">
              © {new Date().getFullYear()} Patta Silks. All rights reserved.
              Crafted with tradition and elegance.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-200 hover:text-rich-beige transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-200 hover:text-rich-beige transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
