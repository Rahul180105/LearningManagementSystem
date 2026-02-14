import { PasswordService } from './password.service';
import { JWTService } from './jwt.service';
import { User, Role } from '../models';
import { RefreshToken } from '../models';


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
      department: data.department,
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
}