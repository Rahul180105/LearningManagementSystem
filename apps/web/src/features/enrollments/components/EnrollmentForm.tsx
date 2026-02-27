import { useEffect, useState } from "react"
import { getUsers } from "@/features/users/user.api"
import { getCourses } from "@/features/courses/courses.api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  onSubmit: (data: any) => void
}

export default function EnrollmentForm({ onSubmit }: Props) {
  const [users, setUsers] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])

  const [form, setForm] = useState({
    userId: "",
    courseId: "",
    dueDate: "",
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getUsers().then((res) =>
      setUsers(res.data.users || res.data)
    )
    getCourses().then((res) =>
      setCourses(res.data)
    )
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await onSubmit({
      userId: Number(form.userId),
      courseId: Number(form.courseId),
      dueDate: form.dueDate,
      enrollmentSource: "admin_assigned",
    })

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* User Select */}
      <div className="space-y-2">
        <Label>Select User</Label>
        <Select
          onValueChange={(value) =>
            setForm({ ...form, userId: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose user" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={String(user.id)}>
                {user.first_name} {user.last_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Course Select */}
      <div className="space-y-2">
        <Label>Select Course</Label>
        <Select
          onValueChange={(value) =>
            setForm({ ...form, courseId: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.id} value={String(course.id)}>
                {course.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Due Date */}
      <div className="space-y-2">
        <Label>Due Date</Label>
        <Input
          type="date"
          value={form.dueDate}
          onChange={(e) =>
            setForm({ ...form, dueDate: e.target.value })
          }
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-black text-white hover:bg-gray-800"
        disabled={loading}
      >
        {loading ? "Enrolling..." : "Enroll User"}
      </Button>
    </form>
  )
}