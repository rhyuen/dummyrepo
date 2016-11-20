var nconf = require("nconf");

nconf.file("keys.json");

module.exports = {
  db: process.env.dburl || nconf.get("db"),
  github: {
    clientID: "",
    clientSecret: "",
    callbackURL: ""
  },
  cryptos: {
    algorithm: "aes256",
    key: process.env.CRYPTO_KEY || "KEY"
  },
  sessionSecret: process.env.SESSION_SECRET || nconf.get("sessionSecret"),

  twitter: {
    consumerKey: process.env.twitterConsumerKey || nconf.get("twitter:consumerKey"),
    consumerSecret: process.env.twitterConsumerSecret || nconf.get("twitter:consumerSecret"),
    callbackURL: process.env.twitterCallbackURL || nconf.get("twitter:callbackURL"),
    passReqToCallback: true
  }
};
