import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {

  // 🔹 Register
  async register(req: Request, res: Response) {
    try {
      const user = await authService.register(req.body);

      res.status(201).json({
        message: 'User registered successfully',
        user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // 🔹 Login
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      res.status(200).json({
        success: true,
        ...result, // accessToken + refreshToken
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: error.message,
      });
    }
  }

  // 🔹 Refresh Access Token
  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          error: 'Refresh token required',
        });
      }

      const result = await authService.refresh(refreshToken);

      res.status(200).json({
        success: true,
        ...result, // new accessToken
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: error.message,
      });
    }
  }

  // 🔹 Logout (Revoke Refresh Token)
  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          error: 'Refresh token required',
        });
      }

      await authService.logout(refreshToken);

      res.status(200).json({
        success: true,
        message: 'Logout successful',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // 🔹 Current User
  async me(req: Request, res: Response) {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
async forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

async resetPassword(req: Request, res: Response) {
  try {
    const { token, newPassword } = req.body;
    const result = await authService.resetPassword(token, newPassword);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

}