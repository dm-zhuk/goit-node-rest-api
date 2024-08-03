import { Sequelize } from "sequelize";
import { databaseConfig } from "./config.js";

const sequelize = new Sequelize({
  username: databaseConfig.username,
  database: databaseConfig.database,
  password: databaseConfig.password,
  host: databaseConfig.host,
  port: databaseConfig.port,
  dialect: databaseConfig.dialect,
  dialectOptions: {
    ssl: true,
  },
});

export default sequelize;
