import { AuthService } from '../../../src/services/auth.service';
import { PasswordService } from '../../../src/services/password.service';
import { JWTService } from '@lms/shared-auth';
import { User, Role, RefreshToken } from '@lms/shared-db';
import { transporter } from '../../../src/utils/mailer';

jest.mock('@lms/shared-db');
jest.mock('../../../src/utils/mailer');

describe('AuthService - Advanced Methods', () => {
  let authService: AuthService;
  let passwordService: PasswordService;
  let jwtService: JWTService;

  beforeEach(() => {
    passwordService = new PasswordService();
    jwtService = new JWTService();
    authService = new AuthService(passwordService, jwtService);

    jest.clearAllMocks();
  });

  describe('refresh', () => {
    it('should return new access token', async () => {
      const token = 'valid-refresh-token';

      jest.spyOn(jwtService, 'verifyRefreshToken').mockReturnValue({
        userId: 1,
      } as any);

      (RefreshToken.findOne as jest.Mock).mockResolvedValue({
        token,
        revoked: false,
        expires_at: new Date(Date.now() + 10000),
      });

      (User.findByPk as jest.Mock).mockResolvedValue({
        id: 1,
        email: 'test@test.com',
        Roles: [{ name: 'employee' }],
      });

      jest.spyOn(jwtService, 'generateAccessToken').mockReturnValue('new-access');

      const result = await authService.refresh(token);

      expect(result.accessToken).toBe('new-access');
    });

    it('should throw if token not found', async () => {
      (RefreshToken.findOne as jest.Mock).mockResolvedValue(null);

      await expect(authService.refresh('bad-token'))
        .rejects.toThrow('Invalid refresh token');
    });

    it('should throw if token expired', async () => {
      jest.spyOn(jwtService, 'verifyRefreshToken').mockReturnValue({
        userId: 1,
      } as any);

      (RefreshToken.findOne as jest.Mock).mockResolvedValue({
        token: 'expired',
        revoked: false,
        expires_at: new Date(Date.now() - 10000),
      });

      await expect(authService.refresh('expired'))
        .rejects.toThrow('Refresh token expired');
    });
  });

  describe('logout', () => {
    it('should revoke token', async () => {
      const saveMock = jest.fn();

      (RefreshToken.findOne as jest.Mock).mockResolvedValue({
        revoked: false,
        save: saveMock,
      });

      const result = await authService.logout('token');

      expect(saveMock).toHaveBeenCalled();
      expect(result.message).toBe('Logged out successfully');
    });

    it('should throw if token not found', async () => {
      (RefreshToken.findOne as jest.Mock).mockResolvedValue(null);

      await expect(authService.logout('bad-token'))
        .rejects.toThrow('Token not found');
    });
  });

  describe('forgotPassword', () => {
    it('should generate OTP and send email', async () => {
      const saveMock = jest.fn();

      (User.findOne as jest.Mock).mockResolvedValue({
        email: 'test@test.com',
        save: saveMock,
      });

      (transporter.sendMail as jest.Mock).mockResolvedValue({});

      const result = await authService.forgotPassword('test@test.com');

      expect(saveMock).toHaveBeenCalled();
      expect(transporter.sendMail).toHaveBeenCalled();
      expect(result.message).toBe('OTP sent to email');
    });

    it('should throw if user not found', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(authService.forgotPassword('bad@test.com'))
        .rejects.toThrow('User not found');
    });
  });


  describe('resetPassword', () => {
    it('should reset password successfully', async () => {
      const saveMock = jest.fn();

      jest.spyOn(passwordService, 'hashPassword')
        .mockResolvedValue('hashed-password');

      (User.findOne as jest.Mock).mockResolvedValue({
        reset_otp: '123456',
        reset_otp_expiry: new Date(Date.now() + 10000),
        save: saveMock,
      });

      const result = await authService.resetPassword(
        'test@test.com',
        '123456',
        'newPass'
      );

      expect(saveMock).toHaveBeenCalled();
      expect(result.message).toBe('Password reset successful');
    });

    it('should throw if OTP invalid', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        reset_otp: '999999',
        reset_otp_expiry: new Date(Date.now() + 10000),
      });

      await expect(
        authService.resetPassword('test@test.com', '123456', 'pass')
      ).rejects.toThrow('Invalid OTP');
    });

    it('should throw if OTP expired', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        reset_otp: '123456',
        reset_otp_expiry: new Date(Date.now() - 10000),
      });

      await expect(
        authService.resetPassword('test@test.com', '123456', 'pass')
      ).rejects.toThrow('OTP expired');
    });
  });
});