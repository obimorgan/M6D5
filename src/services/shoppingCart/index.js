/** @format */

import express from "express";
import { ShoppingCart, Product } from "../../db/models/index.js";
import { Op, Sequelize } from "sequelize";
import sequelize from "../../db/index.js";
const router = express.Router();

router.route("/:userId").get(async (req, res, next) => {
  try {
    const cartItem = await ShoppingCart.findAll({
      include: Product,
      attributes: [
        "productId",
        [
          sequelize.fn("count", sequelize.col("shoppingCart.id")),
          "unitQuantity",
        ],
        [sequelize.fn("sum", sequelize.col("product.price")), "unitTotalPrice"],
      ],
      group: ["productId", "product.id"],
      where: {
        userId: req.params.userId,
      },
    });
    const totalQuantity = await ShoppingCart.count({
      where: {
        userId: req.params.userId,
      },
    })
    const totalSumPrice = await ShoppingCart.sum("product.price", {
      include: { model:Product, attributes: [], } })
    res.send({cartItem, totalQuantity, totalSumPrice});
  } catch (error) {
    console.log(error);
    next(error);
  }
  
});

router
  .route("/:productId/:userId")
  .post(async (req, res, next) => {
    try {
      const { userId, productId } = req.params;
      console.log(req.params);
      const cartItem = await ShoppingCart.create({ userId, productId });
      res.send(cartItem);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const data = await ShoppingCart.destroy({
        where: { userId, productId },
      });
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

export default router;
