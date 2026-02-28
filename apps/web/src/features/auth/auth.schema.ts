import { z } from "zod"

export const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  username: z.string().min(3, "Minimum 3 characters"),
  password: z.string().min(8, "Password must be 8 characters"),
  first_name: z.string().min(1, "First name required"),
  last_name: z.string().min(1, "Last name required"),
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
})