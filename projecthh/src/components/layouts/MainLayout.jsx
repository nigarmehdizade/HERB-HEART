import React from 'react';
import Navbar from '../Navbar/Navbar';     
import Footer from '../Footer/Footer';
import TopBanner from '../TopBanner/TopBanner'; 
import CartDrawer from '../cart/CartDrawer';
import { DrawerProvider } from '../../context/DrawerContext'; // ✅ bunu əlavə et!

const MainLayout = ({ children }) => {
  return (
    <DrawerProvider> {/* ✅ bütün layout üçün context burada olmalıdır */}
      <TopBanner />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CartDrawer /> {/* hər səhifədə işləyəcək */}
    </DrawerProvider>
  );
};

export default MainLayout;
