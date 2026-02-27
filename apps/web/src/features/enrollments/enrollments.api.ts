import { api, ENROLL_BASE } from "@/lib/interceptors"


export const getEnrollments = () =>
  api.get(`${ENROLL_BASE}/enrollments`)


export const createEnrollment = (data: {
  userId: number
  courseId: number
  dueDate?: string
  enrollmentSource?: string
}) =>
  api.post(`${ENROLL_BASE}/enrollments`, data)

export const bulkEnrollment = (data: {
  action: "bulk"
  userIds: number[]
  courseId: number
  dueDate?: string
  enrollmentSource?: string
}) =>
  api.post(`${ENROLL_BASE}/enrollments`, data)


export const deleteEnrollment = (id: number) =>
  api.delete(`${ENROLL_BASE}/enrollments/${id}`)