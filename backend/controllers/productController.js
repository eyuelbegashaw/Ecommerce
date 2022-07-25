import Product from "../models/productModel.js";
import mongoose from "mongoose";

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    if (products) res.json(products);
    else res.status(404).json({message: " No product found "});
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({message: "Product Not Found"});
    }

    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({message: " Product Not Found "});
  } catch (error) {
    next(error);
  }
};

export {getProduct, getProducts};
