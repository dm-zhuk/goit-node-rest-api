import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const users = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: [true, "Password is required"],
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    required: [true, "Email is required"],
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
});

// users.sync();

export default users;

/* 
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  
  // check this out

  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "users",
      key: "id",
    },
  },*/
