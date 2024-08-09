import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  try {
    const newUser = await authServices.register(req.body);

    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription || "starter",
    });
  } catch (error) {
    if (error?.message === "Email in use") {
      return res.status(409).json({ message: error.message });
    }
    next(HttpError(400, "Error from Joi or other validation library"));
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcryptjs.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const { id } = user;
  const users = await getUsers({ owner: id });
  const payload = { id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
  await authServices.updateUser({ id }, { token });

  res.json({ token, user: { email, subscription: user.subscription } });
};

const logout = async (req, res) => {
  const { id } = req.user;
  await authServices.updateUser({ id }, { token: "" });

  res.json({ message: "No Content" });
};

const getCurrent = async (req, res) => {
  const { email, id } = req.user;
  const users = await getUsers({ owner: id });

  res.json({ user: { email, subscription: user.subscription } });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
};
