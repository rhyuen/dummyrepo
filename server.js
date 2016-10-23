var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("PORT", process.env.PORT || 8899);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan("dev"));


var router = express.Router():

router.get("/", function(req, res){

});

router.post("/", function(req, res){

});




app.use("/", router);


app.listen(app.get("PORT"), function(){
  console.log("[%s]: Listening on PORT: %s", new Date().toLocaleString(), app.get("PORT"));
});

module.exports = app;
