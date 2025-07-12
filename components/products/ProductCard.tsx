"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Eye, Star } from "lucide-react"
import { useCart } from "@/contexts/CartContext"

interface Product {
  id: string
  name: string
  price: number
  description: string
  scent_notes: string[]
  category: string
  rating: number
  stock: number
  images: string[]
}

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  if (viewMode === "list") {
    return (
      <Link href={`/products/${product.id}`}>
        <motion.div
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex gap-6"
          whileHover={{ y: -2 }}
        >
          <div className="w-32 h-32 relative flex-shrink-0">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain rounded-lg"
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-playfair font-bold">{product.name}</h3>
              <div className="text-2xl font-playfair font-bold text-gold">${product.price}</div>
            </div>

            <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-gold text-gold" />
                <span className="text-sm">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-gray-500">{product.category}</span>
              <span className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="flex gap-2 mb-4">
              {product.scent_notes.slice(0, 3).map((note) => (
                <span key={note} className="px-2 py-1 bg-lilac/20 text-xs rounded-full">
                  {note}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={handleAddToCart} className="btn-primary flex-1 text-sm" disabled={product.stock === 0}>
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`p-2 rounded-lg border transition-colors ${
                  isWishlisted ? "bg-red-50 border-red-200 text-red-600" : "border-lilac/30 hover:bg-lilac/10"
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>
        </motion.div>
      </Link>
    )
  }

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <motion.button
              onClick={handleWishlist}
              className={`p-3 rounded-full shadow-lg transition-colors ${
                isWishlisted ? "bg-red-500 text-white" : "bg-white text-gray-700 hover:bg-lilac"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
            </motion.button>

            <motion.button
              className="p-3 bg-white rounded-full shadow-lg hover:bg-lilac transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={handleAddToCart}
              className="p-3 bg-gold text-white rounded-full shadow-lg hover:bg-gold-dark transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={product.stock === 0}
            >
              <ShoppingBag className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Stock Badge */}
          {product.stock === 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-gold text-gold" />
              <span className="text-sm">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{product.category}</span>
          </div>

          <h3 className="text-lg font-playfair font-bold mb-2 group-hover:text-gold transition-colors">
            {product.name}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

          <div className="flex gap-1 mb-4">
            {product.scent_notes.slice(0, 2).map((note) => (
              <span key={note} className="px-2 py-1 bg-lilac/20 text-xs rounded-full">
                {note}
              </span>
            ))}
            {product.scent_notes.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">+{product.scent_notes.length - 2}</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-playfair font-bold text-gold">${product.price}</div>
            <button onClick={handleAddToCart} className="btn-primary text-sm px-4 py-2" disabled={product.stock === 0}>
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
