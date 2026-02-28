import { authApi } from "@/lib/axios"

export const loginRequest = (data: {
  email: string
  password: string
}) => authApi.post("/login", data)

export const registerRequest = (data: any) =>
  authApi.post("/register", data)

export const forgotPasswordRequest = (email: string) =>
  authApi.post("/forgot-password", { email })

export const resetPasswordRequest = (data: {
  email: string
  otp: string
  password: string
}) => authApi.post("/reset-password", data)