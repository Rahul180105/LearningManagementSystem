import jwt from 'jsonwebtoken'
import {JWTService} from '@lms/shared-auth'
import { email } from 'zod';

describe('JWTService',()=>{
  let jwtService:JWTService;
  beforeEach(()=>{
    jwtService=new JWTService();
  })
  describe('generateAccessToken',()=>{
    it('should generate a valid access token',()=>{
        const payload={
            userId:1,
            email:'test@example.com',
            roles:['learner']
        };
        const token=jwtService.generateAccessToken(payload);
        const decoded=jwtService.verifyAccessToken(token);
        expect(decoded.userId).toBe(1);
        expect(decoded.email).toBe('test@example.com');
    });
    it('should throe error for invalid token',()=>{
        expect(()=>jwtService.verifyAccessToken('invalid.token')).toThrow();
    });
  });
});