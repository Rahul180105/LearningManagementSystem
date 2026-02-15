import {z} from 'zod';

/**
 * Regester Schema
 */
export const registerSchema=z.object({
    email:z.string().email('Invaid email format'),
    username:z.string().min(3,'Username must be of 3 characters'),
    password:z.string().min(8,'Password must be at least 8 characters'),
    first_name:z.string().min(1,'First name is required'),
    last_name:z.string().min(1,'Last name is required'),
    department:z.string().optional(),
});

/**
 * Login Schema
 */
export const loginSchema=z.object({
    email:z.string().email('Invaid email format'),
    password:z.string().min(1,'Password is required')
})

/**
 * Refresh Token Schema
 */
export const refreshSchema=z.object({
    refreshToken:z.string().min(1,'Refresh token is required')
})