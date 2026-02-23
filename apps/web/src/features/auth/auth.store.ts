import { create } from "zustand"
import { api, AUTH_BASE } from "@/lib/apiClient"

interface User {
  id: number
  first_name: string
  last_name: string
  username: string
  email: string
  roles?: string[]
}

interface AuthState {
  user: User | null
  accessToken: string | null
  login: (email: string, password: string) => Promise<void>
  fetchUser: () => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken"),

  login: async (email, password) => {
    const res = await api.post(`${AUTH_BASE}/auth/login`, {
      email,
      password,
    })

    const { accessToken } = res.data

    localStorage.setItem("accessToken", accessToken)

    set({ accessToken })

    await useAuthStore.getState().fetchUser()
  },

  fetchUser: async () => {
    const res = await api.get(`${AUTH_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })

    set({ user: res.data })
  },

  logout: () => {
    localStorage.removeItem("accessToken")
    set({ user: null, accessToken: null })
  },
}))