import express from "express";
import { ShoppingCart } from "../../db/models/index.js";
// import { Op, Sequelize } from "sequelize";
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const cartItem = await ShoppingCart.findAll()
      res.send(cartItem);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
        const { productId, ...rest } = req.body;
        console.log(rest)
        const cartItem = await ShoppingCart.create(rest);
        if (cartItem) {

          const dataToInsert = productId.map((id) => ({
            productId: id,
            UserId: user.id,
          }));
          res.send(cartItem);
        }
        res.send(rest);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });


router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await User.destroy({
        where: {
          id: req.params.id
        }
      })
      if (result > 0){
        res.send("ok")
      } else {
        res.status(404).send("Not found")
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

export default router;