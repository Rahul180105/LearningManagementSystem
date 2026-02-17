import type { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export class UserController {

  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await userService.getUserById(Number(req.params.id));
      res.json(user);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user = await userService.updateUser(
        Number(req.params.id),
        req.body
      );
      res.json(user);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await userService.deleteUser(Number(req.params.id));
      res.json({ message: 'User deactivated' });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async assignRole(req: Request, res: Response) {
    try {
      await userService.assignRole(
        Number(req.params.id),
        req.body.roleId
      );
      res.json({ message: 'Role assigned' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async removeRole(req: Request, res: Response) {
    try {
      await userService.removeRole(
        Number(req.params.id),
        Number(req.params.roleId)
      );
      res.json({ message: 'Role removed' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}