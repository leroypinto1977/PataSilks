"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useWishlist } from "@/lib/wishlist-context";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  Settings,
  Sparkles,
  Search,
  Heart,
} from "lucide-react";
import { SearchModal } from "@/components/search/search-modal";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";
import { animations, animationPresets } from "@/lib/animations";

export function Header() {
  const { user, signOut, isAdmin, isLoading, refreshProfile } = useAuth();
  const { getTotalItems } = useCart();
  const { state: wishlistState } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mounted = useMounted();
  const headerRef = useRef<HTMLElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const totalItems = mounted ? getTotalItems() : 0;

  const navigationItems = [
    { href: "/products", label: "Sarees" },
    { href: "/products?newArrivals=true", label: "New Arrivals" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Glass Morphism Background */}
      <div
        className={`absolute inset-0 backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 border-b border-rich-beige/20 shadow-lg"
            : "bg-white/90 border-b border-rich-beige/10"
        }`}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-3">
            {/* <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-br from-rich-beige to-rich-beige/80 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div> */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col"
            >
              <h1 className="text-2xl font-sans font-bold bg-gradient-to-r from-gray-900 to-rich-beige bg-clip-text text-transparent">
                Patta Silks
              </h1>
              {/* <p className="text-xs text-gray-600 -mt-1">Premium Sarees</p> */}
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="relative text-gray-700 hover:text-rich-beige font-sans font-medium transition-colors duration-300 group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rich-beige transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-rich-beige/10 hover:bg-rich-beige/20 text-gray-700 transition-colors duration-300"
            >
              <Search size={18} />
            </motion.button>

            {/* Wishlist */}
            <Link href="/wishlist">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-rich-beige/10 hover:bg-rich-beige/20 text-gray-700 transition-colors duration-300"
              >
                <Heart size={18} />
                {wishlistState.itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-rich-beige text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg"
                  >
                    {wishlistState.itemCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-rich-beige/10 hover:bg-rich-beige/20 text-gray-700 transition-colors duration-300"
              >
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-rich-beige text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* User Menu */}
            {mounted && !isLoading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 p-2 rounded-full hover:bg-rich-beige/10 transition-colors duration-300"
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-rich-beige text-white font-semibold">
                            {user.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-3 py-2">
                        <p className="text-sm font-medium text-gray-900">
                          {user.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          {isAdmin ? "Administrator" : "Customer"}
                        </p>
                      </div>
                      <DropdownMenuSeparator />
                      {isAdmin && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/admin" className="cursor-pointer">
                              <Settings className="mr-2 h-4 w-4" />
                              Admin Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="cursor-pointer text-red-600 hover:text-red-700"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link href="/auth/signin">
                      <Button className="bg-rich-beige hover:bg-rich-beige/90 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <User size={16} className="mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-rich-beige/10 hover:bg-rich-beige/20 text-gray-700 transition-colors duration-300"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-rich-beige/20"
            >
              <div className="absolute inset-0 bg-white/95 backdrop-blur-md" />
              <div className="relative py-6">
                <div className="flex flex-col space-y-2">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-3 text-gray-700 hover:text-rich-beige hover:bg-rich-beige/5 rounded-lg font-sans font-medium transition-colors duration-300"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </motion.header>
  );
}
