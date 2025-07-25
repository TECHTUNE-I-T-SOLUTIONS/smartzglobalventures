export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          role: "user" | "admin"
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          role?: "user" | "admin"
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          role?: "user" | "admin"
          avatar_url?: string | null
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          category: string
          subcategory: string | null
          image_url: string | null
          images: string[] | null
          stock_quantity: number
          is_active: boolean
          featured: boolean
          specifications: Record<string, any> | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          category: string
          subcategory?: string | null
          image_url?: string | null
          images?: string[] | null
          stock_quantity?: number
          is_active?: boolean
          featured?: boolean
          specifications?: Record<string, any> | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          category?: string
          subcategory?: string | null
          image_url?: string | null
          images?: string[] | null
          stock_quantity?: number
          is_active?: boolean
          featured?: boolean
          specifications?: Record<string, any> | null
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
          total_amount: number
          shipping_address: Record<string, any>
          payment_method: string
          payment_status: "pending" | "paid" | "failed" | "refunded"
          items: Record<string, any>[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
          total_amount: number
          shipping_address: Record<string, any>
          payment_method: string
          payment_status?: "pending" | "paid" | "failed" | "refunded"
          items: Record<string, any>[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
          total_amount?: number
          shipping_address?: Record<string, any>
          payment_method?: string
          payment_status?: "pending" | "paid" | "failed" | "refunded"
          items?: Record<string, any>[]
          updated_at?: string
        }
      }
      security_questions: {
        Row: {
          id: string
          user_id: string
          question_1: string
          answer_1: string
          question_2: string
          answer_2: string
          question_3: string
          answer_3: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          question_1: string
          answer_1: string
          question_2: string
          answer_2: string
          question_3: string
          answer_3: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          question_1?: string
          answer_1?: string
          question_2?: string
          answer_2?: string
          question_3?: string
          answer_3?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export interface User {
  id: string
  email: string
  user_metadata: {
    firstName?: string
    lastName?: string
    phone?: string
    role?: "user" | "admin"
    avatar_url?: string
  }
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  category: string
  subcategory?: string
  image_url?: string
  images?: string[]
  stock_quantity: number
  is_active: boolean
  featured: boolean
  specifications?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

export interface Order {
  id: string
  user_id: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total_amount: number
  shipping_address: Record<string, any>
  payment_method: string
  payment_status: "pending" | "paid" | "failed" | "refunded"
  items: Record<string, any>[]
  created_at: string
  updated_at: string
}
