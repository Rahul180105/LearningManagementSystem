import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { registerSchema } from "../auth.schema"
import { registerRequest } from "../auth.api"

const departments = [
  "Engineering",
  "Human Resources",
  "Finance",
  "Marketing",
  "Operations",
]

type RegisterForm = {
  email: string
  username: string
  password: string
  first_name: string
  last_name: string
  department: string
}

export default function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState<RegisterForm>({
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    department: "",
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

  const validateField = (name: keyof RegisterForm, value: string) => {
    const updatedForm = { ...form, [name]: value }
    const result = registerSchema.safeParse(updatedForm)

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setForm((prev) => {
      const updated = { ...prev, [name]: value }
      validateField(name as keyof RegisterForm, value)
      return updated
    })
  }

  const handleSubmit = async () => {
    const result = registerSchema.safeParse(form)

    if (!result.success) {
      setErrors(mapZodErrors(result.error))
      return
    }

    try {
      await registerRequest(form)
      navigate("/login")
    } catch (error: any) {
      alert(error.response?.data?.error || "Registration failed")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-[420px] shadow-sm border">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center">
            Register
          </h2>

          {["email", "username", "password", "first_name", "last_name"].map(
            (field) => (
              <div key={field} className="space-y-1">
                <Input
                  name={field}
                  type={field === "password" ? "password" : "text"}
                  placeholder={field.replace("_", " ").toUpperCase()}
                  value={(form as any)[field]}
                  onChange={handleChange}
                />
                {errors[field] && (
                  <p className="text-sm text-red-500">
                    {errors[field]}
                  </p>
                )}
              </div>
            )
          )}

          {/* Department Dropdown */}
          <div className="space-y-1">
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-sm text-red-500">
                {errors.department}
              </p>
            )}
          </div>

          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            onClick={handleSubmit}
          >
            Register
          </Button>

          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}