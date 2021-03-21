import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("postgres://user:pwd@database:5432/db", {
    logging: false
});

