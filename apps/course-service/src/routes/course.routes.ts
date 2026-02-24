import { Router } from "express";
import { createCourse,getCourseById,getCourses,updateCourse } from "../controllers/course.controller.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { createCourseSchema,updateCourseSchema } from "../validators/course.validator.ts";

const router = Router();

router.post("/", validate(createCourseSchema),createCourse);
router.get("/", getCourses);
router.get("/:id",getCourseById);
router.put("/:id",validate(updateCourseSchema),updateCourse);

export default router;