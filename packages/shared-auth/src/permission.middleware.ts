import type { Request, Response, NextFunction } from 'express';
import { User, Role, Permission } from '@lms/shared-db';

export const authorize = (requiredPermission: string) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;

      const user = await User.findByPk(userId, {
        include: [
          {
            model: Role,
            include: [Permission],
          },
        ],
      });

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const permissions = (user as any).Roles
        .flatMap((role: any) => role.Permissions)
        .map((perm: any) => perm.name);

      if (!permissions.includes(requiredPermission)) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      next();
    } catch (err) {
      res.status(500).json({ error: 'Permission check failed' });
    }
  };
};