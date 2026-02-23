import { Router } from "express";
import { createCourse,getCourseById,getCourses,updateCourse } from "../controllers/course.controller.ts";

const router = Router();

router.post("/", createCourse);
router.get("/", getCourses);
router.get("/:id",getCourseById);
router.put("/:id",updateCourse);

export default router;