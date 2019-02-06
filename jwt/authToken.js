/**
 * Authenticate a given JWS
 * Dying
 */

/**
 *
 * @param {*} token
 * @param {*} secret
 */
const crypto = require("crypto");

function authenticateToken(token, secret) {
  var representation = token.split(".");

  //Verify the token is of the correct format
  if (representation.length !== 3) {
    return false;
  }

  try {
    var header = JSON.parse(Buffer.from(representation[0], "base64"));
    if (header.alg !== "HS256") throw { err: "Only HMAC-SHA256 is supported!" };

    var payload = JSON.parse(Buffer.from(representation[1], "base64"));
    var signature = crypto
      .createHmac("SHA256", secret)
      .update(representation[0] + "." + representation[1])
      .digest("base64");

    if (signature === representation[2]) {
      return payload;
    } else {
      return false;
    }
  } catch (e) {
    console.log("Rejected Token - ");
    console.log(e);
    return false;
  }
}

module.exports = authenticateToken;
