import Header from '../../components/header/Header';
import CartService from '../../services/CartService';
import PurchaseService from '../../services/PurcharseService';
import AuthService from "../../services/AuthService";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';

const CartPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = AuthService.getToken();
      if (token) {
        try {
          const response = await axios.get(`https://localhost:8000/api/users/${userInfo.id}`, {
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

  // const handleLogout = () => {
  //   AuthService.logout();
  // };

  const handleUser = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      window.location.href = "/sing-in";
    }
  }

  const [cartItems, setCartItems] = useState([]);

  const image = (imageName) => {
    const newName = imageName.replace('https://localhost:8000/images/', '');
    console.log("nuevo nombre: ", newName);
    return newName;
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const cart = CartService.getCart(userInfo.id);
    console.log(CartService.getCart(userInfo.id))
    console.log("Cart", cart);
    setCartItems(cart);
  }, []);

  const removeFromCart = (itemId) => {
    // Filter out the item to be removed
    const updatedCart = cartItems.filter(item => item.id !== itemId);

    // Save the updated cart to local storage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    CartService.setCart(userInfo.id, updatedCart);

    // Update the state with the updated cart
    setCartItems(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handlePurchase = () => {
    PurchaseService.createPurchase(calculateTotalPrice());
  };

  const renderCartItems = () => {
    if (cartItems.length === 0) {
      return (
        <div className="cart-container">
          <p>Your Basket seems empty</p>
        </div>
      );
    } else {

      return (
        <div className='double-container'>
          <div className='cart-container'>
            {cartItems.map((article) => (
              <div className="cart-item" key={article.id}>
                <img src={`https://localhost:8000/images${image(article.filename)}`} className="shop-card-item-photo" alt={`${article.filename}`}/>
                <div className='cart-info'>
                  <strong>{article.name}</strong>
                  <p>{article.price}€</p>
                  <button className="cart-button" onClick={() => removeFromCart(article.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <div className='cart-container'>
            <div className="cart-resume">
              <strong>Resume</strong>
              <p>Total: {calculateTotalPrice()}€</p>
              <Link to={`/purchases`} className='link'>
                <button className="cart-button" onClick={handlePurchase}>Do Purchase</button>
              </Link>
            </div>
          </div>
        </div>
      );
    };
  }

  return (
    <>
      <div>
        <Header />
        <div className="no-cart-container">
          <h2>My Basket</h2>
          {user ? (
            <>
              {renderCartItems()}
            </>
          ) : (
            <>
              {handleUser(user)}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;