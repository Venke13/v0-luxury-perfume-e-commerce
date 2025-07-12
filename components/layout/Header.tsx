"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { items } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-playfair font-bold text-gradient">
            Luxe Parfum
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="hover:text-gold transition-colors">
              Fragrances
            </Link>
            <Link href="/collections" className="hover:text-gold transition-colors">
              Collections
            </Link>
            <Link href="/about" className="hover:text-gold transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-gold transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-lilac/20 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/wishlist" className="p-2 hover:bg-lilac/20 rounded-full transition-colors">
              <Heart className="w-5 h-5" />
            </Link>
            <Link href="/cart" className="relative p-2 hover:bg-lilac/20 rounded-full transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link href={user ? "/profile" : "/auth"} className="p-2 hover:bg-lilac/20 rounded-full transition-colors">
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              className="md:hidden mt-4 py-4 border-t border-lilac/30"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                <Link href="/products" className="hover:text-gold transition-colors">
                  Fragrances
                </Link>
                <Link href="/collections" className="hover:text-gold transition-colors">
                  Collections
                </Link>
                <Link href="/about" className="hover:text-gold transition-colors">
                  About
                </Link>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Contact
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
