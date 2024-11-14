// backend/server.js
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes"); // Import inventory routes
const reportRoutes = require("./routes/reportRoutes"); // Import report routes

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        Credential: true,
    })
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes); // Inventory management routes
app.use("/api/reports", reportRoutes); // Reporting and Insights routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// import dotenv from "dotenv";
// import DB_CONNECT from "./db/index.js";
// import { app } from "./app.js";

// dotenv.config({ path: "./env" });

// DB_CONNECT()
//   .then(() => {
//     app.on("error", (err) => {
//       console.error("error occured in server connection db connected", err);
//       throw  err;
//     });
//     const server = app.listen(process.env.PORT || 8080, () => {
//       console.log(`server listing at port ${process.env.PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("error occured while server connection ", error);
//     throw error;
//   });
