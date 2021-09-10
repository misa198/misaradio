import { Request, Response, NextFunction } from 'express';
import * as joi from 'joi';

const forgotPasswordRequestValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = joi.object({
    email: joi.string().email().required(),
  });

  console.log('body', req.body);

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: 'Bad request' });
  }
  req.body = value;
  next();
};

export default forgotPasswordRequestValidator;
