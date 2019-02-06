/**
 * Create Token
 * Dying
 */

const crypto = require("crypto");

/**
 *
 * @param {Object}  [payload]
 * @param {String} [secret]
 */
function createToken(payload, secret) {
  var header = {
    typ: "JWT",
    alg: "HS256"
  };

  if (typeof payload !== "object") {
    throw "Payload must be JSON";
  }

  var payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");
  var headerBase64 = Buffer.from(JSON.stringify(header)).toString("base64");

  var rawToken = headerBase64 + "." + payloadBase64;
  var signatureBase64 = crypto
    .createHmac("SHA256", secret)
    .update(rawToken)
    .digest("base64");

  rawToken += "." + signatureBase64;
  return rawToken;
}

module.exports = createToken;
//console.log(createToken({ username: "dyingg" }, "TEST"));
