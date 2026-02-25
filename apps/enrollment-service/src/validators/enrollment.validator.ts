import { z } from "zod"

export const enrollSchema = z.object({
  userId: z.number().int().positive(),
  courseId: z.number().int().positive(),
  dueDate: z.string().optional(),
  enrollmentSource: z.string().optional(),
})

export const bulkEnrollSchema = z.object({
  action: z.literal("bulk"),
  userIds: z.array(z.number().int().positive()),
  courseId: z.number().int().positive(),
  dueDate: z.string().optional(),
})