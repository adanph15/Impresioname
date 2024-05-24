import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from 'react';
import Home from "./pages/home/Home";
import SignIn from "./pages/user/SignIn";

import AdminArticle from "./pages/admin/Article.crud";
import GlassesPage from "./pages/shop/GlassPage";
import SignUp from "./pages/user/SignUp";
import UserPage from "./pages/user/UserPage";
import UserAddressesPage from "./pages/user/UserAddressesPage";
import UserAddressesUpdate from "./pages/user/UserAddressesUpdate";
import CartPage from "./pages/shop/CartPage";
import UserPurchasePage from "./pages/user/UserPurchasePage";
import AdminPurchaseList from "./pages/admin/Purchase.view";
import AdminPurchaseUpdate from "./pages/admin/Purchase.edit";
// import CustomGlasses from "./pages/prueba/CustomGlasses";
// import PreviewGlasses from "./pages/prueba/PreviewGlasses";
import Shop from "./pages/shop/Shop";

// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';  
// import 'primereact/resources/primereact.css';
// import './theme.css';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';



function NotFound() {
  return (
    <>
      <div className="header-container">
        <h1>404</h1>
        <h2>Page not found!!!</h2>
      </div>
    </>

  );
}

function App() {

  document.title = "IMPRESIÓNAME";
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

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
          {/* <Route path="/preview/:id" element={<PreviewGlasses />} />
          <Route path="/custom" element={<CustomGlasses />} /> */}
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
