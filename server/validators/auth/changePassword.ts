import { Request, Response, NextFunction } from 'express';
import * as joi from 'joi';

const changePasswordValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    newPassword: joi.string().min(6).required(),
  });

  console.log('body', req.body);

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: 'Bad request' });
  }
  req.body = value;
  next();
};

export default changePasswordValidator;
