import bcryptjs from "bcryptjs";
import User from "../db/models/User.js";

export const findUser = (query) => User.findOne({ where: query });

export const updateUser = async (query, data) => {
  const user = await findUser(query);
  if (!user) {
    return null;
  }
  return user.update(data, { returning: true });
};

export const register = async (data) => {
  try {
    const { password } = data;
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({ ...data, password: hashPassword });
    return newUser;
  } catch (error) {
    if (error?.parent?.code === "23505") {
      error.message = "Email in use";
    }
    throw error;
  }
};

export default { findUser, updateUser, register };
