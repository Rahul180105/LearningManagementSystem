import { User, Role } from '@lms/shared-db'

export class UserService {

  async getAllUsers() {
    return User.findAll();
  }

  async getUserById(id: number) {
    return User.findByPk(id);
  }

  async updateUser(id: number, data: Partial<User>) {
    await User.update(data, { where: { id } });
  }

  async deleteUser(id: number) {
    await User.update(
      { status: 'inactive' },
      { where: { id } }
    );
  }

  async assignRole(userId: number, roleId: number) {
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
      throw new Error('User or Role not found');
    }

    await user.addRole(role);
  }
}