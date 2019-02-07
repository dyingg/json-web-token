var express = require("express");
var app = express();

const jwt = require("./index.js");

app.use(jwt({ secret: "RIDMENU" }));

var counter = 0;
app.get("/", (req, res) => {
  console.log("value of token");
  console.log("IN CODE " + JSON.stringify(req.token));

  req.token.count = counter;
  counter++;
  res.saveToken();
  res.write("Mello");
  res.end();
});

app.listen(80);
