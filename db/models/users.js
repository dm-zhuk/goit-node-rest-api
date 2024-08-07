import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const users = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// users.sync();

export default users;

/* password: {
        type: DataTypes.STRING,
    required: [true, "Password is required"],
  },
  email: {
        type: DataTypes.STRING,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
        type: DataTypes.STRING,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
        type: DataTypes.STRING,
    default: null,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  }, */
