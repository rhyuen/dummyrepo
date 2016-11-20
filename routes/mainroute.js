var express = require("express");
var auth = require("../auth.js");
var path = require("path");
var router = express.Router();

router.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "public/index.html"));
});

router.get("/auth/twitter", auth.twitter);
router.get("/auth/twitter/callback", auth.twitterCallback, function(req, res){
  res.redirect(req.session.returnTo || "/");
});
router.get("/auth/logout", auth.logout);

router.post("/", function(req, res){
  res.send("root post");
});

module.exports = router;
