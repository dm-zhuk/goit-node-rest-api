import Joi from "joi";
import { emailRegexp } from "../constants/authConstants.js";

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().min(3),
});

export default registerSchema;
