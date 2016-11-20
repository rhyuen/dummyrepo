var mongoose = require("mongoose");
var crypto = require("crypto");
var config = require("../config.js");

var userSchema = mongoose.Schema({
  twitterId: {type: String, unique: true, required: true},
  username: {type: String, unique: true, lowercase: true, required: true},
  email: {type: String, lowercase: true},
  name: {type: String, default: ""},
  created: {type: Date, default: new Date()},
  accessToken: {type: String, required: true},
  tokenSecret: {type: String, required: true}
});

userSchema.methods.encrypt = function(text){
  var algorithm = config.cryptos.algorithm;
  var key = config.cryptos.key;
  var cipher = crypto.createCipher(algorithm, key);
  return cipher.update(text, "utf8", "hex") + cipher.final("hex");
}

userSchema.methods.decrypt = function(text){
  var algorithm = config.cryptos.algorithm;
  var key = config.cryptos.key;
  var decipher = crypto.createDecipher(algorithm, key);
  return decipher.update(text, "hex", "utf8") + decipher.final("utf8");
}

module.exports = mongoose.model("User", userSchema);
