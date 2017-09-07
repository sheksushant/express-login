var passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User');

passport.use(new FacebookStrategy({
  clientID: "ENTER CLIENT ID",
  clientSecret: "ENTER CLIENT SECRET",
  callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id}, function(err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
}
));

module.exports = passport;