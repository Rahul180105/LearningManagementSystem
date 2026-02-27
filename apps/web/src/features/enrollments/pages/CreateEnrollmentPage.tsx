import { useNavigate } from "react-router-dom"
import EnrollmentForm from "../components/EnrollmentForm"
import { createEnrollment } from "../enrollments.api"

export default function CreateEnrollmentPage() {
  const navigate = useNavigate()

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Enroll User
      </h1>

      <EnrollmentForm
        onSubmit={async (data) => {
          await createEnrollment(data)
          navigate("/dashboard/enrollments")
        }}
      />
    </div>
  )
}