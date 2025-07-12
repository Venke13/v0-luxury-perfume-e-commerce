"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Package, Eye, Calendar, DollarSign } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { supabase, type Order } from "@/lib/supabase"

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            *,
            product:products (*)
          )
        `)
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: "#FDFBF6" }}>
        <div className="text-center">
          <h2 className="text-2xl font-playfair font-bold mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to be signed in to view your orders.</p>
          <Link href="/auth/signin" className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

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
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-playfair font-bold mb-4">
            Your <span className="text-gradient">Orders</span>
          </h1>
          <p className="text-gray-600">Track and manage your fragrance orders</p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-playfair font-bold mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link href="/products" className="btn-primary">
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                className="bg-white rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="flex items-center gap-4 mb-4 lg:mb-0">
                    <div>
                      <h3 className="font-playfair font-bold text-lg">Order #{order.id.slice(-8).toUpperCase()}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />${order.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                    <Link
                      href={`/orders/${order.id}`}
                      className="flex items-center gap-2 text-gold hover:text-gold-dark transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="border-t border-lilac/30 pt-4">
                  <div className="flex items-center gap-4 overflow-x-auto">
                    {order.order_items?.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex-shrink-0 flex items-center gap-3">
                        <div className="w-12 h-12 bg-lilac/20 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.product?.name}</p>
                          <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.order_items && order.order_items.length > 3 && (
                      <div className="flex-shrink-0 text-sm text-gray-600">
                        +{order.order_items.length - 3} more items
                      </div>
                    )}
                  </div>
                </div>

                {/* Tracking Info */}
                {order.tracking_number && (
                  <div className="mt-4 p-3 bg-lilac/10 rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium">Tracking Number:</span>{" "}
                      <span className="font-mono">{order.tracking_number}</span>
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
