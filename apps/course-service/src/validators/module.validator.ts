import { z } from "zod"

const baseModuleSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  moduleType: z.enum(["online", "offline"]),
  contentType: z.enum(["video", "document", "link"]).optional(),
  contentUrl: z.string().url().optional(),
  sequenceOrder: z.number().int().positive(),
  estimatedMinutes: z.number().int().positive().optional(),
  isMandatory: z.boolean().optional(),
  sessionDate: z.string().optional(),
  location: z.string().optional(),
})
export const createModuleSchema = baseModuleSchema.superRefine((data, ctx) => {
  if (data.moduleType === "online") {
    if (!data.contentType) {
      ctx.addIssue({
        path: ["contentType"],
        message: "contentType required for online module",
        code: z.ZodIssueCode.custom
      })
    }
    if (!data.contentUrl) {
      ctx.addIssue({
        path: ["contentUrl"],
        message: "contentUrl required for online module",
        code: z.ZodIssueCode.custom
      })
    }
  }

  if (data.moduleType === "offline") {
    if (!data.sessionDate) {
      ctx.addIssue({
        path: ["sessionDate"],
        message: "sessionDate required for offline module",
        code: z.ZodIssueCode.custom
      })
    }
    if (!data.location) {
      ctx.addIssue({
        path: ["location"],
        message: "location required for offline module",
        code: z.ZodIssueCode.custom
      })
    }
  }
})

export const updateModuleSchema = baseModuleSchema.partial()