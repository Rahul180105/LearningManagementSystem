import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { authApi } from "@/lib/axios"

export default function ProfilePage() {
  const [email, setEmail] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authApi.get("/me")

        // only email for now
        setEmail(res.data.user.email)
      } catch (error) {
        console.error("Failed to fetch profile")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return <div className="text-gray-500">Loading profile...</div>
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold mb-6">
        Profile
      </h2>

      <Card className="shadow-sm border">
        <CardContent className="p-6">
          <p className="text-sm text-gray-500">
            Email Address
          </p>

          <h3 className="text-lg font-semibold mt-2 text-indigo-600">
            {email}
          </h3>
        </CardContent>
      </Card>
    </div>
  )
}