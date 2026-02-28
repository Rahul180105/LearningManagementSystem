import { useAuthStore } from "@/features/auth/auth.store"
import { Button } from "@/components/ui/button"

export default function Header() {
  const logout = useAuthStore((s) => s.logout)

  return (
    <div className="bg-white border-b px-6 py-3 flex justify-between items-center">
      <h2 className="font-semibold text-lg">Dashboard</h2>
      <Button variant="outline" onClick={logout}>
        Logout
      </Button>
    </div>
  )
}