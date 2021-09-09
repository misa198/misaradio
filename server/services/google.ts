import passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import User from '../models/User';

const clientID = process.env.GOOGLE_CLIENT_ID || '';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';

passport.use(
  new OAuth2Strategy(
    {
      clientID,
      clientSecret,
      callbackURL: '/api/auth/google/callback',
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        if (profile.emails) {
          if (profile.emails.length > 0) {
            const email = profile.emails[0].value;
            const existedUser = await User.findOne({ email });
            if (!existedUser) {
              const user = new User({
                email,
                name: profile.displayName,
                avatar: profile._json.picture,
              });
              const savedUser = await user.save();
              return done(null, savedUser);
            }
            return done(null, existedUser);
          }
        }
        return done(null, null);
      } catch (e) {
        return done(null, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((_user, done) => {
  done(null, null);
});
