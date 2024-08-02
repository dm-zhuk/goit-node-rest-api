import { Sequelize } from "sequelize";

const {
  DATABASE_DIALECT,
  DATABASE_USER,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env;

export const databaseConfig = {
  database: DATABASE_NAME,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  dialect: DATABASE_DIALECT,
  dialectOptions: {
    ssl: false, // Disable SSL
  },
};

const sequelize = new Sequelize(databaseConfig);

export default sequelize;
