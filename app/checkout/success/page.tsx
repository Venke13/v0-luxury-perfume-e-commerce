"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const paymentIntentId = searchParams.get("payment_intent")
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    // Generate order number (in real app, this would come from the backend)
    setOrderNumber(`LP${Date.now().toString().slice(-6)}`)
  }, [])

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: "#FDFBF6" }}>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Success Icon */}
          <motion.div
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="text-4xl font-playfair font-bold mb-4">
              Order <span className="text-gradient">Confirmed!</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your purchase. Your luxury fragrances are on their way!
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Number</h3>
                <p className="text-gold font-mono text-lg">{orderNumber}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Payment ID</h3>
                <p className="text-gray-600 font-mono text-sm">{paymentIntentId}</p>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Mail className="w-8 h-8 text-gold mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Confirmation Email</h3>
              <p className="text-sm text-gray-600">Check your email for order confirmation and tracking details</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Package className="w-8 h-8 text-gold mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Processing</h3>
              <p className="text-sm text-gray-600">Your order will be processed and shipped within 1-2 business days</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <ArrowRight className="w-8 h-8 text-gold mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Tracking</h3>
              <p className="text-sm text-gray-600">You'll receive tracking information once your order ships</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/orders" className="btn-primary">
              View Order Details
            </Link>
            <Link href="/products" className="btn-secondary">
              Continue Shopping
            </Link>
          </motion.div>

          {/* Support */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <p className="text-gray-600">
              Need help? Contact our{" "}
              <Link href="/contact" className="text-gold hover:text-gold-dark font-medium">
                customer support team
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
