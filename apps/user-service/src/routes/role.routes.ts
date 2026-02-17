import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';

const router:Router = Router();
const controller = new RoleController();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role Management APIs
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role created successfully
 */
router.post('/', controller.create);

/**
 * @swagger
 * /roles/{id}/permissions:
 *   post:
 *     summary: Assign permission to role
 *     tags: [Roles]
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
 *               - permissionId
 *             properties:
 *               permissionId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Permission assigned
 */
router.post('/:id/permissions', controller.assignPermission);

export default router;