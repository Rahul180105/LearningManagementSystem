import type { Request, Response } from "express"
import {
  enrollUser,
  bulkEnrollUsers,
  getEnrollments,
  dropEnrollment,
} from "../services/enrollment.service.ts"

export const createEnrollment = async (req: Request, res: Response) => {
  try {
    if (req.body.action === "bulk") {
      const result = await bulkEnrollUsers(req.body)
      return res.status(201).json(result)
    }

    const enrollment = await enrollUser(req.body)
    return res.status(201).json(enrollment)
  } catch (error: any) {
    return res.status(400).json({ message: error.message })
  }
}

export const listEnrollments = async (req: Request, res: Response) => {
  const enrollments = await getEnrollments(req.query)
  return res.json(enrollments)
}

export const deleteEnrollment = async (req: Request, res: Response) => {
  const deleted = await dropEnrollment(Number(req.params.id))

  if (!deleted) {
    return res.status(404).json({ message: "Enrollment not found" })
  }

  return res.json({ message: "Enrollment dropped" })
}