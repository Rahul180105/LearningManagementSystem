import { User, Role } from '@lms/shared-db';

export class UserService {

  async getAllUsers() {
    return await User.findAll({
      include: [Role],
    });
  }

  async getUserById(id: number) {
    const user = await User.findByPk(id, {
      include: [Role],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async updateUser(id: number, data: any) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    await user.update(data);
    return user;
  }

  async deleteUser(id: number) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    await user.update({ status: 'inactive' });

    return true;
  }

  async assignRole(userId: number, roleId: number) {
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
      throw new Error('User or Role not found');
    }

    await user.addRole(role);

    return true;
  }

  async removeRole(userId: number, roleId: number) {
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
      throw new Error('User or Role not found');
    }

    await (user as any).removeRole(role);

    return true;
  }
}