import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: "db_contacts_xpce",
  username: "dmzhuk",
  password: "O7JFO0xyBbFWvyrG3aN3awKvUbAB8eeZ",
  host: "dpg-cqmfn3rqf0us73ac8u7g-a.frankfurt-postgres.render.com",
  port: "5432",
  dialect: "postgres",
  dialectOptions: {
    ssl: true,
  },
});

export default sequelize;
