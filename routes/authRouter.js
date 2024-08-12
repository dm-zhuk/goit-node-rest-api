import { Router } from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../decorators/validateBody.js";
import registerSchema from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const authMiddleWare = validateBody(registerSchema);

const authRouter = Router();

authRouter.post("/register", authMiddleWare, authControllers.register);

authRouter.post("/login", authMiddleWare, authControllers.login);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.patch("/subscription", authenticate, authControllers.changePlan);

export default authRouter;
