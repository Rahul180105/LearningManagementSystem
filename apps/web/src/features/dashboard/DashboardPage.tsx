import { useAuthStore } from "@/features/auth/auth.store"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Welcome back, {user?.email}
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {user?.roles.includes("admin") && (
          <>
            <Card className="shadow-sm border">
              <CardContent className="p-6">
                <p className="text-sm text-gray-500">
                  Total Users
                </p>
                <h3 className="text-2xl font-bold text-indigo-600">
                  --
                </h3>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardContent className="p-6">
                <p className="text-sm text-gray-500">
                  Active Enrollments
                </p>
                <h3 className="text-2xl font-bold text-indigo-600">
                  --
                </h3>
              </CardContent>
            </Card>
          </>
        )}

        {user?.roles.includes("employee") && (
          <Card className="shadow-sm border">
            <CardContent className="p-6">
              <p className="text-sm text-gray-500">
                My Courses
              </p>
              <h3 className="text-2xl font-bold text-indigo-600">
                --
              </h3>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}