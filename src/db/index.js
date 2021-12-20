import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config() // to make sure everything inside .env is parsed correctly
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize( DATABASE_URL, {
  logging: false,
  dialect: "postgres",
  dialectOptions: {       
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const testDB = async () => {
  try {
    await sequelize.authenticate({ logging: false });
    console.log("DB is authenticated");
    await sequelize.sync().then(() => console.log("The server is connected to postgres"))
    console.log("DB is established");
  } catch (error) {
    console.log("Failed to authenticate", error);
  }
};

export default sequelize;