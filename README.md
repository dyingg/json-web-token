# Express-JWT

Custom JWT manager for express.

## Example

```js
const jwt = require("./jwt/index.js");

app.use(jwt({ secret: "......RANDOM APP SECRET STRING........" }));
app.get("/", (req, res) => {
  req.token.username = "dyingg";

  //Save value
  req.saveToken();
});

//req.token is analogous to req.session to provide easy compatiability with express-session replacement(TODO)

//Currently

app.get("/ep2", (req, res) => {
  req.session.username = "dyingg";
  req.saveToken();
});

//Is the same as above
```

#### Note :

Only one of req.session or req.token must be used throughout the application, interchangeable usage is not advised.

## Todo

- generate dynamic secret key as stated in RFC7515
- decline user keys that do not have 128 bit entropy unless using unsafe mode.
- add auto save on res.end() [Currently breaking when res.write is used]

## Project

Goal is to comply with RFC 7515

https://tools.ietf.org/html/rfc7515#page-10

Custom token implementation in place.

##### This repository and all code in it is owned by and the property of the Author, usage without permission may be punishable by copyright laws.
