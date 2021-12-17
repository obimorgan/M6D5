import sequelize from "../index.js";
import s, { INTEGER } from "sequelize";
const { DataTypes } = s;

const ShoppingCart = sequelize.define(
  "shoppingCart",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  }
  //   {
  //     timestamps: false,
  //   }
);

export default ShoppingCart;