import bcryptjs from "bcryptjs";
import { nanoid } from "nanoid";
import User from "../db/models/User.js";
import sendMail from "../helpers//sendMail.js";

const { BASE_URL } = process.env;

export const findUser = (query) => User.findOne({ where: query });

export const updateUser = async (query, data) => {
  const user = await findUser(query);
  if (!user) {
    return null;
  }
  return user.update(data, { returning: true });
};

export const sendVerifyMail = (email, verificationCode) => {
  const verifyMail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`,
  };

  return sendMail(verifyMail);
};

export const register = async (data) => {
  try {
    const { password } = data;
    const hashPassword = await bcryptjs.hash(password, 10);
    const verificationCode = nanoid();
    const newUser = await User.create({
      ...data,
      password: hashPassword,
      verificationCode,
    });

    await sendVerifyMail(data.email, verificationCode);

    return newUser;
  } catch (error) {
    if (error?.parent?.code === "23505") {
      error.message = "Email in use";
    }
    throw error;
  }
};
