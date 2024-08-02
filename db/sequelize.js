import { Sequelize } from "sequelize";

/* const {
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
    ssl: true,
  },
}; */

export const databaseConfig = {
  database: "db_contacts_xpce",
  username: "dmzhuk",
  password: "O7JFO0xyBbFWvyrG3aN3awKvUbAB8eeZ",
  host: "dpg-cqmfn3rqf0us73ac8u7g-a.frankfurt-postgres.render.com",
  port: "5432",
  dialect: "postgres",
  dialectOptions: {
    ssl: true,
  },
};

const sequelize = new Sequelize(databaseConfig);

export default sequelize;
