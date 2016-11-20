var passport = require("passport");
var TwitterStrategy = require("passport-twitter").Strategy;
var User = require("./models/user.js");
var config = require("./config.js");

passport.serializeUser(function(user, done){
  done(null, user);
});
passport.deserializeUser(function(user, done){
  done(null, user);
});

passport.use(new TwitterStrategy(config.twitter, function(req, accessToken, tokenSecret, profile, done){
  User.findOne({twitterId: profile.id}, function(err, existingUser){
    if(err)
      console.log(err);
    if(existingUser)
      return done(null, existingUser);
    var user = new User();
    user.twitterId = profile.id;
    user.username = profile.id;
    user.email = "";
    user.name = profile.displayName;
    user.created = new Date();
    user.accessToken = user.encrypt(accessToken);
    user.tokenSecret =user.encrypt(tokenSecret);
    user.save(function(err){
      if(err){
        console.log(err);
      }else{
        console.log("[%s] New User saved. %s", new Date().toLocaleString(), user);
        done(err, user);
      }
    });
  });
}));

exports.twitter = passport.authenticate("twitter");
exports.twitterCallback = passport.authenticate("twitter", {failureRedirect: "/"});

exports.logout = function(req, res){
  req.logout();
  req.session.destroy();
  res.redirect("/");
};


//FROM THE OTHER TUT.
// module.exports = function(){
//   passport.serializeUser(function(user, done){
//     done(null, user.id);
//   });
//
//   passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//       if(err)
//         console.log(err);
//       done(err, user);
//     });
//   });
// };
