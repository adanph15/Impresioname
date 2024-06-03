import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from 'react';
import Home from "./pages/home/Home";

import AdminArticle from "./pages/admin/Article.crud";
import GlassesPage from "./pages/shop/GlassPage";
import UserPage from "./pages/user/UserPage";
import UserAddressesPage from "./pages/user/UserAddressesPage";
import UserAddressesUpdate from "./pages/user/UserAddressesUpdate";
import CartPage from "./pages/shop/CartPage";
import UserPurchasePage from "./pages/user/UserPurchasePage";
import AdminPurchaseList from "./pages/admin/Purchase.view";
import AdminPurchaseUpdate from "./pages/admin/Purchase.edit";
import CustomGlasses from "./pages/prueba/CustomGlasses";
import PreviewGlasses from "./pages/prueba/PreviewGlasses";
import Shop from "./pages/shop/Shop";
import Login from "./pages/user/Login";

// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';  
// import 'primereact/resources/primereact.css';
// import './theme.css';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';

import AuthService from "./services/AuthService";



function NotFound() {
  const goToHome = () => {
    window.location.href = '/home';
  }

  return (
    <>
      <div className="flex  items-center h-[100vh] justify-center">
        <div className="flex flex-col items-center gap-10">
        <h1 className="text-9xl font-extrabold text-center">404</h1>
        <h2 className="text-6xl font-semibold text-center">Page not found!!!</h2>
        <button className="mt-8 button-hover-r duration-[0.4s] w-64 h-16 bg-black text-white font-bold rounded-md cursor-pointer text-xl hover:border hover:border-2 hover:border-black" onClick={() => goToHome()}>Return Home</button>
        </div>
      </div>
    </>

  );
}

function App() {
    // AuthService.verifyRole();

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sign-in" element={<Login />} />

            <Route path="/preview/:id" element={<PreviewGlasses />} />
            <Route path="/custom" element={<CustomGlasses />} />

            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/glasses/:id" element={<GlassesPage />} />

            <Route path="/cart" element={<CartPage />} />

            <Route path="/profile" element={<UserPage />} />
            <Route path="/addresses" element={<UserAddressesPage />} />
            <Route path="/direction-update/:id" element={<UserAddressesUpdate />} />
            <Route path="/purchases" element={<UserPurchasePage />} />

            <Route path="/admin" element={<AdminArticle />} />
            <Route path="/admin-purchases" element={<AdminPurchaseList />} />
            <Route path="/admin-purchases/update/:id" element={<AdminPurchaseUpdate />} />
            

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
