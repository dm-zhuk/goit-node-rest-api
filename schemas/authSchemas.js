import JWT from "passport-jwt";

const jwt = require("jsonwebtoken");
const secretKey = "here-the-key";

function generateJWT(user) {
  const payload = { userId: user.id, username: user.username, role: user.role };
}
const options = { expiresIn: "1h" };
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

const authSchema = JWT.object({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  //  Змінити схему контактів, щоб кожен користувач бачив тільки свої контакти. Для цього в схемі контактів додати властивість:
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

export default authSchema;

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
