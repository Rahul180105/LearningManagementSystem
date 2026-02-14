import jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';

interface AccessPayload {
  userId: number;
  email: string;
  roles: string[];
}

interface RefreshPayload {
  userId: number;
}

export class JWTService {
  private readonly accessSecret: jwt.Secret;
  private readonly refreshSecret: jwt.Secret;
  private readonly accessExpiry: StringValue;
  private readonly refreshExpiry: StringValue;

  constructor() {
    this.accessSecret = process.env.JWT_SECRET!;
    this.refreshSecret = process.env.JWT_REFRESH_SECRET!;
    this.accessExpiry = process.env.JWT_ACCESS_EXPIRY as StringValue;
    this.refreshExpiry = process.env.JWT_REFRESH_EXPIRY as StringValue;
  }

  // 🔐 Generate Access Token
  generateAccessToken(payload: AccessPayload): string {
    return jwt.sign(payload, this.accessSecret, {
      expiresIn: this.accessExpiry,
    });
  }

  // 🔁 Generate Refresh Token
  generateRefreshToken(userId: number): string {
    return jwt.sign({ userId }, this.refreshSecret, {
      expiresIn: this.refreshExpiry,
    });
  }

  // ✅ Verify Access Token
  verifyAccessToken(token: string): AccessPayload {
    try {
      return jwt.verify(token, this.accessSecret) as AccessPayload;
    } catch {
      throw new Error('Invalid access token');
    }
  }

  // ✅ Verify Refresh Token
  verifyRefreshToken(token: string): RefreshPayload {
    try {
      return jwt.verify(token, this.refreshSecret) as RefreshPayload;
    } catch {
      throw new Error('Invalid refresh token');
    }
  }
}