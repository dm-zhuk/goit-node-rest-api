import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import { emailRegexp } from "../../constants/authConstants.js";

const User = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: [true, "Set password for user"],
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      isEmail(value) {
        if (!emailRegexp.test(value)) {
          throw new Error("Email not validated");
        }
      },
    },
  },
  subscription: {
    type: DataTypes.STRING,
    allowNull: true,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  avatarURL: {
    type: DataTypes.STRING,
    defaultValue: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// User.sync({ force: true });

export default User;
