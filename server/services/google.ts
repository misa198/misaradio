import { OAuth2Strategy } from 'passport-google-oauth';
import passport from 'passport';

const clientID = process.env.GOOGLE_CLIENT_ID || '';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';

passport.use(
  new OAuth2Strategy(
    {
      clientID,
      clientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);
