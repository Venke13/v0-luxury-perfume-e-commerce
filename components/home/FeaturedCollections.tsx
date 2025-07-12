"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const collections = [
  {
    id: "signature",
    name: "Signature Collection",
    description: "Our most iconic and beloved fragrances",
    image: "/placeholder.svg?height=400&width=600",
    productCount: 12,
    href: "/collections/signature",
  },
  {
    id: "limited",
    name: "Limited Edition",
    description: "Exclusive scents available for a limited time",
    image: "/placeholder.svg?height=400&width=600",
    productCount: 8,
    href: "/collections/limited",
  },
  {
    id: "seasonal",
    name: "Seasonal Favorites",
    description: "Perfect fragrances for the current season",
    image: "/placeholder.svg?height=400&width=600",
    productCount: 15,
    href: "/collections/seasonal",
  },
]

export function FeaturedCollections() {
  return (
    <section className="py-20 bg-gradient-to-b from-lilac/10 to-cream">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-4">
            Curated <span className="text-gradient">Collections</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our thoughtfully curated collections, each telling a unique olfactory story.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Link href={collection.href}>
                <motion.div className="group cursor-pointer" whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Overlay Content */}
                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{collection.productCount} Products</span>
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <span className="text-sm">→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-playfair font-bold group-hover:text-gold transition-colors duration-300">
                      {collection.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{collection.description}</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
