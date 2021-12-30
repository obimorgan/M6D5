/** @format */

import express from "express";
import {
  Product,
  productCategory,
  User,
  Review,
  Category,
} from "../../db/models/index.js";
// import { Op, Sequelize } from "sequelize";
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findAll({
        include: [
          {
            model: Category,
            through: { attributes: [] },
            where: {
              ...(req.query.category && {
                name: { [Op.in]: req.category.name.split(",") },
              }),
            },
          },
          { model: Review, include: User },
          User,
        ],
        where: {
          ...(req.query.search && {
            [Op.or]: [
              { product_name: { [Op.ilike]: `%${req.query.search}%` } },
              { content: { [Op.ilike]: `%${req.query.search}%` } },
              { "$user.name$": { [Op.ilike]: "%" + req.query.search + "%" } },
            ],
          }),
        },
      });
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { categoryId, ...rest } = req.body;
      console.log(rest);
      const product = await Product.create(req.body);
      if (product) {
        console.log(product.id);
        const dataToInsert = categoryId.map((id) => ({
          categoryId: id,
          productId: product.id,
        }));
        // inserts modified array to Productategory
        const data = await productCategory.bulkCreate(dataToInsert);
        res.send({ product, productCategory: data });
      }
      res.send(rest);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router.route("/bulk").post(async (req, res, next) => {
  try {
    const { categoryId, ...rest } = req.body;
    const product = await Product.bulkCreate(req.body);
    if (product) {
      const dataToInsert = categoryId.map((id) => ({
        categoryId: id,
        productId: product.id,
      }));
      const data = await productCategory.bulkCreate(dataToInsert);
      res.send({ product, productCategory: data });
    }
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
      if (req.params.id) {
        const data = await Product.findOne({
          where: { id: req.params.id },
        });
        res.send(data);
      }
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
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

export default router;
