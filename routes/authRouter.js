import { Router } from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../decorators/validateBody.js";
import registerSchema from "../schemas/authSchemas.js";

const registerMiddleWare = validateBody(registerSchema);

const authRouter = Router();

// authRouter.get("/", authControllers.users);
authRouter.get("/register", registerMiddleWare, authControllers.register);
authRouter.post("/register", registerMiddleWare, authControllers.register);

export default authRouter;
