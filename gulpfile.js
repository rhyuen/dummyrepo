var gulp = require("gulp");
var mocha = require("gulp-mocha");
var bkgd = require("gulp-bg");

var bkgdstart;
gulp.task("start", bkgdstart = bkgd("node", "./server.js"));

gulp.task("test", ["start"], function(){
  return gulp.src("./tests/*.js", {read: false})
    .pipe(mocha({reporter: "nyan"}))
    .once("end", function(){
      bkgdstart.setCallback(function(){
        process.exit(0);
      });
      bkgdstart.stop(0);
    })
    .once("error", function(){
      bkgdstart.setCallback(function(){
        process.exit(0);
      });
      bkgdstart.stop(0);
    });
});

gulp.task("default", ["start"], function(){
  gulp.watch(["server.js"], ["start"]);
});
