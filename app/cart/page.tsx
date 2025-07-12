"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { useCart } from "@/contexts/CartContext"

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart()
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20" style={{ backgroundColor: "#FDFBF6" }}>
        <div className="container mx-auto px-4 py-16">
          <motion.div
            className="text-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-lilac/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-playfair font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Discover our luxury fragrances and add them to your cart to get started.
            </p>
            <Link href="/products" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: "#FDFBF6" }}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-playfair font-bold mb-4">
            Shopping <span className="text-gradient">Cart</span>
          </h1>
          <p className="text-gray-600">Review your selected fragrances before checkout</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Items ({items.length})</h2>
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>

            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-xl p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 relative flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-playfair font-bold text-lg mb-2">{item.name}</h3>
                      <div className="text-2xl font-playfair font-bold text-gold mb-4">${item.price.toFixed(2)}</div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-lilac/30 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-lilac/10 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-lilac/10 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg h-fit sticky top-24"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-playfair font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-lilac/30 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-gold">${(total * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/checkout" className="w-full btn-primary text-center block">
                Proceed to Checkout
              </Link>
              <Link href="/products" className="w-full btn-secondary text-center block">
                Continue Shopping
              </Link>
            </div>

            {/* Security Badge */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </span>
                Secure Checkout
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
