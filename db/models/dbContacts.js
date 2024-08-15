import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const dbContacts = sequelize.define("contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  avatarURL: {
    type: DataTypes.STRING,
    defaultValue: false,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// dbContacts.sync({ force: true });

export default dbContacts;
