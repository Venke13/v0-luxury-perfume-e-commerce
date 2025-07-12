"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/contexts/CartContext"

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  rating: number
}

const featuredProducts: Product[] = [
  {
    id: "product-1",
    name: "Midnight Elegance",
    price: 189,
    image: "/placeholder.svg?height=400&width=300&text=Midnight+Elegance",
    description: "A sophisticated blend of jasmine and sandalwood",
    rating: 4.8,
  },
  {
    id: "product-2",
    name: "Golden Dawn",
    price: 225,
    image: "/placeholder.svg?height=400&width=300&text=Golden+Dawn",
    description: "Citrus notes with warm amber undertones",
    rating: 4.9,
  },
  {
    id: "product-3",
    name: "Rose Mystique",
    price: 195,
    image: "/placeholder.svg?height=400&width=300&text=Rose+Mystique",
    description: "Delicate rose petals with mysterious depth",
    rating: 4.7,
  },
  {
    id: "product-4",
    name: "Ocean Breeze",
    price: 165,
    image: "/placeholder.svg?height=400&width=300&text=Ocean+Breeze",
    description: "Fresh aquatic scent with marine minerals",
    rating: 4.6,
  },
  {
    id: "product-5",
    name: "Velvet Dreams",
    price: 210,
    image: "/placeholder.svg?height=400&width=300&text=Velvet+Dreams",
    description: "Rich vanilla and exotic spices",
    rating: 4.8,
  },
]

export function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <section className="py-20 bg-gradient-to-b from-cream to-lilac/10">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-4">
            Featured <span className="text-gradient">Fragrances</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most beloved scents, carefully selected for their exceptional quality and unique character.
          </p>
        </motion.div>

        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="flex"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="w-full grid md:grid-cols-2 gap-8 p-8 bg-white/80 backdrop-blur-sm">
                  {/* Product Image */}
                  <div className="relative group">
                    <motion.div
                      className="relative h-96 bg-gradient-to-br from-lilac/20 to-gold/20 rounded-xl overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={featuredProducts[currentIndex].image || "/placeholder.svg"}
                        alt={featuredProducts[currentIndex].name}
                        fill
                        className="object-contain p-8"
                      />

                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <motion.button
                          className="p-3 bg-white rounded-full shadow-lg hover:bg-lilac transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Heart className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          className="p-3 bg-gold text-white rounded-full shadow-lg hover:bg-gold-dark transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(featuredProducts[currentIndex])}
                        >
                          <ShoppingBag className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col justify-center space-y-6">
                    <div>
                      <h3 className="text-3xl font-playfair font-bold mb-2">{featuredProducts[currentIndex].name}</h3>
                      <p className="text-gray-600 text-lg mb-4">{featuredProducts[currentIndex].description}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-gold">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < Math.floor(featuredProducts[currentIndex].rating) ? "text-gold" : "text-gray-300"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-gray-600">({featuredProducts[currentIndex].rating})</span>
                      </div>

                      <div className="text-3xl font-playfair font-bold text-gold mb-6">
                        ${featuredProducts[currentIndex].price}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        className="btn-primary flex-1"
                        onClick={() => handleAddToCart(featuredProducts[currentIndex])}
                      >
                        Add to Cart
                      </button>
                      <button className="btn-secondary">Learn More</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-gold w-8" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
