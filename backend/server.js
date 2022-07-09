import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((current) => current._id == req.params.id);
  res.json(product);
});

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${5000}`));
