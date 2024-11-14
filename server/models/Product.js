// backend/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  SKU: String,
  stockQuantity: { type: Number, default: 0 },
  lowStockThreshold: { type: Number, default: 5 },
  unitsSold: { type: Number, default: 0 }, // Track total units sold
  isDeleted: { type: Boolean, default: false },
  show: { type: Boolean, default: true },
});

productSchema.methods.isLowStock = function () {
  return this.stockQuantity < this.lowStockThreshold;
};

module.exports = mongoose.model("Product", productSchema);
