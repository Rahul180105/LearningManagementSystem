import { UserService } from '../../../src/services/user.service';
import { User, Role, sequelize } from '@lms/shared-db';

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await Role.create({ name: 'admin' });
  await Role.create({ name: 'employee' });
});

afterAll(async () => {
  await sequelize.close();
});

beforeEach(async () => {
  await User.destroy({ where: {}, truncate: true, cascade: true });
});

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  it('should return all users', async () => {
    await User.create({
      email: 'user1@test.com',
      username: 'user1',
      password_hash: 'hashed',
      first_name: 'User',
      last_name: 'One',
      department: 'IT',
      status: 'active',
    });

    const users = await userService.getAllUsers();
    expect(users.length).toBe(1);
  });

  it('should return user by id', async () => {
    const user = await User.create({
      email: 'user2@test.com',
      username: 'user2',
      password_hash: 'hashed',
      first_name: 'User',
      last_name: 'Two',
      department: 'IT',
      status: 'active',
    });

    const found = await userService.getUserById(user.id);
    expect(found.email).toBe('user2@test.com');
  });

  it('should update user', async () => {
    const user = await User.create({
      email: 'update@test.com',
      username: 'update',
      password_hash: 'hashed',
      first_name: 'Old',
      last_name: 'Name',
      department: 'IT',
      status: 'active',
    });

    await userService.updateUser(user.id, {
      first_name: 'New',
    });

    const updated = await User.findByPk(user.id);
    expect(updated?.first_name).toBe('New');
  });

  it('should soft delete user', async () => {
    const user = await User.create({
      email: 'delete@test.com',
      username: 'delete',
      password_hash: 'hashed',
      first_name: 'Delete',
      last_name: 'Me',
      department: 'IT',
      status: 'active',
    });

    await userService.deleteUser(user.id);

    const deleted = await User.findByPk(user.id);
    expect(deleted?.status).toBe('inactive');
  });

  it('should assign role to user', async () => {
    const role = await Role.findOne({ where: { name: 'admin' } });

    const user = await User.create({
      email: 'role@test.com',
      username: 'roleuser',
      password_hash: 'hashed',
      first_name: 'Role',
      last_name: 'User',
      department: 'IT',
      status: 'active',
    });

    await userService.assignRole(user.id, role!.id);

    const roles = await (user as any).getRoles();
    expect(roles.length).toBe(1);
    expect(roles[0].name).toBe('admin');
  });
});