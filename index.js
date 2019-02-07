const cookie = require("cookie");
const jwtCheckPayload = require("./jwt/authToken.js");
const createJwt = require("./jwt/createToken.js");
const crypto = require("crypto");

/**
 * @param {Object}[options]
 * @param {String}[options.secret]
 */

function jwt(options) {
  if (!options.secret) {
    throw "Client needs a valid secret to function";
  }

  var secret = options.secret;

  /**
   * Hash the given `sess` object omitting changes to `.cookie`.
   *
   * @param {Object} sess
   * @return {String}
   * @private
   */

  function hash(sess) {
    // serialize
    var str = JSON.stringify(sess);

    // hash
    return crypto
      .createHash("sha1")
      .update(str, "utf8")
      .digest("hex");
  }

  return function jwt(req, res, next) {
    var cookies = cookie.parse(req.headers.cookie);

    if (!cookies.token) {
      //No token has been set up yet.
      req.token = {};
      req.session = {};
    } else {
      //Get token from cookie
      var token = cookies.token;

      //jwt check payload with secret
      var payload = jwtCheckPayload(token, secret);

      if (payload == false) {
        req.token = {};
        req.session = {};
      } else {
        req.token = payload;
        req.session = payload;
      }

      var originalHash = hash(payload);
    }

    function isModified() {
      if (req.token || req.session) {
        return !(
          originalHash == hash(req.token) || originalHash == hash(req.session)
        );
      } else {
        return false;
      }
    }

    var _end = res.end;
    var _write = res.write;
    var ended = false;

    // Function to save token as cookie
    function saveToken() {
      // Check if token is  modified

      if (isModified()) {
        //Set cookie header

        console.log("Token was saved");
        console.log(req.token);

        res.setHeader(
          "Set-Cookie",
          cookie.serialize(
            "token",
            createJwt(req.session || req.token, secret),
            {
              maxAge: 60 * 60 * 24 * 7
            }
          )
        );
      }
    }

    //res access for function to save token
    res.saveToken = saveToken;

    // //Proxy end to mimic functionality of express-session.
    // res.end = function end(chunk, encoding) {
    //   if (ended) {
    //     return false;
    //   }
    //   ended = true;

    //   saveToken();

    //   _end.call(res, chunk, encoding);
    // };

    // res.write = function write(chunk, encoding) {
    //   if (ended) {
    //     return false;
    //   }

    //   saveToken();

    //   _write.call(res, chunk, encoding);
    // };
    next();
  };
}

module.exports = jwt;
