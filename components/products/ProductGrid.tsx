"use client"

import { motion } from "framer-motion"
import { ProductCard } from "./ProductCard"

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

interface ProductGridProps {
  products: Product[]
  viewMode: "grid" | "list"
}

export function ProductGrid({ products, viewMode }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-playfair font-bold mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms</p>
      </div>
    )
  }

  return (
    <motion.div
      className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
      layout
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          layout
        >
          <ProductCard product={product} viewMode={viewMode} />
        </motion.div>
      ))}
    </motion.div>
  )
}
