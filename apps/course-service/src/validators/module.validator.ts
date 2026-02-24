import { z } from "zod"

export const createModuleSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  moduleType: z.enum(["online", "offline"]),
  contentType: z
    .enum(["video", "document", "link"])
    .optional(),
  contentUrl: z.string().url().optional(),
  sequenceOrder: z.number().int().positive(),
  estimatedMinutes: z.number().int().positive().optional(),
  isMandatory: z.boolean().optional(),
  sessionDate: z.string().optional(),
  location: z.string().optional(),
})

export const updateModuleSchema =
  createModuleSchema.partial()