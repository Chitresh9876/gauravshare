import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default to 'user'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password, role });
      alert("Registration successful. Please log in.");
      navigate("/login"); // Redirect to login page on successful registration
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormLabel component="legend" style={{ marginTop: "1rem" }}>
          Select Role
        </FormLabel>
        <RadioGroup row value={role} onChange={(e) => setRole(e.target.value)}>
          <FormControlLabel value="user" control={<Radio />} label="User" />
          <FormControlLabel value="admin" control={<Radio />} label="Admin" />
        </RadioGroup>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "1rem" }}
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
