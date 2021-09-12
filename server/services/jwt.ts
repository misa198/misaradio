import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'login';
const jwtEmailSecret = process.env.JWT_EMAIL_SECRET || 'email';
const jwtForgotPasswordSecret = process.env.JWT_FORGOT_PASSWORD_SECRET || 'fp';
const expiresIn = process.env.JWT_EXPIRE || '7d';
const emailExpiresIn = process.env.JWT_EMAIL_TEMP_EXPIRE || '5m';

export const signToken = (email: string, name: string, id: string) => {
  return jwt.sign({ email, name, id }, jwtSecret, {
    expiresIn,
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtSecret);
};

export const signEmailToken = (email: string) => {
  return jwt.sign({ email }, jwtEmailSecret, { expiresIn });
};

export const verifyEmailToken = (token: string) => {
  return jwt.verify(token, jwtEmailSecret);
};

export const signForgotPasswordToken = (email: string) => {
  return jwt.sign({ email }, jwtForgotPasswordSecret, {
    expiresIn: emailExpiresIn,
  });
};

export const verifyForgotPasswordToken = (token: string) => {
  return jwt.verify(token, jwtForgotPasswordSecret);
};
