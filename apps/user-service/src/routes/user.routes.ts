import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../../../auth-service/src/middleware/auth.middleware';
import { authorize } from '../middlewares/permission.middleware';

const router: Router = Router();
const controller = new UserController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Management APIs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get(
  '/',
  authenticate,
  authorize('admin'),
  controller.getAll.bind(controller)
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details
 */
router.get(
  '/:id',
  authenticate,
  controller.getById.bind(controller)
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user (Admin or Self)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               department:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: User updated
 */
router.put(
  '/:id',
  authenticate,
  controller.update.bind(controller)
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Soft delete user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deactivated
 */
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  controller.delete.bind(controller)
);

/**
 * @swagger
 * /users/{id}/roles:
 *   post:
 *     summary: Assign role to user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *             properties:
 *               roleId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Role assigned
 */
router.post(
  '/:id/roles',
  authenticate,
  authorize('admin'),
  controller.assignRole.bind(controller)
);

/**
 * @swagger
 * /users/{id}/roles/{roleId}:
 *   delete:
 *     summary: Remove role from user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role removed
 */
router.delete(
  '/:id/roles/:roleId',
  authenticate,
  authorize('admin'),
  controller.removeRole.bind(controller)
);

export default router;