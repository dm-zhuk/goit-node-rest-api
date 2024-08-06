import { Router } from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../decorators/validateBody.js";
import authSignupSchema from "../schemas/authSchemas.js";

const signupMiddleWare = validateBody(authSignupSchema);

const authRouter = Router();

authRouter.post("/signup", signupMiddleWare, authControllers.signup);

export default authRouter;
