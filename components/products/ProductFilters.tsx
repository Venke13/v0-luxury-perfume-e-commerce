"use client"

import { motion } from "framer-motion"

interface Filters {
  category: string
  priceRange: [number, number]
  rating: number
  inStock: boolean
}

interface ProductFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  categories: string[]
}

export function ProductFilters({ filters, onFiltersChange, categories }: ProductFiltersProps) {
  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({
      category: "",
      priceRange: [0, 500],
      rating: 0,
      inStock: false,
    })
  }

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-lg sticky top-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-playfair font-bold">Filters</h3>
        <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-gold transition-colors">
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Category</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value=""
              checked={filters.category === ""}
              onChange={(e) => updateFilter("category", e.target.value)}
              className="mr-2"
            />
            All Categories
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filters.category === category}
                onChange={(e) => updateFilter("category", e.target.value)}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Price Range</h4>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="500"
            value={filters.priceRange[1]}
            onChange={(e) => updateFilter("priceRange", [filters.priceRange[0], Number.parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Minimum Rating</h4>
        <div className="space-y-2">
          {[0, 3, 4, 4.5].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.rating === rating}
                onChange={(e) => updateFilter("rating", Number.parseFloat(e.target.value))}
                className="mr-2"
              />
              {rating === 0 ? (
                "Any Rating"
              ) : (
                <div className="flex items-center">
                  <span className="mr-1">{rating}+</span>
                  <div className="flex text-gold text-sm">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < rating ? "text-gold" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Stock Filter */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => updateFilter("inStock", e.target.checked)}
            className="mr-2"
          />
          In Stock Only
        </label>
      </div>
    </motion.div>
  )
}
