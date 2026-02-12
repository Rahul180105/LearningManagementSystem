import bcrypt from 'bcrypt'

export class PasswordService{
    async hashPassword(plainPassword:string):
    Promise<string>{
        if(!plainPassword || plainPassword.trim().length===0){
            throw new Error('Password cannot be empty');
        }
        return bcrypt.hash(plainPassword,10);
    }
    async comparePassword(plainPassword:string,hashedPassword:string):
    Promise<boolean>{
        if(!plainPassword || plainPassword.trim().length===0){
            throw new Error('Password cannot be empty');
        }
        return bcrypt.compare(plainPassword,hashedPassword)
    }
}

