import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';

import User from '../models/userModel.js';

export default function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
      }
    )
  );
}
