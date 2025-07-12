"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, CheckCircle } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubscribed(true)
    setIsLoading(false)
    setEmail("")
  }

  return (
    <section className="py-20 bg-gradient-to-r from-gold/10 via-lilac/10 to-gold/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <Mail className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-4">
                Stay in the <span className="text-gradient">Scent</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Be the first to discover new fragrances, exclusive collections, and special offers. Join our community
                of fragrance enthusiasts.
              </p>
            </div>

            {!isSubscribed ? (
              <motion.form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg border border-lilac/30 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                    required
                  />
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-gold hover:bg-gold-dark text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                  </motion.button>
                </div>
                <p className="text-sm text-gray-500 mt-3">We respect your privacy. Unsubscribe at any time.</p>
              </motion.form>
            ) : (
              <motion.div
                className="max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center gap-3 text-green-600">
                  <CheckCircle className="w-8 h-8" />
                  <span className="text-lg font-medium">Successfully subscribed!</span>
                </div>
                <p className="text-gray-600 mt-2">Thank you for joining our fragrance community.</p>
              </motion.div>
            )}

            {/* Benefits */}
            <motion.div
              className="grid md:grid-cols-3 gap-6 mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-gold font-bold">✨</span>
                </div>
                <h3 className="font-semibold mb-2">Exclusive Access</h3>
                <p className="text-sm text-gray-600">First access to new releases and limited editions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-gold font-bold">🎁</span>
                </div>
                <h3 className="font-semibold mb-2">Special Offers</h3>
                <p className="text-sm text-gray-600">Subscriber-only discounts and promotions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-gold font-bold">📚</span>
                </div>
                <h3 className="font-semibold mb-2">Expert Tips</h3>
                <p className="text-sm text-gray-600">Fragrance guides and styling advice</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
