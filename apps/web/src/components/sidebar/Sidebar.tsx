import { Link } from "react-router-dom"
import { useAuthStore } from "@/features/auth/auth.store"

export default function Sidebar() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="w-64 border-r bg-white p-4 flex flex-col">
      <h1 className="text-xl font-semibold mb-6">LMS</h1>

      <nav className="space-y-2">
        <Link to="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-100">
          Dashboard
        </Link>

        {user?.roles?.includes("admin") && (
          <>
            <Link to="/users" className="block px-3 py-2 rounded hover:bg-gray-100">
              Users
            </Link>
            <Link to="/roles" className="block px-3 py-2 rounded hover:bg-gray-100">
              Roles
            </Link>
            <Link to="/permissions" className="block px-3 py-2 rounded hover:bg-gray-100">
              Permissions
            </Link>
          </>
        )}
      </nav>
    </div>
  )
}