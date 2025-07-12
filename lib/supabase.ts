import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  scent_notes: string[]
  rating: number
  stock: number
  images: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  product: Product
}

export interface Order {
  id: string
  user_id: string
  status: string
  total: number
  shipping_address: any
  billing_address: any
  payment_intent_id?: string
  tracking_number?: string
  created_at: string
  updated_at: string
  order_items: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  product: Product
}
