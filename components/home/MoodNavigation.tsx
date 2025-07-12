"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Sparkles, Sun, Moon, Flower } from "lucide-react"

const moods = [
  {
    id: "fresh",
    name: "Fresh & Clean",
    description: "Light, airy scents for everyday elegance",
    icon: Sun,
    color: "from-blue-100 to-cyan-100",
    href: "/products?mood=fresh",
  },
  {
    id: "romantic",
    name: "Romantic",
    description: "Floral and feminine fragrances",
    icon: Flower,
    color: "from-pink-100 to-rose-100",
    href: "/products?mood=romantic",
  },
  {
    id: "mysterious",
    name: "Mysterious",
    description: "Deep, complex scents for evening",
    icon: Moon,
    color: "from-purple-100 to-indigo-100",
    href: "/products?mood=mysterious",
  },
  {
    id: "luxurious",
    name: "Luxurious",
    description: "Opulent fragrances for special occasions",
    icon: Sparkles,
    color: "from-amber-100 to-yellow-100",
    href: "/products?mood=luxurious",
  },
]

export function MoodNavigation() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-4">
            Shop by <span className="text-gradient">Mood</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let your emotions guide you to the perfect fragrance for every moment and occasion.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {moods.map((mood, index) => (
            <motion.div
              key={mood.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={mood.href}>
                <motion.div
                  className={`relative p-8 rounded-2xl bg-gradient-to-br ${mood.color} hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="mb-6">
                      <mood.icon className="w-12 h-12 text-gray-700 group-hover:text-gold transition-colors duration-300" />
                    </div>

                    <h3 className="text-xl font-playfair font-bold mb-3 group-hover:text-gold transition-colors duration-300">
                      {mood.name}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">{mood.description}</p>

                    {/* Hover Arrow */}
                    <motion.div
                      className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">→</span>
                      </div>
                    </motion.div>
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
