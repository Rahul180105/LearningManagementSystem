import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../../../auth-service/src/middleware/auth.middleware';
import { authorize } from '../middlewares/permission.middleware'

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
 */
router.delete(
  '/:id/roles/:roleId',
  authenticate,
  authorize('admin'),
  controller.removeRole.bind(controller)
);

export default router;