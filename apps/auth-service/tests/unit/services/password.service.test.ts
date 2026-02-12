import {PasswordService} from '../../../src/services/password.service';

describe('PasswordService',()=>{
    let passwordService:PasswordService;
    beforeEach(()=>{
     passwordService=new PasswordService();
    });
    describe('hashPassword',()=>{
    it('should has password sucessfully',async()=>{
        const plainPassword='SecurePass123';
        const hashedPassword=await passwordService.hashPassword(plainPassword);
        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toBe(plainPassword);
      });
    });
    describe('comparePassword',()=>{
    it('should return true for matching password',async()=>{
        const plainPassword='SecurePassword123';
        const hashedPassword=await passwordService.hashPassword(plainPassword);
        const isMatch=await passwordService.comparePassword(plainPassword,hashedPassword);
        expect(isMatch).toBe(true);
      });
    it('should return false for not matching password',async()=>{
        const plainPassword='SecurePassword123';
        const hashedPassword=await passwordService.hashPassword(plainPassword);
        const isMatch=await passwordService.comparePassword('WrongPassword',hashedPassword);
        expect(isMatch).toBe(false);
      });
    });
    describe('validation',()=>{
        it('should throw an error if password is empty while hashing',async()=>{
            await expect(passwordService.hashPassword('')).rejects.toThrow();
        });
        it('should throw an error if password isempty while comparing',async()=>{
            await expect(passwordService.comparePassword('','somehash')).rejects.toThrow();
        });
    })
});


