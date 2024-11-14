import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import InventorySummary from './components/InventorySummary';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'; // Import RegisterForm
import { setAuthToken } from './api';

import AuthProvider from './context/Authprovider';
import { useAuth } from './context/Authprovider';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = (token) => {
    setAuthToken(token);
    setIsAuthenticated(true);
    console.log(isAuthenticated);
  };

  

  return (
    
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/products" element={isAuthenticated ? <ProductList /> : <Navigate to="/login" />} />
        <Route path="/inventory" element={isAuthenticated ? <InventorySummary /> : <Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
    </Router>
  );
}

export default App;

