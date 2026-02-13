import jwt from 'jsonwebtoken';
import type {StringValue} from 'ms';

interface JWTPayload {
  userId: number;
  email: string;
  roles: string[];
}

export class JWTService {
  private readonly secret : jwt.Secret;
  private readonly expiry : StringValue;
  constructor(){
    this.secret=process.env.JWT_SECRET!;
    this.expiry=process.env.JWT_ACCESS_EXPIRY as StringValue;
  }

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