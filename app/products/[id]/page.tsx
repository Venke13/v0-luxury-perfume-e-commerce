"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Heart, ShoppingBag, Star, Minus, Plus, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { supabase, type Product } from "@/lib/supabase"
import { useCart } from "@/contexts/CartContext"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState("description")

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*").eq("id", params.id).single()

      if (error) throw error
      setProduct(data)
    } catch (error) {
      console.error("Error fetching product:", error)
      router.push("/products")
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
    })
  }

  const handleWishlist = async () => {
    // Implement wishlist functionality with Supabase
    setIsWishlisted(!isWishlisted)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FDFBF6" }}>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gold"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FDFBF6" }}>
        <div className="text-center">
          <h2 className="text-2xl font-playfair font-bold mb-4">Product not found</h2>
          <button onClick={() => router.push("/products")} className="btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: "#FDFBF6" }}>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.nav
          className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button onClick={() => router.push("/")} className="hover:text-gold transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => router.push("/products")} className="hover:text-gold transition-colors">
            Products
          </button>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-8"
                priority
              />

              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-gold" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-lilac/20 text-sm rounded-full">{product.category}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-gold text-gold" />
                  <span className="text-sm">{product.rating.toFixed(1)}</span>
                </div>
              </div>

              <h1 className="text-4xl font-playfair font-bold mb-4">{product.name}</h1>
              <div className="text-3xl font-playfair font-bold text-gold mb-6">${product.price}</div>
            </div>

            {/* Scent Notes */}
            <div>
              <h3 className="font-semibold mb-3">Scent Notes</h3>
              <div className="flex flex-wrap gap-2">
                {product.scent_notes.map((note) => (
                  <span key={note} className="px-3 py-1 bg-white border border-lilac/30 rounded-full text-sm">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-lilac/30 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-lilac/10 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 hover:bg-lilac/10 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: product.stock > 0 ? 1.02 : 1 }}
                whileTap={{ scale: product.stock > 0 ? 0.98 : 1 }}
              >
                <ShoppingBag className="w-5 h-5" />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </motion.button>

              <motion.button
                onClick={handleWishlist}
                className={`p-3 rounded-lg border transition-colors ${
                  isWishlisted ? "bg-red-50 border-red-200 text-red-600" : "border-lilac/30 hover:bg-lilac/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </motion.button>

              <motion.button
                className="p-3 border border-lilac/30 rounded-lg hover:bg-lilac/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Product Details Tabs */}
            <div className="border-t border-lilac/30 pt-6">
              <div className="flex space-x-6 mb-4">
                {["description", "ingredients", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 border-b-2 transition-colors capitalize ${
                      activeTab === tab
                        ? "border-gold text-gold"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "description" && (
                    <div className="prose prose-gray max-w-none">
                      <p>{product.description}</p>
                    </div>
                  )}

                  {activeTab === "ingredients" && (
                    <div>
                      <h4 className="font-semibold mb-2">Key Ingredients</h4>
                      <ul className="space-y-1">
                        {product.scent_notes.map((note) => (
                          <li key={note} className="text-gray-600">
                            • {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-gold text-gold" />
                          <span className="text-lg font-semibold">{product.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-gray-600">Based on customer reviews</span>
                      </div>
                      <p className="text-gray-600">Reviews feature coming soon...</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
