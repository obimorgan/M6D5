import sequelize from "../index.js";
import s, { INTEGER, Sequelize } from "sequelize";
const { DataTypes } = s;

const ShoppingCart = sequelize.define(
  "shoppingCart",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }
  
);

export default ShoppingCart;