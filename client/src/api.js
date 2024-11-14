import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set the JWT token in the headers
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (credentials) => api.post("/auth/login", credentials);
export const fetchProducts = () => api.get("/products");
export const createProduct = (productData) =>
  api.post("/products", productData);
export const softDeleteProduct = (id) => api.put(`/products/soft-delete/${id}`);
export const permanentDeleteProduct = (id) =>
  api.delete(`/products/permanent-delete/${id}`);
export const adjustStock = (id, quantityChange) =>
  api.put(`/inventory/adjust-stock/${id}`, { quantityChange });
export const fetchLowStockProducts = () => api.get("/inventory/low-stock");
export const fetchInventorySummary = () =>
  api.get("/inventory/inventory-summary");
export const placeOrder = (orderData) => api.post("/orders", orderData);

export default api;
