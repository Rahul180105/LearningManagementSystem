import { useAuthStore } from "@/features/auth/auth.store"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <div className="h-14 border-b bg-white flex items-center justify-end px-6">
      <div className="flex items-center gap-4">
        <span className="text-sm">{user?.email}</span>
        <Button variant="outline" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  )
}