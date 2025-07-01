// src/router/router.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from '../pages/dashboard/Dashboard';
import ProductDetail from '../pages/productDetail/ProductDetail';

import Wishlist from '../pages/wishlist/Wishlist';
import MainLayout from '../components/layouts/MainLayout';

import Snack from '../pages/snacks/Snack';
import SnackDetail from '../pages/snacks/SnackDetail';

import Nuts from '../pages/nuts/Nuts';
import NutsDetail from '../pages/NutsDetail/NutsDetail';

import Dried from '../pages/dried/Dried';
import DriedDetail from '../pages/dried/DriedDetail';

import Recipes from '../pages/Recipes/Recipes';
import DetailPage from '../pages/Recipes/detailpage';
import Basket from '../pages/basket/Bakset';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/product/:id" element={<MainLayout><ProductDetail /></MainLayout>} />
      <Route path="/basket" element={<MainLayout><Basket /></MainLayout>} />
      <Route path="/wishlist" element={<MainLayout><Wishlist /></MainLayout>} />

      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

      <Route path="/category/recipes" element={<MainLayout><Recipes /></MainLayout>} />
      <Route path="/recipes/:id" element={<MainLayout><DetailPage /></MainLayout>} />

      <Route path="/category/snacks" element={<MainLayout><Snack /></MainLayout>} />
      <Route path="/snack/:id" element={<MainLayout><SnackDetail /></MainLayout>} />

      <Route path="/category/nuts" element={<MainLayout><Nuts /></MainLayout>} />
      <Route path="/nuts/:id" element={<MainLayout><NutsDetail /></MainLayout>} />

      {/* DÜZGÜN PATH BURADA: 👇👇👇 */}
      <Route path="/category/dried-fruits" element={<MainLayout><Dried /></MainLayout>} />
      <Route path="/dried/:id" element={<MainLayout><DriedDetail /></MainLayout>} />
    </Routes>
  );
};

export default Router;
