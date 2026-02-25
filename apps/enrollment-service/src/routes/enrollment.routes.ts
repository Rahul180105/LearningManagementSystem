import { Router } from "express"
import {
  createEnrollment,
  listEnrollments,
  deleteEnrollment
} from "../controllers/enrollment.controller"

const router:any = Router()

/**
 * @swagger
 * /api/enrollments:
 *   post:
 *     summary: Enroll user or bulk enroll
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/EnrollRequest'
 *               - $ref: '#/components/schemas/BulkEnrollRequest'
 *     responses:
 *       201:
 *         description: Enrollment created
 *       400:
 *         description: Validation error or duplicate enrollment
 */
router.post("/enrollments", createEnrollment)

/**
 * @swagger
 * /api/enrollments:
 *   get:
 *     summary: Get enrollments with filters
 *     tags: [Enrollments]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: courseId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of enrollments
 */
router.get("/enrollments", listEnrollments)

/**
 * @swagger
 * /api/enrollments/{id}:
 *   delete:
 *     summary: Drop enrollment
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Enrollment ID
 *     responses:
 *       200:
 *         description: Enrollment dropped
 *       404:
 *         description: Enrollment not found
 */
router.delete("/enrollments/:id", deleteEnrollment)

export default router