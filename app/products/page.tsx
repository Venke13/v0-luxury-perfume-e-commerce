"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Grid, List, Search, SlidersHorizontal } from "lucide-react"
import { ProductFilters } from "@/components/products/ProductFilters"
import { ProductGrid } from "@/components/products/ProductGrid"
import { supabase, type Product } from "@/lib/supabase"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 500] as [number, number],
    rating: 0,
    inStock: false,
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*").order("name")

      if (error) throw error
      setProducts(data || [])
      setFilteredProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
      // Fallback to mock data if Supabase fails
      const mockProducts: Product[] = Array.from({ length: 24 }, (_, i) => ({
        id: `product-${i + 1}`,
        name: `Luxury Fragrance ${i + 1}`,
        price: Math.floor(Math.random() * 200) + 100,
        description: `A sophisticated blend of premium ingredients creating an unforgettable scent experience.`,
        scent_notes: ["Rose", "Sandalwood", "Vanilla", "Bergamot"].slice(0, Math.floor(Math.random() * 4) + 1),
        category: ["Floral", "Woody", "Fresh", "Oriental"][Math.floor(Math.random() * 4)],
        rating: 4 + Math.random(),
        stock: Math.floor(Math.random() * 50) + 10,
        images: [`/placeholder.svg?height=400&width=300&text=Product+${i + 1}`],
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = products

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.scent_notes.some((note) => note.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    // Price range filter
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating)
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.stock > 0)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchQuery, filters, sortBy])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: "#FDFBF6" }}>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gold"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: "#FDFBF6" }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold mb-4">
            Our <span className="text-gradient">Fragrances</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Discover our complete collection of luxury perfumes, each crafted with the finest ingredients and attention
            to detail.
          </p>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          className="flex flex-col lg:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            />
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                showFilters ? "bg-gold text-white border-gold" : "bg-white border-lilac/30 hover:bg-lilac/10"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>

            <div className="flex border border-lilac/30 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-colors ${
                  viewMode === "grid" ? "bg-gold text-white" : "bg-white hover:bg-lilac/10"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-colors ${
                  viewMode === "list" ? "bg-gold text-white" : "bg-white hover:bg-lilac/10"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="w-80 flex-shrink-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProductFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  categories={["Floral", "Woody", "Fresh", "Oriental"]}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>

            <ProductGrid products={filteredProducts} viewMode={viewMode} />
          </div>
        </div>
      </div>
    </div>
  )
}
