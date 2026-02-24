import z from "zod";

export const createCourseSchema=z.object({
    code:z.string().min(3),
    title:z.string().min(3),
    description:z.string().optional(),
    difficulty:z.enum(["beginner","intermediate","advanced"]),
    status:z.enum(["draft","published","archieved"]).optional(),
    estimatedHours:z.number().int().positive()
})

export const updateCourseSchema=createCourseSchema.partial()