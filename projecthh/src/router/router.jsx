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
import Snack from '../pages/snacks/Snack';
import Recipes from '../pages/Recipes/Recipes';
import Nuts from '../pages/nuts/Nuts';
import NutsDetail from '../pages/NutsDetail/NutsDetail';

import DetailPage from '../pages/Recipes/detailpage';
import SnackDetail from '../pages/snacks/SnackDetail';
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
        path="/category/recipes"
        element={
          <MainLayout>
            <Recipes />
          </MainLayout>
        }
      />
      <Route
        path="/category/snacks"
        element={
          <MainLayout>
            <Snack />
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
  path="/snack/:id"
  element={
    <MainLayout>
      <SnackDetail />
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
      <Route
  path="/category/nuts"
  element={
    <MainLayout>
      <Nuts />
    </MainLayout>
  }
/>

<Route
  path="/nuts/:id"
  element={
    <MainLayout>
      <NutsDetail />
    </MainLayout>
  }
/>
<Route
  path="/category/nuts"
  element={
    <MainLayout>
      <Nuts />
    </MainLayout>
  }
/>

<Route
  path="/nuts/:id"
  element={
    <MainLayout>
      <NutsDetail />
    </MainLayout>
  }
/>

    </Routes>
  );
};

export default Router;
