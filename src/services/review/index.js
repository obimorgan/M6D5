/** @format */

import express from "express";
// import { reviews } from "../../data/articles.js";
import { Review, Product } from "../../db/models/index.js";
import { Op, Sequelize } from "sequelize";
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const reviews = await Review.findAll({
        include: Review,
        where: {
          ...(req.query.search && {
            [Op.or]: [
              {
                title: { [Op.iLike]: `%${req.query.search}%` },
              },
              {
                content: { [Op.iLike]: `%${req.query.search}%` },
              },
              //Option 1
              {
                "$user.name$": {
                  [Op.iLike]: "%" + req.query.search + "%",
                },
              },
              //Option 2
              // {
              //   name: Sequelize.where(Sequelize.col(`"review.name"`), {
              //     [Op.iLike]: "%" + req.query.search + "%",
              //   }),
              // },
            ],
          }),

          ...(req.query.category && {
            category: {
              [Op.in]: req.query.category.split(","),
            },
          }),
        },
      });
      res.send(reviews);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const review = await Review.create(req.body);
      res.send(review);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router.route("/bulk").post(async (req, res, next) => {
  try {
    const data = await Review.bulkCreate(reviews);

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
      const result = await Review.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.status(201).send(updateTasks[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Review.destroy({
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
