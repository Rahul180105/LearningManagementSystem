import { RoleService } from '../../../src/services/role.service';
import { Role, Permission } from '@lms/shared-db';

jest.mock('@lms/shared-db');

describe('RoleService', () => {
  let roleService: RoleService;

  beforeEach(() => {
    roleService = new RoleService();
    jest.clearAllMocks();
  });

  // ======================
  // CREATE ROLE
  // ======================
  it('should create role', async () => {
    (Role.create as jest.Mock).mockResolvedValue({ id: 1 });

    const result = await roleService.createRole('admin', 'Admin role');

    expect(Role.create).toHaveBeenCalledWith({
      name: 'admin',
      description: 'Admin role',
    });
    expect(result).toEqual({ id: 1 });
  });

  // ======================
  // GET ALL ROLES
  // ======================
  it('should get all roles', async () => {
    (Role.findAll as jest.Mock).mockResolvedValue([{ id: 1 }]);

    const roles = await roleService.getAllRoles();

    expect(Role.findAll).toHaveBeenCalledWith({
      include: [Permission],
    });
    expect(roles.length).toBe(1);
  });

  // ======================
  // DELETE ROLE
  // ======================
  it('should delete role', async () => {
    (Role.destroy as jest.Mock).mockResolvedValue(1);

    await roleService.deleteRole(1);

    expect(Role.destroy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  // ======================
  // ASSIGN PERMISSION
  // ======================
  describe('assignPermission', () => {
    it('should assign permission', async () => {
      const addPermissionMock = jest.fn();

      const mockRole: any = {
        addPermission: addPermissionMock,
      };

      (Role.findByPk as jest.Mock).mockResolvedValue(mockRole);
      (Permission.findByPk as jest.Mock).mockResolvedValue({ id: 10 });

      await roleService.assginPermission(1, 10);

      expect(addPermissionMock).toHaveBeenCalledWith({ id: 10 });
    });

    it('should throw if role not found', async () => {
      (Role.findByPk as jest.Mock).mockResolvedValue(null);
      (Permission.findByPk as jest.Mock).mockResolvedValue({ id: 10 });

      await expect(
        roleService.assginPermission(1, 10)
      ).rejects.toThrow('Role or Permission not found');
    });

    it('should throw if permission not found', async () => {
      (Role.findByPk as jest.Mock).mockResolvedValue({});
      (Permission.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(
        roleService.assginPermission(1, 10)
      ).rejects.toThrow('Role or Permission not found');
    });
  });

  // ======================
  // REMOVE PERMISSION
  // ======================
  describe('removePermission', () => {
    it('should remove permission', async () => {
      const removePermissionMock = jest.fn();

      const mockRole: any = {
        removePermission: removePermissionMock,
      };

      (Role.findByPk as jest.Mock).mockResolvedValue(mockRole);
      (Permission.findByPk as jest.Mock).mockResolvedValue({ id: 10 });

      await roleService.removePermission(1, 10);

      expect(removePermissionMock).toHaveBeenCalledWith({ id: 10 });
    });

    it('should throw if role not found', async () => {
      (Role.findByPk as jest.Mock).mockResolvedValue(null);
      (Permission.findByPk as jest.Mock).mockResolvedValue({ id: 10 });

      await expect(
        roleService.removePermission(1, 10)
      ).rejects.toThrow('Role or Permission not found');
    });
  });
});