import { Router } from "express";
import { createCourse,getCourseById,getCourses } from "../controllers/course.controller.ts";

const router = Router();

router.post("/", createCourse);
router.get("/", getCourses);
router.get("/:id",getCourseById);


export default router;