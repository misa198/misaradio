import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || '';

export const signToken = (email: string, name: string) => {
  return jwt.sign({ email, name }, jwtSecret);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtSecret);
};
