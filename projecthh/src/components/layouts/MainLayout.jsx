import React from 'react';
import Navbar from '../Navbar/Navbar';     
import Footer from '../Footer/Footer';
import TopBanner from '../TopBanner/TopBanner'; 

const MainLayout = ({ children }) => {
  return (
    <>
      <TopBanner />  
      <Navbar /> 
      <main>{children}</main>
      <Footer />   
    </>
  );
};

export default MainLayout;
