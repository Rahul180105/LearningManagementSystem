import jwt from 'jsonwebtoken';

interface JWTPayload {
  userId: number;
  email: string;
  roles: string[];
}

export class JWTService {
  private readonly secret = process.env.JWT_SECRET || 'testsecret';
  private readonly expiry = process.env.JWT_ACCESS_EXPIRY || '15m';

  generateAccessToken(payload: JWTPayload): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiry
    });
  }

  verifyAccessToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.secret) as JWTPayload;
    } catch {
      throw new Error('Invalid token');
    }
  }
}