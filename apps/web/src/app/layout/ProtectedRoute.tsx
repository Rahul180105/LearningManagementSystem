import { Navigate } from "react-router-dom"
import { useAuthStore } from "@/features/auth/auth.store"

export function ProtectedRoute({ children }: any) {
  const user = useAuthStore((s) => s.user)

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}