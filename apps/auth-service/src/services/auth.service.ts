import { PasswordService } from './password.service';
import { JWTService } from './jwt.service';
import { User, Role, sequelize } from '@lms/shared-db';
import { RefreshToken } from '@lms/shared-db';
import crypto from 'crypto';
import { PasswordResetToken } from '@lms/shared-db';
import { transporter } from '../utils/mailer';


interface RegisterInput {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  department?: string;
}

export class AuthService {
  constructor(
    private passwordService = new PasswordService(),
    private jwtService = new JWTService()
  ) {}

  async register(data: RegisterInput) {
    const existingUser = await User.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      data.password
    );

    const user = await User.create({
      email: data.email,
      username: data.username,
      password_hash: hashedPassword,
      first_name: data.first_name,
      last_name: data.last_name,
      department: data.department??'',
    });

    const role = await Role.findOne({
      where: { name: 'employee' },
    });

    if (!role) {
      throw new Error('Default role not found');
    }

    await user.addRole(role);
    return user;
  }

    async login(email: string, password: string) {
      const user = await User.findOne({
        where: { email },
        include: [Role],
      });
    
      if (!user) {
        throw new Error('User not found');
      }
    
      const isMatch = await this.passwordService.comparePassword(
        password,
        user.password_hash
      );
    
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }
    
      const roles = (user as any).Roles.map((r: any) => r.name);
    
      const accessToken = this.jwtService.generateAccessToken({
        userId: user.id,
        email: user.email,
        roles,
      });
    
      const refreshToken = this.jwtService.generateRefreshToken(user.id);
    
      // Store refresh token in DB
      await RefreshToken.create({
        user_id: user.id,
        token: refreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    
      return { accessToken, refreshToken };
}

  async refresh(token: string) {
  const payload = this.jwtService.verifyRefreshToken(token);

  const storedToken = await RefreshToken.findOne({
    where: { token, revoked: false },
  });

  if (!storedToken) {
    throw new Error('Invalid refresh token');
  }

  if (storedToken.expires_at < new Date()) {
    throw new Error('Refresh token expired');
  }

  const user = await User.findByPk(payload.userId, {
    include: [Role],
  });

  if (!user) {
    throw new Error('User not found');
  }

  const roles = (user as any).Roles.map((r: any) => r.name);

  const newAccessToken = this.jwtService.generateAccessToken({
    userId: user.id,
    email: user.email,
    roles,
  });

  return { accessToken: newAccessToken };
}

async logout(token: string) {
  const storedToken = await RefreshToken.findOne({
    where: { token },
  });

  if (!storedToken) {
    throw new Error('Token not found');
  }

  storedToken.revoked = true;
  await storedToken.save();

  return { message: 'Logged out successfully' };
}

async forgotPassword(email: string) {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('User not found');
  }

  // Generate random token
  const rawToken = crypto.randomBytes(32).toString('hex');

  // Hash token before storing
  const hashedToken = crypto
    .createHash('sha256')
    .update(rawToken)
    .digest('hex');

  const expiryMinutes = Number(process.env.RESET_PASSWORD_EXPIRY_MINUTES) || 15;

  await PasswordResetToken.create({
    user_id: user.id,
    token: hashedToken,
    expires_at: new Date(Date.now() + expiryMinutes * 60 * 1000),
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;

  await transporter.sendMail({
    to: user.email,
    subject: 'Password Reset',
    html: `
      <h3>Password Reset Request</h3>
      <p>Click below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  });

  return { message: 'Reset link sent to email' };
}
async resetPassword(token: string, newPassword: string) {
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const resetEntry = await PasswordResetToken.findOne({
    where: {
      token: hashedToken,
      used: false,
    },
  });

  if (!resetEntry) {
    throw new Error('Invalid or expired token');
  }

  if (resetEntry.expires_at < new Date()) {
    throw new Error('Token expired');
  }

  const user = await User.findByPk(resetEntry.user_id);

  if (!user) {
    throw new Error('User not found');
  }

  const hashedPassword = await this.passwordService.hashPassword(newPassword);

  user.password_hash = hashedPassword;
  await user.save();

  resetEntry.used = true;
  await resetEntry.save();

  return { message: 'Password reset successful' };
}
}