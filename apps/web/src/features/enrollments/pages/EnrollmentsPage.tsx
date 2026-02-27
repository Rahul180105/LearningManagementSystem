import { useEffect, useState } from "react"
import {
  getEnrollments,
  deleteEnrollment,
} from "../enrollments.api"
import { Link } from "react-router-dom"

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchEnrollments = async () => {
    try {
      setLoading(true)
      const res = await getEnrollments()
      setEnrollments(res.data.enrollments || res.data)
    } catch (err) {
      setError("Failed to load enrollments")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEnrollments()
  }, [])

  if (loading) return <div>Loading enrollments...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Enrollments
        </h1>

        <Link
          to="/dashboard/enrollments/new"
          className="bg-black text-white px-4 py-2"
        >
          Enroll User
        </Link>
      </div>

      {enrollments.map((enroll) => (
        <div
          key={enroll.id}
          className="border p-4 rounded"
        >
          <div>
            Course ID: {enroll.courseId}
          </div>
          <div>Status: {enroll.status}</div>

          <button
            onClick={async () => {
              await deleteEnrollment(enroll.id)
              fetchEnrollments()
            }}
            className="text-red-600 text-sm mt-2"
          >
            Drop
          </button>
        </div>
      ))}
    </div>
  )
}