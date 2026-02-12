import { AuthService } from '../../../src/services/auth.service';
import { PasswordService } from '../../../src/services/password.service';
import { JWTService } from '../../../src/services/jwt.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService(
      new PasswordService(),
      new JWTService()
    );
  });

  it('should throw error if user not found', async () => {
    await expect(
      authService.login('notfound@test.com', 'password')
    ).rejects.toThrow('User not found');
  });

  it('should throw error if password is incorrect', async () => {
    await expect(
      authService.login('test@test.com', 'WrongPassword')
    ).rejects.toThrow('Invalid credentials');
  });

  it('should return access token for valid login', async () => {
    const result = await authService.login(
      'test@test.com',
      'SecurePass123!'
    );

    expect(result.accessToken).toBeDefined();
    expect(typeof result.accessToken).toBe('string');
  });
});