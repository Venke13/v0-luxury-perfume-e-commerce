"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Lock, CreditCard, MapPin } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutFormProps {
  clientSecret: string
}

function CheckoutForm({ clientSecret }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })

  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBillingInfo({
      ...billingInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setLoading(true)
    setError("")

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) return

    try {
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: billingInfo.sameAsShipping ? shippingInfo.fullName : billingInfo.fullName,
            email: shippingInfo.email,
          },
        },
      })

      if (paymentError) {
        setError(paymentError.message || "Payment failed")
      } else if (paymentIntent.status === "succeeded") {
        // Create order in database
        // Clear cart
        clearCart()
        // Redirect to success page
        router.push(`/checkout/success?payment_intent=${paymentIntent.id}`)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping Information */}
      <motion.div
        className="bg-white rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-5 h-5 text-gold" />
          <h2 className="text-xl font-playfair font-bold">Shipping Information</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={shippingInfo.fullName}
              onChange={handleShippingChange}
              required
              className="w-full px-4 py-3 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={shippingInfo.email}
              onChange={handleShippingChange}
              required
              className="w-full px-4 py-3 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleShippingChange}
              required
              className="w-full px-4 py-3 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleShippingChange}
              required
              className="w-full px-4 py-3 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={shippingInfo.city}
              onChange={handleShippingChange}
              required
              className="w-full px-4 py-3 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <input
              type="text"
              name="state"
              value={shippingInfo.state}
              onChange={handleShippingChange}
              required
              className="w-full px-4 py-3 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
            <input
              type="text"
              name="zipCode"
              value={shippingInfo.zipCode}
              onChange={handleShippingChange}
              required
              className="w-full px-4 py-3 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>
        </div>
      </motion.div>

      {/* Payment Information */}
      <motion.div
        className="bg-white rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-5 h-5 text-gold" />
          <h2 className="text-xl font-playfair font-bold">Payment Information</h2>
        </div>

        <div className="p-4 border border-lilac/30 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
              },
            }}
          />
        </div>

        {error && <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">{error}</div>}
      </motion.div>

      {/* Order Summary */}
      <motion.div
        className="bg-white rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-xl font-playfair font-bold mb-6">Order Summary</h2>

        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="border-t border-lilac/30 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(total * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-2">
              <span>Total</span>
              <span className="text-gold">${(total * 1.08).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={!stripe || loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          <Lock className="w-4 h-4" />
          {loading ? "Processing..." : `Pay $${(total * 1.08).toFixed(2)}`}
        </motion.button>

        <div className="mt-4 text-center text-sm text-gray-600">
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Your payment information is secure and encrypted
          </div>
        </div>
      </motion.div>
    </form>
  )
}

export default function CheckoutPage() {
  const { items, total } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin?redirect=/checkout")
      return
    }

    if (items.length === 0) {
      router.push("/cart")
      return
    }

    // Create payment intent
    createPaymentIntent()
  }, [user, items, router])

  const createPaymentIntent = async () => {
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(total * 1.08 * 100), // Convert to cents
        }),
      })

      const { clientSecret } = await response.json()
      setClientSecret(clientSecret)
    } catch (error) {
      console.error("Error creating payment intent:", error)
    }
  }

  if (!user) {
    return null
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: "#FDFBF6" }}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-playfair font-bold mb-4">
            Secure <span className="text-gradient">Checkout</span>
          </h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </motion.div>

        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        )}
      </div>
    </div>
  )
}
