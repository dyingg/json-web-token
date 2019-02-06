var expect = require("chai").expect;
const createToken = require("../jwt/createToken.js");
const authToken = require("../jwt/authToken.js");

describe("createToken(payload, secret)", function() {
  it("Should create a valid JWT, that is accepted by RFC for JWS", function() {
    var correctToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImR5aW5nZyJ9.3i+voP09S1Iox/tx9jqym8+oCZAdvBZZ2oAZULVtYHg=";

    var createdToken = createToken({ username: "dyingg" }, "TEST");

    expect(correctToken).to.be.equal(createdToken);
  });
});

describe("Valid authToken(token, secret)", function() {
  it("Should confirm the validity of a created token by createToken", function() {
    var createdToken = createToken({ username: "dyingg" }, "TEST");

    var value = authToken(createdToken, "TEST");

    expect(value).to.have.property("username");
  });
});

describe("Invalid authToken(token, secret)", function() {
  it("Should not confirm validity of tokens with incorrect keys", function() {
    var createdToken = createToken({ username: "dyingg" }, "TEST");

    var value = authToken(createdToken, "FAIL");

    expect(value).to.be.equal(false);
  });
});
