import authRouter from "./routes/authRouter.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import sequelize from "./db/sequelize.js";
import passportJWT from "passport-jwt";
import jwt from "jsonwebtoken";
import authSchema from "./schemas/authSchemas.js";
import users from "./db/models/users.js";
import "dotenv/config";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

const hashPassword = async (password) => {
  const result = await bcryptjs.hash(password, 10);
};

const { JWT_SECRET } = process.env;
const payload = { id: 25 };
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
console.log(token);

/* const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy
passport.use(
  new Strategy(params, function (payload, done) {
    users.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error("users not found"));
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  })
); */

app.use("/api/user", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { PORT = 3000 } = process.env;
const port = parseInt(PORT);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");
    app.listen(port, () => {
      console.log(`Server is running. Use API on port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  }
};

startServer();
