import { createBrowserRouter } from 'react-router';
import Home from '../pages/home/Home';
import Basket from '../pages/basket/Basket';

import Layout from '../pages/layout/Layout';
import Auth from '../pages/auth/Auth';
import OAuthSuccess from '../pages/oauth/OAuthSuccess';


export const router = createBrowserRouter([
    { path: '/', element: <Layout><Home /></Layout> },
    { path: '/basket', element: <Layout><Basket /></Layout> },
        { path: '/login', element: <Layout><Auth /></Layout> },
         { path: '/oauthsuccess ', element: <Layout><OAuthSuccess/></Layout> },
 
]);