import { AuthService } from '../../../src/services/auth.service';
import { PasswordService } from '../../../src/services/password.service';
import { JWTService } from '../../../src/services/jwt.service';
import { sequelize,Role } from '@lms/shared-db';
import '@lms/shared-db';

describe('AuthService', () => {
  let authService: AuthService;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

   
    await Role.create({
      name: 'employee',
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(() => {
    authService = new AuthService(
      new PasswordService(),
      new JWTService()
    );
  });



  it('should register user successfully', async () => {
    const user = await authService.register({
      email: 'test@test.com',
      username: 'testuser',
      password: 'SecurePass123!',
      first_name: 'Test',
      last_name: 'User',
      department: 'Engineering',
    });

    expect(user.email).toBe('test@test.com');
  });

  it('should login successfully after register', async () => {
    await authService.register({
      email: 'login@test.com',
      username: 'loginuser',
      password: 'SecurePass123!',
      first_name: 'Login',
      last_name: 'User',
      department: 'Engineering',
    });

    const result = await authService.login(
      'login@test.com',
      'SecurePass123!'
    );

    expect(result.accessToken).toBeDefined();
  });

  // ❌ NEGATIVE CASES

  it('should throw error if user already exists', async () => {
    await authService.register({
      email: 'duplicate@test.com',
      username: 'dupuser',
      password: 'SecurePass123!',
      first_name: 'Dup',
      last_name: 'User',
    });

    await expect(
      authService.register({
        email: 'duplicate@test.com',
        username: 'dupuser2',
        password: 'SecurePass123!',
        first_name: 'Dup',
        last_name: 'User',
      })
    ).rejects.toThrow('User already exists');
  });

  it('should throw error if user not found during login', async () => {
    await expect(
      authService.login('unknown@test.com', 'password')
    ).rejects.toThrow('User not found');
  });

  it('should throw error for invalid password', async () => {
    await authService.register({
      email: 'wrongpass@test.com',
      username: 'wrongpassuser',
      password: 'SecurePass123!',
      first_name: 'Wrong',
      last_name: 'Pass',
    });

    await expect(
      authService.login('wrongpass@test.com', 'WrongPassword')
    ).rejects.toThrow('Invalid credentials');
  });

  it('should throw error if default role not found', async () => {
    // Remove roles
    await Role.destroy({ where: {} });

    await expect(
      authService.register({
        email: 'norole@test.com',
        username: 'noroleuser',
        password: 'SecurePass123!',
        first_name: 'No',
        last_name: 'Role',
      })
    ).rejects.toThrow('Default role not found');
  });
});