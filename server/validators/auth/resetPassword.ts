import { Request, Response, NextFunction } from 'express';
import * as joi from 'joi';

const resetPasswordValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = joi.object({
    token: joi.string().required(),
    password: joi.string().min(6).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: 'Bad request' });
  }
  req.body = value;
  next();
};

export default resetPasswordValidator;
