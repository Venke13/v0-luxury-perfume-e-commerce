"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right, #FDFBF6, rgba(232, 230, 240, 0.2), #FDFBF6)",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl lg:text-7xl font-playfair font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover Your
              <span className="block text-gradient">Signature Scent</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Immerse yourself in our curated collection of luxury fragrances. Each bottle tells a story, each scent
              creates a memory.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link href="/products" className="btn-primary text-center">
                Explore Collection
              </Link>
              <Link href="/quiz" className="btn-secondary text-center">
                Find Your Scent
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div>
                <div className="text-3xl font-playfair font-bold text-gold">100+</div>
                <div className="text-sm text-gray-600">Premium Fragrances</div>
              </div>
              <div>
                <div className="text-3xl font-playfair font-bold text-gold">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-playfair font-bold text-gold">15+</div>
                <div className="text-sm text-gray-600">Luxury Brands</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Perfume Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full h-[600px]">
              {/* Floating Elements */}
              <motion.div
                className="absolute top-10 left-10 w-20 h-20 bg-gold/20 rounded-full blur-xl"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="absolute bottom-20 right-10 w-32 h-32 bg-lilac/30 rounded-full blur-xl"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />

              {/* Main Perfume Image */}
              <motion.div
                className="relative z-10 w-full h-full flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/placeholder.svg?height=500&width=300"
                  alt="Luxury Perfume Bottle"
                  width={300}
                  height={500}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute top-1/4 -left-4 w-2 h-16 bg-gradient-to-b from-gold to-transparent rounded-full"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              />
              <motion.div
                className="absolute bottom-1/4 -right-4 w-2 h-20 bg-gradient-to-t from-lilac to-transparent rounded-full"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}
