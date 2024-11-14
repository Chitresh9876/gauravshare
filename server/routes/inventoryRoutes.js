// backend/routes/inventoryRoutes.js
const express = require("express");
const Product = require("../models/Product");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();

// Adjust stock for a product (Admin only)
router.put(
  "/adjust-stock/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { quantityChange } = req.body;
      const product = await Product.findById(req.params.id);

      if (!product || product.isDeleted)
        return res.status(404).json({ message: "Product not found" });

      product.stockQuantity += quantityChange;

      // Save the updated product
      await product.save();
      const lowStockAlert = product.isLowStock()
        ? "Warning: Stock is low!"
        : null;

      res.json({
        message: "Stock adjusted successfully",
        product,
        lowStockAlert,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Get list of low-stock products (Admin only)
router.get("/low-stock", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const lowStockProducts = await Product.find({
      stockQuantity: { $lt: 5 }, // You can also use `product.lowStockThreshold` dynamically
      isDeleted: false,
    });

    res.json({
      message: "Low-stock products retrieved successfully",
      lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Inventory overview (Admin only)
router.get(
  "/inventory-summary",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const products = await Product.find({ isDeleted: false });
      const inventoryOverview = products.map((product) => ({
        name: product.name,
        SKU: product.SKU,
        stockQuantity: product.stockQuantity,
        lowStockAlert: product.isLowStock(),
      }));

      res.json({
        message: "Inventory summary retrieved successfully",
        inventoryOverview,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
