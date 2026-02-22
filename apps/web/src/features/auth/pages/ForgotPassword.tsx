import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import AuthLayout from "@/layouts/AuthLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const AUTH_BASE = "http://localhost:3001/api"

export default function ForgotPassword() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      await axios.post(`${AUTH_BASE}/auth/forgot-password`, { email })

      setSuccess("OTP sent to your email")

      // Redirect to reset page after 1 second
      setTimeout(() => {
        navigate("/reset-password", { state: { email } })
      }, 1000)

    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong")
    }

    setLoading(false)
  }

  return (
    <AuthLayout>
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Forgot Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {success && (
              <p className="text-sm text-green-600 text-center">{success}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}