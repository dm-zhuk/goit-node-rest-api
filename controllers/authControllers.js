import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import bcryptjs from "bcryptjs";

const signup = async (req, res) => {
  const newUser = await authServices.signup(req.body);

  res.status(201).json({
    email: newUser.email,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.finddUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcryptjs.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const payload = { id: user.id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });

  // const token = "24.333.33";
  // res.json({ token });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
};
