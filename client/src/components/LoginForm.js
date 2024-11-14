// src/components/LoginForm.js
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Link } from "@mui/material";
import { loginUser, setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authprovider";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await loginUser({ email, password });
      // const { token } = response.data;
      // setAuthToken(token);
      // onLoginSuccess(token);
      const data = { email: email, password: password };
      if (email !== "" && password !== "") {
        auth.loginAction(data);
        return;
      }
      alert("invalid input")
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      <Typography variant="body2" align="center" style={{ marginTop: "1rem" }}>
        Don’t have an account?{" "}
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/register")}
        >
          Register
        </Link>
      </Typography>
    </Container>
  );
};

export default LoginForm;
