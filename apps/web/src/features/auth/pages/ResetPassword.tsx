import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import AuthLayout from "@/layouts/AuthLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const AUTH_BASE = "http://localhost:3001/api"

export default function ResetPassword() {
  const navigate = useNavigate()
  const location = useLocation()

  const prefilledEmail = (location.state as any)?.email || ""

  const [form, setForm] = useState({
    email: prefilledEmail,
    otp: "",
    password: "",
    confirmPassword: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (prefilledEmail) {
      setForm((prev) => ({ ...prev, email: prefilledEmail }))
    }
  }, [prefilledEmail])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      await axios.post(`${AUTH_BASE}/auth/reset-password`, {
        email: form.email,
        otp: form.otp,
        password: form.password,
      })

      setSuccess("Password reset successful. Redirecting to login...")

      setTimeout(() => {
        navigate("/login")
      }, 1500)

    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid or expired OTP")
    }

    setLoading(false)
  }

  return (
    <AuthLayout>
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Reset Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>OTP</Label>
              <Input
                name="otp"
                value={form.otp}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>New Password</Label>
              <Input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
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
              {loading ? "Resetting..." : "Reset Password"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}