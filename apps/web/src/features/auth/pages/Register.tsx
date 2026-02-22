import { useState } from "react"
import { z } from "zod"
import { registerSchema, type RegisterFormData } from "../register.schema"
import { api, AUTH_BASE } from "@/lib/apiClient"
import { useNavigate, Link } from "react-router-dom"
import AuthLayout from "@/layouts/AuthLayout"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const departments = [
  "Engineering",
  "HR",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
]

export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState<RegisterFormData>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    department: "",
  })

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({})

  const [loading, setLoading] = useState(false)

  const validateField = (name: keyof RegisterFormData, value: string) => {
    const result = registerSchema.safeParse({
      ...form,
      [name]: value,
    })

    if (!result.success) {
      const issue = result.error.issues.find(
        (err) => err.path[0] === name
      )

      setErrors((prev) => ({
        ...prev,
        [name]: issue?.message,
      }))
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = registerSchema.safeParse(form)

    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof RegisterFormData, string>
      > = {}

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof RegisterFormData
        fieldErrors[field] = issue.message
      })

      setErrors(fieldErrors)
      setLoading(false)
      return
    }

    try {
      await api.post(`${AUTH_BASE}/auth/register`, form)
      navigate("/login")
    } catch (err: any) {
      if (err.response?.data?.error) {
        alert(err.response.data.error)
      } else {
        alert("Something went wrong")
      }
    }

    setLoading(false)
  }

  return (
    <AuthLayout>
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  onBlur={(e) =>
                    validateField("first_name", e.target.value)
                  }
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm">
                    {errors.first_name}
                  </p>
                )}
              </div>

              <div>
                <Label>Last Name</Label>
                <Input
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  onBlur={(e) =>
                    validateField("last_name", e.target.value)
                  }
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm">
                    {errors.last_name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label>Username</Label>
              <Input
                name="username"
                value={form.username}
                onChange={handleChange}
                onBlur={(e) =>
                  validateField("username", e.target.value)
                }
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={(e) =>
                  validateField("email", e.target.value)
                }
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                onBlur={(e) =>
                  validateField("password", e.target.value)
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <Label>Department</Label>
              <Select
                onValueChange={(value) =>
                  setForm({ ...form, department: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? "Creating..." : "Register"}
            </Button>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Login
              </Link>
            </div>

          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}