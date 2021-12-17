import express from "express";
import { ShoppingCart, Products, Review, User } from "../../db/models/index.js";
import { Op, Sequelize } from "sequelize";
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const cart = await ShoppingCart.findAll()
      res.send(cart);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      console.log(req.body)
      const user = await ShoppingCart.create(req.body);
      res.send(user);
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