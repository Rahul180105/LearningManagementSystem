import { Router } from "express"
import {
  createModule,
  getModuleByCourse,
  updateModule,
  deleteModule,
} from "../controllers/module.controller.ts"
import { validate } from "../middlewares/validate.middleware.ts"
import {
  createModuleSchema,
  updateModuleSchema,
} from "../validators/module.validator.ts"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Modules
 *   description: Course Module APIs
 */

/**
 * @swagger
 * /api/courses/{id}/modules:
 *   post:
 *     summary: Create module for course
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 */
router.post(
  "/courses/:id/modules",
  validate(createModuleSchema),
  createModule
)

/**
 * @swagger
 * /api/courses/{id}/modules:
 *   get:
 *     summary: Get modules by course
 *     tags: [Modules]
 */
router.get(
  "/courses/:id/modules",
  getModuleByCourse
)
/**
 * @swagger
 * /api/modules/{id}:
 *   put:
 *     summary: Update module
 *     tags: [Modules]
 */
router.put(
  "/modules/:id",
  validate(updateModuleSchema),
  updateModule
)
/**
 * @swagger
 * /api/modules/{id}:
 *   delete:
 *     summary: Delete module
 *     tags: [Modules]
 */
router.delete("/modules/:id", deleteModule)

export default router