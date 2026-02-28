import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { loginSchema } from "../auth.schema"
import { loginRequest } from "../auth.api"
import { useAuthStore } from "../auth.store"

type LoginForm = {
  email: string
  password: string
}

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const mapZodErrors = (zodError: any) => {
    const fieldErrors: Record<string, string> = {}
    zodError.issues.forEach((issue: any) => {
      const field = issue.path[0] as string
      fieldErrors[field] = issue.message
    })
    return fieldErrors
  }

  const validateField = (name: keyof LoginForm, value: string) => {
    const updatedForm = { ...form, [name]: value }
    const result = loginSchema.safeParse(updatedForm)

    if (!result.success) {
      const fieldErrors = mapZodErrors(result.error)
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name] || "",
      }))
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm((prev) => {
      const updated = { ...prev, [name]: value }
      validateField(name as keyof LoginForm, value)
      return updated
    })
  }

  const handleSubmit = async () => {
    const result = loginSchema.safeParse(form)

    if (!result.success) {
      setErrors(mapZodErrors(result.error))
      return
    }

    try {
      const response = await loginRequest(form)
      login(response.data.accessToken)
      navigate("/dashboard")
    } catch (error: any) {
      alert(error.response?.data?.error || "Login failed")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-[380px] shadow-sm border">
        <CardContent className="p-6 space-y-5">
          <h2 className="text-2xl font-semibold text-center">
            Login
          </h2>

          <div className="space-y-1">
            <Input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            onClick={handleSubmit}
          >
            Login
          </Button>

          <div className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:underline"
            >
              Register
            </Link>
          </div>

          <div className="text-center text-sm">
            <Link
              to="/forgot-password"
              className="text-indigo-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}