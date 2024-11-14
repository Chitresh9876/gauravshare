import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  softDeleteProduct,
  permanentDeleteProduct,
} from "../api";
import {
  Container,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const response = await fetchProducts();
    setProducts(response.data);
  };

  const handleSoftDelete = async (id) => {
    await softDeleteProduct(id);
    loadProducts();
  };

  const handlePermanentDelete = async (id) => {
    await permanentDeleteProduct(id);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Product List</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock Quantity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stockQuantity}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleSoftDelete(product._id)}
                  color="secondary"
                >
                  Soft Delete
                </Button>
                <Button
                  onClick={() => handlePermanentDelete(product._id)}
                  color="error"
                >
                  Delete Permanently
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ProductList;
