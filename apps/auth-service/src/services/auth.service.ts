import { PasswordService } from './password.service';
import { JWTService } from './jwt.service';

interface User {
  id: number;
  email: string;
  password: string;
  roles: string[];
}

export class AuthService {
  constructor(
    private passwordService: PasswordService,
    private jwtService: JWTService
  ) {}

  // Temporary in-memory user (simulate DB)
  private async findUserByEmail(email: string): Promise<User | null> {
    if (email !== 'test@test.com') {
      return null;
    }

    const hashedPassword = await this.passwordService.hashPassword(
      'SecurePass123!'
    );

    return {
      id: 1,
      email: 'test@test.com',
      password: hashedPassword,
      roles: ['learner']
    };
  }

  async login(email: string, password: string) {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await this.passwordService.comparePassword(
      password,
      user.password
    );

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.jwtService.generateAccessToken({
      userId: user.id,
      email: user.email,
      roles: user.roles
    });

    return { accessToken };
  }
}