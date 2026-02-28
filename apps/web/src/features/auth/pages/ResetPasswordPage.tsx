import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { resetPasswordRequest } from "../auth.api"

const schema = z
  .object({
    email: z.string().email("Invalid email"),
    otp: z.string().length(6, "OTP must be 6 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const prefilledEmail = location.state?.email || ""

  const [form, setForm] = useState({
    email: prefilledEmail,
    otp: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const mapZodErrors = (zodError: any) => {
    const fieldErrors: Record<string, string> = {}

    zodError.issues.forEach((issue: any) => {
      const field = issue.path[0] as string
      fieldErrors[field] = issue.message
    })

    return fieldErrors
  }

  const validateField = (name: string, value: string) => {
    const updated = { ...form, [name]: value }
    const result = schema.safeParse(updated)

    if (!result.success) {
      setErrors(mapZodErrors(result.error))
    } else {
      setErrors({})
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target

    setForm((prev) => {
      const updated = { ...prev, [name]: value }
      validateField(name, value)
      return updated
    })
  }

  const handleSubmit = async () => {
    const result = schema.safeParse(form)

    if (!result.success) {
      setErrors(mapZodErrors(result.error))
      return
    }

    try {
      setLoading(true)

      await resetPasswordRequest({
        email: form.email,
        otp: form.otp,
        password: form.password,
      })

      navigate("/login")
    } catch (err: any) {
      alert(err.response?.data?.error || "Reset failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-[400px] shadow-sm border">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-center">
            Reset Password
          </h2>

          {/* Email (readonly) */}
          <Input
            name="email"
            value={form.email}
            disabled
          />

          {/* OTP */}
          <div className="space-y-1">
            <Input
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
            />
            {errors.otp && (
              <p className="text-sm text-red-500">{errors.otp}</p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="New Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}