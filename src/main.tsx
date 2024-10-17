import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SWRConfig } from 'swr';
import axios from 'axios';

import HomePage from './pages/home/home.tsx';
import ProductPage from './pages/product/product.tsx';
import AppAddProduct from './pages/addproduct/addproduct.tsx';
import MyProfile from './pages/myprofile/myprofile.tsx';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SWRConfig
            value={{
                fetcher,
                revalidateOnFocus: false,
            }}
        >
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/addproduct" element={<AppAddProduct />} />
                    <Route path="/myprofile" element={<MyProfile />} />
                </Routes>
            </Router>
        </SWRConfig>
    </StrictMode>
);
