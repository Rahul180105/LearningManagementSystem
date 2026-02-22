import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "@/layouts/AuthLayout"
import { useAuthStore } from "../auth.store"

export default function Login() {
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      navigate("/dashboard")
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <AuthLayout>
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Login
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

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center text-sm text-gray-500">
              <Link to="/forgot-password" className="hover:underline">
                Forgot password?
              </Link>
            </div>

            <div className="text-center text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="underline">
                Register
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}