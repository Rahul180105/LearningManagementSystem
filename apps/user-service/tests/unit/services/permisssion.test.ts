import { PermissionService } from '../../../src/services/permission.service';
import { Permission } from '@lms/shared-db';

jest.mock('@lms/shared-db');

describe('PermissionService', () => {
  let permissionService: PermissionService;

  beforeEach(() => {
    permissionService = new PermissionService();
    jest.clearAllMocks();
  });

  describe('getAllPermissions', () => {
    it('should return all permissions', async () => {
      (Permission.findAll as jest.Mock).mockResolvedValue([{ id: 1 }]);

      const result = await permissionService.getAllPermissions();

      expect(Permission.findAll).toHaveBeenCalled();
      expect(result).toEqual([{ id: 1 }]);
    });
  });


  describe('createPermission', () => {
    it('should create permission', async () => {
      const data = { name: 'READ', description: 'Read access' };

      (Permission.create as jest.Mock).mockResolvedValue({
        id: 1,
        ...data,
      });

      const result = await permissionService.createPermission(data);

      expect(Permission.create).toHaveBeenCalledWith(data);
      expect(result).toEqual({ id: 1, ...data });
    });
  });

  describe('updatePermission', () => {
    it('should update permission', async () => {
      const updateMock = jest.fn();

      (Permission.findByPk as jest.Mock).mockResolvedValue({
        update: updateMock,
      });

      const result = await permissionService.updatePermission(1, {
        name: 'UPDATED',
      });

      expect(updateMock).toHaveBeenCalledWith({ name: 'UPDATED' });
      expect(result).toBeDefined();
    });

    it('should throw if permission not found', async () => {
      (Permission.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(
        permissionService.updatePermission(1, { name: 'X' })
      ).rejects.toThrow('Permission not found');
    });
  });


  describe('deletePermission', () => {
    it('should delete permission', async () => {
      const destroyMock = jest.fn();

      (Permission.findByPk as jest.Mock).mockResolvedValue({
        destroy: destroyMock,
      });

      await permissionService.deletePermission(1);

      expect(destroyMock).toHaveBeenCalled();
    });

    it('should throw if permission not found', async () => {
      (Permission.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(
        permissionService.deletePermission(1)
      ).rejects.toThrow('Permission not found');
    });
  });
});