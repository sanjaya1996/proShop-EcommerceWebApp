import express from 'express';
import passport from 'passport';

const router = express.Router();

// @desc Auth with Google
// @route GET /auth/google

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @desc Google auth callback
// @route GET /auth/google/callback

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.send('You are logged in');
  }
);

export default router;
