var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var MongoClient = require('mongodb').MongoClient;

passport.use(new LocalStrategy(
  function (username, password, done) {
    var url = 'mongodb://localhost:27017/expresslogin';
    MongoClient.connect(url, function (err, db) {
      var collection = db.collection('users');
      collection.findOne({ username: username },
      function (err, results) {
        if (results.password === password) {
          var user = results;
          done(null, user);
        } else {
          done(null, false, { message: 'Bad Pass' });
        }}
      );
      db.close();
    });
  }
));
