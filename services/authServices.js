import users from "../db/models/users.js";

// const getAll = () => users.findAll(users, { order: [["id", "asc"]] });

export const register = async (data) => {
  try {
    const newUser = await users.create(data);
    return newUser;
  } catch (error) {
    if (error?.parent?.code === "23505") {
      // console.error(error.parent.code);
      // console.error(error.parent.detail);
      error.message();
    }
    throw error;
  }
};

// export { getAll, register };
