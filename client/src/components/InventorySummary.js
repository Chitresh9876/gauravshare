import React, { useEffect, useState } from "react";
import { fetchInventorySummary } from "../api";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const InventorySummary = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const loadInventory = async () => {
      const response = await fetchInventorySummary();
      setInventory(response.data.inventoryOverview);
    };
    loadInventory();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Inventory Summary</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Stock Quantity</TableCell>
            <TableCell>Low Stock Alert</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.SKU}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.SKU}</TableCell>
              <TableCell>{item.stockQuantity}</TableCell>
              <TableCell>{item.lowStockAlert ? "Low" : "Sufficient"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default InventorySummary;
