//Modules
import express, {urlencoded} from "express";
import dotenv from "dotenv";

//Database
import connectDB from "./config/db.js";

//Routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//middlewares
import {NotFound, ErrorMiddleware} from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

import protect from "./middlewares/authMiddleware.js";
app.get("/protected", protect, (req, res) => {
  res.send("successfully in");
});

app.use(NotFound);
app.use(ErrorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${5000}`));
