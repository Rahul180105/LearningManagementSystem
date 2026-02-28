import { UserService } from '../../../src/services/user.service';
import { User, Role } from '@lms/shared-db';

jest.mock('@lms/shared-db');

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    (User.findAll as jest.Mock).mockResolvedValue([{ id: 1 }]);

    const users = await userService.getAllUsers();

    expect(User.findAll).toHaveBeenCalled();
    expect(users.length).toBe(1);
  });

  it('should return user by id', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'user@test.com',
    });

    const user = await userService.getUserById(1);

    expect(User.findByPk).toHaveBeenCalledWith(1, { include: [Role] });
    expect(user.email).toBe('user@test.com');
  });

  it('should update user', async () => {
    const updateMock = jest.fn();

    (User.findByPk as jest.Mock).mockResolvedValue({
      update: updateMock,
    });

    await userService.updateUser(1, { first_name: 'New' });

    expect(updateMock).toHaveBeenCalledWith({ first_name: 'New' });
  });

  it('should soft delete user', async () => {
    const updateMock = jest.fn();

    (User.findByPk as jest.Mock).mockResolvedValue({
      update: updateMock,
    });

    await userService.deleteUser(1);

    expect(updateMock).toHaveBeenCalledWith({ status: 'inactive' });
  });


  it('should assign role to user', async () => {
    const addRoleMock = jest.fn();

    const mockUser: any = {
      addRole: addRoleMock,
    };

    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);
    (Role.findByPk as jest.Mock).mockResolvedValue({ id: 2 });

    await userService.assignRole(1, 2);

    expect(addRoleMock).toHaveBeenCalledWith({ id: 2 });
  });

  it('should throw if user not found in assignRole', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(null);
    (Role.findByPk as jest.Mock).mockResolvedValue({ id: 2 });

    await expect(
      userService.assignRole(1, 2)
    ).rejects.toThrow();
  });
});