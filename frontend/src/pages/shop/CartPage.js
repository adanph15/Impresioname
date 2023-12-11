import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import CartService from '../../services/CartService';
import PurchaseService from '../../services/PurcharseService';
import React, { useState, useEffect } from 'react';


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

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
          <p>El carrito está vacío</p>
        </div>
      );
    } else {

      return (
        <div className='double-container'>
          <div className='cart-container'>
            {cartItems.map((article) => (
              <div className="cart-item" key={article.id}>
                <img src={`http://localhost:8000/images/${article.filename}`} alt={article.name} />
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
              <button className="cart-button" onClick={handlePurchase}>Do Purchase</button>
            </div>
          </div>
        </div>
      );
    };
  }

  return (
    <>
      <body>
        <Header />
        <div className="cart-container">
          <h2>My Carry</h2>
          {renderCartItems()}
        </div>
        <Footer />
      </body>
    </>
  );
};

export default CartPage;