import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import CartDrawer from '../cart/CartDrawer';
import { DrawerProvider } from '../../context/DrawerContext';
import TopBanner from '../TopBanner/TopBanner';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <DrawerProvider>
      <TopBanner />
      <Navbar />
      <main>
        <Outlet /> 
      </main>
      <Footer />
      <CartDrawer />
    </DrawerProvider>
  );
};

export default MainLayout;
