import express from "express";
import products from "./data/products.js";

const app = express();

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((current) => current._id == req.params.id);
  res.json(product);
});

app.listen(5000, console.log("server running on port 5000"));
