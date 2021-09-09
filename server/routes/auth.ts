import { Router } from 'express';
import passport from 'passport';
require('../services/google');

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  (req, res) => {
    console.log(req.user);
    res.send({ message: 'success' });
  },
);

export default router;
