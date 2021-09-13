import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserRequest } from '../types/UserRequest';
import User from '../models/User';
import { getGoogleUserProfile } from '../services/google';
import * as jwtService from '../services/jwt';
import * as mailService from '../services/mail';

export const googleAuth = async (req: Request, res: Response) => {
  const accessToken = req.body!.accessToken as string;
  try {
    getGoogleUserProfile(accessToken, async (email, name, err) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized' });
      } else {
        const existedUser = await User.findOne({ email });
        let token = '';
        if (!existedUser) {
          const user = new User({ email, name, verified: true });
          const savedUser = await user.save();
          token = jwtService.signToken(email, name, savedUser._id);
        } else {
          token = jwtService.signToken(email, name, existedUser._id);
        }
        return res.send({ data: token });
      }
    });
  } catch (e) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(401).send({ message: 'User not found' });
    }
    if (!user.password)
      return res.status(401).send({ message: 'Wrong password' });
    if (!user.verified)
      return res.status(401).send({ message: 'Email need to be verified' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Wrong password' });
    }
    const token = jwtService.signToken(email, user.name, user._id);
    return res.send({ data: token });
  } catch (e) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(409).send({ message: 'Email is already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verified: false,
    });
    const savedUser = await user.save();
    try {
      mailService.sendMail(
        email,
        'Verify email',
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/api/auth/verify-email?t=${jwtService.signEmailToken(email)}`,
      );
    } catch (e) {}
    return res.send({ data: savedUser._id });
  } catch (e) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const token = req.query.t as string;
  try {
    if (!token) {
      return res.redirect('/404');
    }
    const verified = jwtService.verifyEmailToken(token) as { email: string };
    if (verified) {
      const user = await User.findOne({ email: verified.email });
      if (user) {
        if (user.verified) return res.redirect('/auth/login');
        user.verified = true;
        await user.save();
        return res.redirect('/auth/login');
      }
    }
    return res.redirect('/404');
  } catch (e) {
    return res.redirect('/404');
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { email, password, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Wrong password' });
    }
    const hashedPassword = await bcrypt.hash(
      newPassword,
      bcrypt.genSaltSync(10),
    );
    user.password = hashedPassword;
    await user.save();
    return res.send({ message: 'Password changed' });
  } catch (e) {
    return res.status(400).send({ message: 'Bad request' });
  }
};

export const forgotPasswordRequest = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const token = jwtService.signForgotPasswordToken(email);
    try {
      mailService.sendMail(
        email,
        'Reset password',
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password/${token}`,
      );
    } catch (e) {}
    return res.send({ message: 'Email was be sent' });
  } catch (e) {
    return res.status(400).send({ message: 'Bad request' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { password, token } = req.body;
  try {
    const verified = jwtService.verifyForgotPasswordToken(token) as {
      email: string;
    };
    const user = await User.findOne({ email: verified.email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
    user.password = hashedPassword;
    await user.save();
    return res.send({ message: 'Password changed' });
  } catch (e) {
    return res.status(400).send({ message: 'Bad request' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { email } = (req as UserRequest).user;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.send({
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
};
