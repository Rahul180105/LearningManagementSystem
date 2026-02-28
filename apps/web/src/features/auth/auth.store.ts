import { create } from "zustand"
import { jwtDecode } from "jwt-decode"

interface UserPayload {
  userId: number
  email: string
  roles: string[]
}

interface AuthState {
  user: UserPayload | null
  accessToken: string | null
  login: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  login: (token) => {
    const decoded = jwtDecode<UserPayload>(token)

    localStorage.setItem("accessToken", token)

    set({
      user: decoded,
      accessToken: token,
    })
  },

  logout: () => {
    localStorage.removeItem("accessToken")
    set({ user: null, accessToken: null })
  },
}))