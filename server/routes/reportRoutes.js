// backend/routes/reportRoutes.js
const express = require("express");
const Product = require("../models/Product");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();

// Top Selling Products (Admin only)
router.get(
  "/top-selling",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      // Find products sorted by units sold in descending order
      const topSellingProducts = await Product.find({ isDeleted: false })
        .sort({ unitsSold: -1 }) // Sort by unitsSold in descending order
        .limit(10); // Limit to top 10 selling products

      res.json({
        message: "Top selling products retrieved successfully",
        topSellingProducts,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Low Stock Products (Admin only)
router.get("/low-stock", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const lowStockProducts = await Product.find({
      stockQuantity: { $lt: 5 }, // You can adjust this threshold as needed
      isDeleted: false,
    });

    res.json({
      message: "Low stock products retrieved successfully",
      lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
