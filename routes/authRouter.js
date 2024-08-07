import { Router } from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../decorators/validateBody.js";
import registerSchema from "../schemas/authSchemas.js";

const registerMiddleWare = validateBody(registerSchema);

const authRouter = Router();

authRouter.post("/register", registerMiddleWare, authControllers.register);
authRouter.post("/login", registerMiddleWare, authControllers.login);
// authRouter.post("/logout", registerMiddleWare, authControllers.logout);

export default authRouter;
