// backend/routes/orderRoutes.js
// 3rd section 
const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// Place an order
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { products } = req.body;
    let totalCost = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product || product.stockQuantity < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${product.name}` });
      }
      totalCost += product.price * item.quantity;
      product.stockQuantity -= item.quantity;
      product.unitsSold += item.quantity; // Update units sold
      await product.save();
    }

    const order = new Order({ products, totalCost });
    await order.save();
    res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order summary
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.productId",
      "name price"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status (Admin only)
router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();
    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
