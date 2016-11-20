var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var session = require("express-session");
var path = require("path");
var config = require("./config.js");
var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("PORT", process.env.PORT || 8787);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(config.db, function(err){
  if(err){
    console.log("[%s] DB CONN ERROR.", new Date().toLocaleString());
  }else{
    console.log("[%s] DB CONN Attempted.", new Date().toLocaleString());
  }
});





var router = require("./routes/mainroute.js");
app.use("/", router);


app.listen(app.get("PORT"), function(){
  console.log("[%s]: Listening on PORT: %s", new Date().toLocaleString(), app.get("PORT"));
});

module.exports = app;
