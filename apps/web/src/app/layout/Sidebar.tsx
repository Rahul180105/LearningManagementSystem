import { NavLink } from "react-router-dom"
import { useAuthStore } from "@/features/auth/auth.store"

export default function Sidebar() {
  const user = useAuthStore((s) => s.user)

  const linkStyle = ({ isActive }: any) =>
    `block p-2 rounded ${
      isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
    }`

  return (
    <div className="w-64 bg-white border-r p-6">
      <h1 className="text-xl font-bold text-indigo-600 mb-6">
        LMS
      </h1>

      <nav className="space-y-2">
        <NavLink to="/dashboard" className={linkStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/profile" className={linkStyle}>
          Profile
        </NavLink>

        {user?.roles.includes("admin") && (
          <NavLink to="/users" className={linkStyle}>
            Users
          </NavLink>
        )}
      </nav>
    </div>
  )
}