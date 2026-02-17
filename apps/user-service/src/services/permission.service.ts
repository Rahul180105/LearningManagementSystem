import { Permission } from '@lms/shared-db';

export class PermissionService {

  async getAllPermissions() {
    return Permission.findAll();
  }

  async createPermission(data: { name: string; description?: string }) {
    return Permission.create(data);
  }

  async updatePermission(id: number, data: Partial<{ name: string; description: string }>) {
    const permission = await Permission.findByPk(id);
    if (!permission) {
      throw new Error('Permission not found');
    }

    await permission.update(data);
    return permission;
  }

  async deletePermission(id: number) {
    const permission = await Permission.findByPk(id);
    if (!permission) {
      throw new Error('Permission not found');
    }

    await permission.destroy();
  }
}