import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from '../pages/dashboard/Dashboard';
import ProductDetail from '../pages/productDetail/ProductDetail';
import Wishlist from '../pages/wishlist/Wishlist';
import Recipes from '../pages/Recipes/Recipes';
import DetailPage from '../pages/Recipes/detailpage';
import Snack from '../pages/snacks/Snack';
import SnackDetail from '../pages/snacks/SnackDetail';
import Nuts from '../pages/nuts/Nuts';
import NutsDetail from '../pages/NutsDetail/NutsDetail';
import Dried from '../pages/dried/Dried';
import DriedDetail from '../pages/dried/DriedDetail';
import Seeds from '../pages/seeds/Seeds';
import SeedsDetail from '../pages/seeds/SeedsDetail';

import Checkout from '../pages/checkout/Checkout';

import i18n from '../i18n';
import MainLayout from '../components/layouts/MainLayout';
import Matcha from '../pages/matcha/Matcha';
import MatchaDetail from '../pages/matcha/MatchaDetail';

const Router = () => {
  return (
    <Routes>
      {/* Auth pages (without layout) */}
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Main layout wrapper for all visible pages */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home key={i18n.language} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        <Route path="/category/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<DetailPage />} />

        <Route path="/category/snacks" element={<Snack />} />
        <Route path="/snack/:id" element={<SnackDetail />} />

        <Route path="/category/nuts" element={<Nuts />} />
        <Route path="/nuts/:id" element={<NutsDetail />} />

        <Route path="/category/dried-fruits" element={<Dried />} />
        <Route path="/dried-detail/:id" element={<DriedDetail />} />

        <Route path="/category/seeds" element={<Seeds />} />
        <Route path="/seeds/:id" element={<SeedsDetail />} />

        <Route path="/category/matcha" element={<Matcha />} />
        <Route path="/matcha/:id" element={<MatchaDetail />} />

        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default Router;
