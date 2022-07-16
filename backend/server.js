//Modules
import express from "express";
import dotenv from "dotenv";

//Database
import connectDB from "./config/db.js";

//Routes
import productRouter from "./routes/productRoutes.js";

//middlewares
import { NotFound, ErrorMiddleware } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use("/api/products", productRouter);

app.use(NotFound);
app.use(ErrorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${5000}`));
