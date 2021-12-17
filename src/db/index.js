import { Sequelize } from "sequelize";

const { PGPORT, PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  port: PGPORT,
  host: PGHOST,
  dialect: "postgres",
});

export const testDB = async () => {
  try {
    await sequelize.authenticate({ logging: false });
    console.log("DB is authenticated");
    await sequelize.sync()
    console.log("DB is established");
  } catch (error) {
    console.log("Failed to authenticate", error);
  }
};

export default sequelize;