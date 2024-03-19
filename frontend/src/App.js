import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import './styles/Main.css';
import React from 'react';
import Home from "./pages/home/Home";
import SingIn from "./pages/user/SingIn";
import ShopMen from "./pages/shop/ShopMen";
import ShopWomen from "./pages/shop/ShopWomen";
import ShopKids from "./pages/shop/ShopKids";
import AdminArticle from "./pages/admin/Article.crud";
import GlassesPage from "./pages/shop/GlassPage";
import SingUp from "./pages/user/SingUp";
import UserPage from "./pages/user/UserPage";
import UserAddressesPage from "./pages/user/UserAddressesPage";
import UserAddressesUpdate from "./pages/user/UserAddressesUpdate";
import CartPage from "./pages/shop/CartPage";
import UserPurchasePage from "./pages/user/UserPurchasePage";
import AdminPurchaseList from "./pages/admin/Purchase.view";
import AdminPurchaseUpdate from "./pages/admin/Purchase.edit";
import Prueba from "./components/prueba/prueba";

function App() {

  document.title = "IMPRESIÓNAME";
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sing-in" element={<SingIn />} />
            <Route path="/sing-up" element={<SingUp />} />
            <Route path="/shop-kids" element={<ShopKids />} />
            <Route path="/shop-men" element={<ShopMen />} />
            <Route path="/shop-women" element={<ShopWomen />} />
            <Route path="/shop-kids" element={<ShopKids />} />
            <Route path="/glasses/:id" element={<GlassesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<UserPage />} />
            <Route path="/direction" element={<UserAddressesPage />} />
            <Route path="/direction-update/:id" element={<UserAddressesUpdate />} />
            <Route path="/purchases" element={<UserPurchasePage />} />
            <Route path="/admin-article" element={<AdminArticle />} />
            <Route path="/admin-purchases" element={<AdminPurchaseList />} />
            <Route path="/admin-purchases/update/:id" element={<AdminPurchaseUpdate />} />
            <Route path="/prueba" element={<Prueba />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
