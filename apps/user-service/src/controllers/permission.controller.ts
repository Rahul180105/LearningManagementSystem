import type { Request, Response } from 'express';
import { PermissionService } from '../services/permission.service';

const permissionService = new PermissionService();

export class PermissionController {

  async getAllPermissions(req: Request, res: Response) {
    try {
      const permissions = await permissionService.getAllPermissions();
      res.json(permissions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createPermission(req: Request, res: Response) {
    try {
      const permission = await permissionService.createPermission(req.body);
      res.status(201).json(permission);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updatePermission(req: Request, res: Response) {
    try {
      const permission = await permissionService.updatePermission(
        Number(req.params.id),
        req.body
      );
      res.json(permission);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async deletePermission(req: Request, res: Response) {
    try {
      await permissionService.deletePermission(Number(req.params.id));
      res.json({ message: 'Permission deleted successfully' });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}