import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'login';
const jwtEmailSecret = process.env.JWT_EMAIL_SECRET || 'email';
const jwtForgotPasswordSecret = process.env.JWT_FORGOT_PASSWORD_SECRET || 'fp';
const jwtResetPasswordSecret = process.env.JWT_RESET_PASSWORD_SECRET || 'rp';

export const signToken = (email: string, name: string) => {
  return jwt.sign({ email, name }, jwtSecret);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtSecret);
};

export const signEmailToken = (email: string) => {
  return jwt.sign({ email }, jwtEmailSecret);
};

export const verifyEmailToken = (token: string) => {
  return jwt.verify(token, jwtEmailSecret);
};

export const signForgotPasswordToken = (email: string) => {
  return jwt.sign({ email }, jwtForgotPasswordSecret);
};

export const verifyForgotPasswordToken = (token: string) => {
  return jwt.verify(token, jwtForgotPasswordSecret);
};
