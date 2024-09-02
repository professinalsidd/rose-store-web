import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import { getFullPath } from "../helpers/common.js";
import Product from "../models/productModel.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || "";
    const sellerFilter = seller ? { seller } : {};
    const products = await Product.find({ ...sellerFilter });
    let filterProducts = [];
    products.map((p) => {
      p.image = getFullPath(req) + p.image;
      filterProducts.push(p);
    });
    res.status(200).json(filterProducts);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createProducts = await Product.insertMany(data.products);
    res.send({ createProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.image = getFullPath(req) + product.image;
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "sample name " + Date.now(),
      seller: req.user._id,
      image: "/images/p1.jpg",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: "Product Deleted", product: deleteProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: "Review Created",
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
