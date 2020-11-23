import express from 'express';
import passport from 'passport';
import session from 'express-session';

import generateToken from '../utils/generateToken.js';

const router = express.Router();

// @desc Auth with Google
// @route GET /auth/google

router.get(
  '/google',
  (req, res, next) => {
    req.session.redirectPath = req.query.redirect;
    next();
  },
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @desc Google auth callback
// @route GET /auth/google/callback

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const redirect = req.session.redirectPath;
    res.redirect(`/login?redirect=${redirect}`);
  }
);

router.get('/currentuser', (req, res) => {
  const user = req.user;
  if (user) {
    res.json({
      _id: user._id,
      googleId: user.googleId,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.send(null);
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;
