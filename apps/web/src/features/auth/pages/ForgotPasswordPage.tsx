import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { forgotPasswordRequest } from "../auth.api"

const schema = z.object({
  email: z.string().email("Invalid email"),
})

export default function ForgotPasswordPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const validate = (value: string) => {
    const result = schema.safeParse({ email: value })

    if (!result.success) {
      setError(result.error.issues[0].message)
    } else {
      setError("")
    }
  }

  const handleSubmit = async () => {
    const result = schema.safeParse({ email })

    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    try {
      setLoading(true)
      await forgotPasswordRequest(email)

      // 🔥 Redirect to reset page and pass email
      navigate("/reset-password", {
        state: { email },
      })
    } catch (err: any) {
      setError(err.response?.data?.error || "Error sending OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-[380px] shadow-sm border">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-center">
            Forgot Password
          </h2>

          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              validate(e.target.value)
            }}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>

          <div className="text-center text-sm">
            <Link to="/login" className="text-indigo-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}