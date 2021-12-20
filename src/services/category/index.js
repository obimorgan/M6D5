import express from "express";
import { Product, User, Review, Category } from "../../db/models/index.js";
import { Op } from "sequelize";
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Category.findAll(req.query !== {} && {
        where: req.query
      });
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Category.create(req.body)
      res.send(data)
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router.route("/bulk").post(async (req, res, next) => {
  try {
    const data = await Category.bulkCreate([
      { name: "Multimedia" },
      { name: "Hardware" },
      { name: "Electronics" },
      { name: "Leisure" },
    ]);

    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
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
      console.log(req.body);
      const result = await Category.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.status(2001).send(updateTasks[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (result > 0) {
        res.send("ok");
      } else {
        res.status(404).send("not found");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default router;