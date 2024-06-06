import Header from '../../components/header/Header';
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
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/users/${userInfo.id}`, {
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
      window.location.href = "/sign-in";
    }
  }

  return (
    <>
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
    </>
  );
};

export default CartPage;