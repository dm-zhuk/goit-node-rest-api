import Joi from "joi";
import { emailRegexp } from "../constants/authConstants.js";

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export default registerSchema;

/* 
const jwt = require("jsonwebtoken");
const secretKey = "here-the-key";

function generateJWT(user) {
  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role,
  };
}
const options = { expiresIn: "1w" };
const token = jwt.sign(payload, secretKey, options);
return token;

// to verify a JWT
function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    console.error("JWT verification failed: ", err.message);
    return null;
  }
}

// usage:
const userToken = generateJWT(userOne);
console.log("Generated JWT: ", userToken);

const decodedToken = verifyJWT(userToken);
if (decodedToken) {
  console.log("Decoded JWT payload: ", decodedToken);
}

const authSchema = JWT.object(); */

// Example of JSON header:
/* {
  "alg": "HS256",
  "typ": "JWT"
} */

// Example of JWT payload:
/* {
  "drn": "DS",
  "exp": 1680902696,
  "rexp": "2023-05-05T21:14:56Z"
} */

// Example of JWT signature:
/* HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
) */
