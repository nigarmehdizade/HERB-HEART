import React from 'react'
import Navbar from '../../components/navbar/Navbar';

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);


export default Layout