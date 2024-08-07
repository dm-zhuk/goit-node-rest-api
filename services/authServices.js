import bcryptjs from "bcryptjs";
import users from "../db/models/users.js";

export const findUser = (query) => users.findOne({ where: query });

export const register = async (data) => {
  try {
    const { password } = data;
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await users.create({ ...data, password: hashPassword });
    return newUser;
  } catch (error) {
    if (error?.parent?.code === "23505") {
      error.message = "Email in use";
    } else if (error) {
      error.message = "Error from Joi or other validation library";
    }
    throw error;
  }
};
