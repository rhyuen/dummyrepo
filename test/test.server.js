var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server.js");
var should = chai.should();

chai.use(chaiHttp);

describe("Server TEst", function(){
  it("should list ALL blobs on /blobs GET", function(done){
    chai.request(server)
      .get("/")
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
});

//TODO: TESTING
//TODO: AUTH
