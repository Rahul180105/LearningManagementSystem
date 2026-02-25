import { Router } from "express";
import { createCourse,getCourseById,getCourses,updateCourse } from "../controllers/course.controller.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { createCourseSchema,updateCourseSchema } from "../validators/course.validator.ts";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course Management APIs
 */

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCourseRequest'
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseResponse'
 */
router.post("/", validate(createCourseSchema),createCourse);
/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CourseResponse'
 */
router.get("/", getCourses);
/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Course details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseResponse'
 *       404:
 *         description: Course not found
 */
router.get("/:id",getCourseById);
/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCourseRequest'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseResponse'
 *       404:
 *         description: Course not found
 */
router.put("/:id",validate(updateCourseSchema),updateCourse);

export default router;