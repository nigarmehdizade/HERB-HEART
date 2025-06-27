// src/router/router.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from '../pages/dashboard/Dashboard';
import ProductDetail from '../pages/productDetail/ProductDetail';
import Basket from '../pages/basket/Bakset';
import Wishlist from '../pages/wishlist/Wishlist';
import MainLayout from '../components/layouts/MainLayout';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />

    
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/home"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/product/:id"
        element={
          <MainLayout>
            <ProductDetail />
          </MainLayout>
        }
      />
      <Route
        path="/basket"
        element={
          <MainLayout>
            <Basket />
          </MainLayout>
        }
      />
      <Route
        path="/wishlist"
        element={
          <MainLayout>
            <Wishlist />
          </MainLayout>
        }
      />

    
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default Router;
