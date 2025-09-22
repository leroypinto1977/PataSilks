"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";
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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Header() {
  const { user, signOut, isAdmin, isLoading, refreshProfile } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const mounted = useMounted();
  
  // Refs for GSAP animations
  const headerRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const header = headerRef.current;
    const background = backgroundRef.current;
    
    if (!header || !background) return;

    // Set initial state - completely transparent
    gsap.set(background, {
      opacity: 0,
      backdropFilter: "blur(0px)",
      boxShadow: "0 0 0 rgba(232, 180, 184, 0)",
    });

    // Create scroll trigger for glass morphism effect
    ScrollTrigger.create({
      trigger: "body",
      start: "50px top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = Math.min(self.progress * 3, 1); // Speed up the transition
        
        gsap.to(background, {
          duration: 0.3,
          ease: "power2.out",
          opacity: progress,
          backdropFilter: `blur(${progress * 20}px)`,
          boxShadow: `0 4px 20px rgba(232, 180, 184, ${progress * 0.15})`,
        });
      },
      onToggle: (self) => {
        if (self.isActive) {
          // Scrolled past trigger point
          gsap.to(background, {
            duration: 0.4,
            ease: "power2.out",
            opacity: 1,
            backdropFilter: "blur(20px)",
            boxShadow: "0 4px 20px rgba(232, 180, 184, 0.15)",
          });
        } else {
          // Back to top
          gsap.to(background, {
            duration: 0.4,
            ease: "power2.out",
            opacity: 0,
            backdropFilter: "blur(0px)",
            boxShadow: "0 0 0 rgba(232, 180, 184, 0)",
          });
        }
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [mounted]);

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  if (!mounted || isLoading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Glass Background */}
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm border-b border-primary-pink-200/30" />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center space-x-2"
              >
                <Sparkles className="h-8 w-8 text-primary-pink-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary-pink-400 to-rose-gold bg-clip-text text-transparent">
                  Patta Silks
                </span>
              </motion.div>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-8 bg-primary-pink-100 animate-pulse rounded"></div>
              <div className="w-8 h-8 bg-primary-pink-100 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

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
        ref={backgroundRef}
        className="absolute inset-0 bg-white/90 border-b border-primary-pink-200/50 shadow-lg"
        style={{
          backdropFilter: "blur(0px)",
          opacity: 0,
        }}
      />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 bg-gradient-to-r from-primary-pink-300 to-rose-gold rounded-lg flex items-center justify-center shadow-lg"
            >
              <Sparkles size={16} className="text-white" />
            </motion.div>
            <motion.h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-primary-pink-400 to-rose-gold bg-clip-text text-transparent group-hover:from-rose-gold group-hover:to-primary-pink-400 transition-all duration-300">
              Patta Silks
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { href: "/products", label: "Products" },
              { href: "/products?category=sarees", label: "Sarees" },
              { href: "/products?category=lehengas", label: "Lehengas" },
              { href: "/products?newArrivals=true", label: "New Arrivals" },
            ].map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className="relative text-gray-700 hover:text-primary-pink-400 transition-colors font-medium group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-pink-400 to-rose-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/cart"
                className="relative p-2 text-gray-700 hover:text-primary-pink-400 transition-colors group"
              >
                <ShoppingCart size={24} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-pink-400 to-rose-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-primary-pink-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              </Link>
            </motion.div>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar className="h-10 w-10 ring-2 ring-primary-pink-200 hover:ring-primary-pink-300 transition-all duration-200">
                        <AvatarFallback className="bg-gradient-to-r from-primary-pink-100 to-rose-gold/20 text-primary-pink-600 font-semibold">
                          {user.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      {isAdmin && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border border-white"></div>
                      )}
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-white/95 backdrop-blur-lg border border-primary-pink-200/50"
                  align="end"
                  forceMount
                >
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium text-gray-900">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-600">
                      {isAdmin ? (
                        <span className="inline-flex items-center space-x-1">
                          <span className="w-2 h-2 bg-primary-pink-400 rounded-full"></span>
                          <span>Administrator</span>
                        </span>
                      ) : (
                        "Customer"
                      )}
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/auth/signin">
                  <Button className="bg-gradient-to-r from-primary-pink-400 to-rose-gold hover:from-rose-gold hover:to-primary-pink-400 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                    <User size={16} className="mr-2" />
                    Sign In
                  </Button>
                </Link>
              </motion.div>
            )}

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 text-gray-700 hover:text-primary-pink-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
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
              className="md:hidden border-t border-primary-pink-200/50"
            >
              {/* Mobile Glass Background */}
              <div className="absolute inset-0 bg-white/90 backdrop-blur-xl" />
              
              {/* Mobile Content */}
              <div className="relative py-4">
                <div className="flex flex-col space-y-1">
                  {[
                    { href: "/products", label: "Products" },
                    { href: "/products?category=sarees", label: "Sarees" },
                    { href: "/products?category=lehengas", label: "Lehengas" },
                    {
                      href: "/products?newArrivals=true",
                      label: "New Arrivals",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-gray-700 hover:text-primary-pink-400 hover:bg-primary-pink-50 transition-all duration-200 rounded-lg mx-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}

                  {user ? (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      className="px-4 py-3 border-t border-primary-pink-200/50 mt-2 mx-2"
                    >
                      <p className="text-sm text-gray-600 mb-3 font-medium">
                        {user.email}
                      </p>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="block py-2 text-gray-700 hover:text-primary-pink-400 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="flex items-center space-x-2">
                            <Settings size={16} />
                            <span>Admin Dashboard</span>
                          </div>
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 py-2 text-red-600 hover:text-red-700 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      className="px-2 pt-3"
                    >
                      <Link
                        href="/auth/signin"
                        className="block w-full bg-gradient-to-r from-primary-pink-400 to-rose-gold text-white text-center py-3 rounded-lg font-medium shadow-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
