import { Request, Response, NextFunction } from 'express';
import * as joi from 'joi';

const googleAuthValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = joi.object().keys({
    accessToken: joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: 'Bad request' });
  }
  req.body = value;
  next();
};

export default googleAuthValidator;
