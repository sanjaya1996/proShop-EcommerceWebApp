const express = require('express');
const passport = require('passport');
const session = require('express-session');

const generateToken = require('../utils/generateToken');

const router = express.Router();

const originUri = process.env.ORIGIN_URI_PROSHOP;

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
    res.redirect(`${originUri}/login?redirect=${redirect}`);
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
  res.redirect(originUri);
});

module.exports = router;
