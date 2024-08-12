import { Router } from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../decorators/validateBody.js";
import registerSchema from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const authMiddleWare = validateBody(registerSchema);

const avatarsRouter = Router();

avatarsRouter.post("/register", authMiddleWare, authControllers.register);

avatarsRouter.post("/login", authMiddleWare, authControllers.login);

avatarsRouter.post("/logout", authenticate, authControllers.logout);

avatarsRouter.get("/current", authenticate, authControllers.getCurrent);

avatarsRouter.patch("/subscription", authenticate, authControllers.changePlan);

export default avatarsRouter;
