// backend/config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../api/models/userModel');
require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  try {
    let user = await User.findByEmail(email); // Ensure this awaits the result
    if (!user) {
      User.create(profile.id, email, true, (err, createdUser) => {
        if (err) return done(err);
        return done(null, createdUser);
      });
    } else {
      return done(null, user);
    }
  } catch (err) {
    return done(err);
  }
}));

// Similar configuration for GitHubStrategy...

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/auth/github/callback',
},
async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  try {
    let user = await User.findByEmail(email);
    if (!user) {
      user = await User.create(profile.id, email, false, (err, createdUser) => {
        if (err) return done(err);
        return done(null, createdUser);
      });
    } else {
      return done(null, user);
    }
  } catch (err) {
    return done(err);
  }
}));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
