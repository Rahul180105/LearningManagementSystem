import { create } from "zustand"
import { api, AUTH_BASE } from "@/lib/apiClient"

interface User {
  id: number
  email: string
  username: string
  roles?: string[]
}

interface AuthState {
  user: User | null
  accessToken: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  fetchMe: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,

  login: async (email, password) => {
    const res = await api.post(`${AUTH_BASE}/auth/login`, {
      email,
      password,
    })

    set({ accessToken: res.data.accessToken })

    await get().fetchMe()
  },

  fetchMe: async () => {
    const res = await api.get(`${AUTH_BASE}/auth/me`)
    set({ user: res.data })
  },

  logout: () => {
    set({ user: null, accessToken: null })
  },
}))