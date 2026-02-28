import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r p-6">
      <h1 className="text-xl font-bold text-indigo-600 mb-6">LMS</h1>

      <nav className="space-y-2">
        <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-100">
          Dashboard
        </Link>
      </nav>
    </div>
  )
}