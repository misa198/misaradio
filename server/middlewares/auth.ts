import { NextFunction, Request, Response } from 'express';
import * as jwtService from '../services/jwt';
import { UserRequest } from '../types/UserRequest';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenBearer = req.headers.authorization;
    if (tokenBearer) {
      const token = tokenBearer.split('Bearer ')[1];
      if (token) {
        const payload = jwtService.verifyToken(token);
        if (payload) {
          (req as UserRequest).user = payload as {
            email: string;
            name: string;
            id: string;
          };
          return next();
        }
      }
    }
    return res.status(401).json({
      message: 'Unauthorized',
    });
  } catch (e) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

export default authMiddleware;
