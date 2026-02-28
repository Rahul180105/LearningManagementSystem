export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow-sm border rounded p-6">
          <p className="text-sm text-gray-500">Total Users</p>
          <h3 className="text-2xl font-bold text-indigo-600">0</h3>
        </div>
      </div>
    </div>
  )
}