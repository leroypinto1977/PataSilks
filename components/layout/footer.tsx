import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-primary-pink-300">
              Patta Silks
            </h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              Discover exquisite handwoven sarees, lehengas, and traditional Indian 
              textiles crafted with premium silk and timeless elegance.
            </p>
            <div className="flex space-x-4">
              <Facebook size={20} className="text-gray-200 hover:text-primary-pink-300 cursor-pointer transition-colors" />
              <Instagram size={20} className="text-gray-200 hover:text-primary-pink-300 cursor-pointer transition-colors" />
              <Twitter size={20} className="text-gray-200 hover:text-primary-pink-300 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary-pink-300">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/products" className="text-gray-200 hover:text-primary-pink-300 transition-colors text-sm">
                All Products
              </Link>
              <Link href="/products?category=sarees" className="text-gray-200 hover:text-primary-pink-300 transition-colors text-sm">
                Sarees
              </Link>
              <Link href="/products?category=lehengas" className="text-gray-200 hover:text-primary-pink-300 transition-colors text-sm">
                Lehengas
              </Link>
              <Link href="/products?category=dupattas" className="text-gray-200 hover:text-primary-pink-300 transition-colors text-sm">
                Dupattas
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary-pink-300">Customer Service</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-gray-200 hover:text-primary-pink-300 transition-colors text-sm">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-200 hover:text-primary-pink-300 transition-colors text-sm">
                Contact
              </Link>
              <Link href="/shipping" className="text-gray-200 hover:text-primary-pink-300 transition-colors text-sm">
                Shipping Info
              </Link>
              <Link href="/returns" className="text-gray-200 hover:text-primary-pink-300 transition-colors text-sm">
                Returns
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary-pink-300">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-primary-pink-300 flex-shrink-0" />
                <span className="text-gray-200 text-sm">
                  123 Silk Street, Mumbai, India
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary-pink-300 flex-shrink-0" />
                <span className="text-gray-200 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary-pink-300 flex-shrink-0" />
                <span className="text-gray-200 text-sm">info@pattasilks.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-200 text-sm">
            © {new Date().getFullYear()} Patta Silks. All rights reserved. Crafted with tradition and elegance.
          </p>
        </div>
      </div>
    </footer>
  )
}