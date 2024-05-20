import Header from '../../components/header/Header';
// import CartService from '../../services/CartService';
// import PurchaseService from '../../services/PurcharseService';
import AuthService from "../../services/AuthService";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useSocketService from '../../services/SocketService';
import { ToastContainer } from 'react-toastify';
import PurchaseStepper from '../../components/purchase/PurchaseStepper';


const CartPage = () => {
  const [user, setUser] = useState(null);
  useSocketService();
  useEffect(() => {
    const fetchData = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = AuthService.getToken();
      if (token) {
        try {
          const response = await axios.get(`https://localhost/api/users/${userInfo.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchData();
  }, []);
  
  const handleUser = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      window.location.href = "/sing-in";
    }
  }

  // const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  //   const cart = CartService.getCart(userInfo.id);
  //   console.log(CartService.getCart(userInfo.id))
  //   console.log("Cart", cart);
  //   setCartItems(cart);
  // }, []);

  // const removeFromCart = (itemId) => {
  //   // Filter out the item to be removed
  //   const updatedCart = cartItems.filter(item => item.id !== itemId);

  //   // Save the updated cart to local storage
  //   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  //   CartService.setCart(userInfo.id, updatedCart);

  //   // Update the state with the updated cart
  //   setCartItems(updatedCart);
  // };

  // const calculateTotalPrice = () => {
  //   return cartItems.reduce((total, item) => total + item.price, 0);
  // };

  // const handlePurchase = () => {
  //   PurchaseService.createPurchase(calculateTotalPrice());
  // };

  return (
    <>
      <div>
        <Header />
        

        <div className="no-cart-container">
          <h2>My Basket</h2>
          {user ? (
            <>
              <PurchaseStepper />
            </>
          ) : (
            <>
              {handleUser(user)}
            </>
          )}
          
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default CartPage;