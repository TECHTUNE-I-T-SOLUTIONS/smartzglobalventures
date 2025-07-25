import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth functions
export const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (error) throw error

    // Insert user data into users table
    if (data.user) {
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          email: data.user.email,
          first_name: firstName,
          last_name: lastName,
          role: "user",
        },
      ])

      if (insertError) throw insertError
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) throw error

    if (user) {
      const { data: userData, error: userError } = await supabase.from("users").select("*").eq("id", user.id).single()

      if (userError) throw userError
      return { user: userData, error: null }
    }

    return { user: null, error: null }
  } catch (error) {
    return { user: null, error }
  }
}

// Product functions
export async function getFeaturedProducts() {
  const { data, error } = await supabase.from("products").select("*").eq("featured", true).limit(8)

  if (error) throw error
  return data || []
}

export const getAllProducts = async () => {
  try {
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export const getProductsByCategory = async (category: string) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching products by category:", error)
    return []
  }
}

export const getProductById = async (id: string) => {
  try {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

// User functions
export async function createUser(userData: any) {
  const { data, error } = await supabase.from("users").insert([userData]).select().single()

  if (error) throw error
  return data
}

export async function getUserById(id: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

  if (error) throw error
  return data
}

// Security Questions functions
export async function saveSecurityQuestions(userId: string, questions: Array<{ question: string; answer: string }>) {
  const questionsData = questions.map((q, index) => ({
    user_id: userId,
    question: q.question,
    answer: q.answer.toLowerCase().trim(),
    question_order: index + 1,
  }))

  const { error } = await supabase.from("security_questions").insert(questionsData)

  if (error) throw error
}

export async function getSecurityQuestions(email: string) {
  const { data: user, error: userError } = await supabase.from("users").select("id").eq("email", email).single()

  if (userError) throw userError

  const { data, error } = await supabase
    .from("security_questions")
    .select("question, question_order")
    .eq("user_id", user.id)
    .order("question_order")

  if (error) throw error
  return data || []
}

export async function verifySecurityAnswers(email: string, answers: string[]) {
  const { data: user, error: userError } = await supabase.from("users").select("id").eq("email", email).single()

  if (userError) throw userError

  const { data, error } = await supabase
    .from("security_questions")
    .select("answer")
    .eq("user_id", user.id)
    .order("question_order")

  if (error) throw error

  const storedAnswers = data?.map((q) => q.answer) || []
  const providedAnswers = answers.map((a) => a.toLowerCase().trim())

  return storedAnswers.every((answer, index) => answer === providedAnswers[index])
}

// Chat functions
export const createChatRoom = async (userId: string, type = "business") => {
  try {
    const { data, error } = await supabase
      .from("chat_rooms")
      .insert([
        {
          user_id: userId,
          type,
          status: "active",
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error creating chat room:", error)
    throw error
  }
}

export async function getChatRooms(userId: string) {
  const { data, error } = await supabase
    .from("chat_rooms")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })

  if (error) throw error
  return data || []
}

export const getChatMessages = async (roomId: string) => {
  try {
    const { data, error } = await supabase
      .from("chat_messages")
      .select(`
        *,
        sender:users(first_name, last_name, email)
      `)
      .eq("room_id", roomId)
      .order("created_at", { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching chat messages:", error)
    return []
  }
}

export const sendChatMessage = async (
  roomId: string,
  senderId: string,
  message: string,
  fileUrl?: string,
  fileType?: string,
) => {
  try {
    const { data, error } = await supabase
      .from("chat_messages")
      .insert([
        {
          room_id: roomId,
          sender_id: senderId,
          message,
          file_url: fileUrl,
          file_type: fileType,
          is_from_admin: false,
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error sending chat message:", error)
    throw error
  }
}

// File upload function
export const uploadFile = async (file: File, bucket = "business-files") => {
  try {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${bucket}/${fileName}`

    const { data, error } = await supabase.storage.from("uploads").upload(filePath, file)

    if (error) throw error

    const {
      data: { publicUrl },
    } = supabase.storage.from("uploads").getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error("Error uploading file:", error)
    throw error
  }
}

// Cart functions
export const getCartItems = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        *,
        product:products(*)
      `)
      .eq("user_id", userId)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching cart items:", error)
    return []
  }
}

export const addToCart = async (userId: string, productId: string, quantity = 1) => {
  try {
    const { data, error } = await supabase
      .from("cart_items")
      .upsert([
        {
          user_id: userId,
          product_id: productId,
          quantity,
        },
      ])
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error adding to cart:", error)
    throw error
  }
}

export const removeFromCart = async (userId: string, productId: string) => {
  try {
    const { error } = await supabase.from("cart_items").delete().eq("user_id", userId).eq("product_id", productId)

    if (error) throw error
  } catch (error) {
    console.error("Error removing from cart:", error)
    throw error
  }
}

export const clearCart = async (userId: string) => {
  try {
    const { error } = await supabase.from("cart_items").delete().eq("user_id", userId)

    if (error) throw error
  } catch (error) {
    console.error("Error clearing cart:", error)
    throw error
  }
}

// Orders functions
export const createOrder = async (orderData: any) => {
  try {
    const { data, error } = await supabase.from("orders").insert([orderData]).select().single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

export const getUserOrders = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items(
          *,
          product:products(*)
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching user orders:", error)
    return []
  }
}

export async function getAllOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      user:users(name, email),
      order_items (
        *,
        product:products(*)
      )
    `)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function getAllUsers() {
  const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function updateOrderStatus(orderId: string, status: string) {
  const { data, error } = await supabase.from("orders").update({ status }).eq("id", orderId).select().single()

  if (error) throw error
  return data
}
