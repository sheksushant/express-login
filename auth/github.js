var passport = require('passport');

var GitHubStrategy = require('passport-github').Strategy;

var User = require('../models/User');

passport.use(new GitHubStrategy({
  clientID: "ENTER CLIENT ID",
  clientSecret: "ENTER CLIENT SECRET",
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({userid: profile.id}, {name: profile.displayName,userid: profile.id}, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = passport;