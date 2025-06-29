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

import Recipes from '../pages/Recipes/Recipes';
import DetailPage from '../pages/Recipes/detailpage';

const Router = () => {
  return (
    <Routes>
      {/* Redirect to /register */}
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
  path="/category/recipes"
  element={
    <MainLayout>
      <Recipes />
    </MainLayout>
  }
/>

<Route
  path="/recipes/:id"
  element={
    <MainLayout>
      <DetailPage />
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
