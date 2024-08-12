import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getAllContacts } from "../services/contactsServices.js";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  try {
    const { subscription = "starter", ...userData } = req.body;
    const newUser = await authServices.register({ ...userData, subscription });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    if (error?.message === "Email in use") {
      return res.status(409).json({ message: error.message });
    }
    next(error);
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
  const contacts = await getAllContacts({ owner: id });

  const payload = { id };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "48h" });
  await authServices.updateUser({ id }, { token });

  res.json({
    token,
    user: { email, subscription: user.subscription, contacts },
  });
};

const logout = async (req, res) => {
  const { id } = req.user;
  await authServices.updateUser({ id }, { token: "" });

  res.status(204).end();
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const changePlan = async (req, res, next) => {
  const { user } = req;
  const { subscription } = req.body;

  if (!["starter", "pro", "business"].includes(subscription)) {
    return next(HttpError(400, "Invalid subscription plan"));
  }

  try {
    const updatedUser = await authServices.updateUser(
      { id: user.id },
      { subscription }
    );

    if (!updatedUser) {
      return next(HttpError(404, "User not found"));
    }

    res.json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  changePlan: ctrlWrapper(changePlan),
};
