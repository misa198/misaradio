import { Request, Response } from 'express';
import User from '../models/User';
import { getGoogleUserProfile } from '../services/google';
import * as jwtService from '../services/jwt';

export const googleAuth = async (req: Request, res: Response) => {
  const accessToken = req.body!.accessToken as string;
  try {
    getGoogleUserProfile(accessToken, async (email, name, err) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized' });
      } else {
        const existedUser = await User.findOne({ email });
        if (!existedUser) {
          const user = new User({ email, name });
          await user.save();
        }
        const token = jwtService.signToken(email, name);
        return res.send({ data: token });
      }
    });
  } catch (e) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
};
