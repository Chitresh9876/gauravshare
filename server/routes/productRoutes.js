// backend/routes/productRoutes.js
const express = require("express");
const Product = require("../models/Product");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();

// Create a new product (Admin only)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // validation is required for the feilds 
    const { name, description, price, SKU, stockQuantity } = req.body;
    const product = new Product({
      name,
      description,
      price,
      SKU,
      stockQuantity,
    });
    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all products (Public)
//add pagination
router.get("/", authMiddleware, async (_, res) => {
  try {
    const products = await Product.find({ isDeleted: false });
    res.json(products); // pagination required 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single product by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.isDeleted)
      return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update product details (Admin only)
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // can update many but should update price and stock quantity depending on the given values update only those without altering the whole 
    const { name, description, price, stockQuantity } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stockQuantity },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a product (Soft delete)  
// do change this with permanet delete thing and add a soft delete functionality
// Soft Delete Product (Admin only)
router.put('/soft-delete/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

      product.isDeleted = true;
      product.show = false;
        await product.save();

        res.json({ message: 'Product soft-deleted successfully', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Permanent Delete Product (Admin only)
router.delete('/permanent-delete/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json({ message: 'Product permanently deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
