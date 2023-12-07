import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import CartService from '../../services/CartService';
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


  const renderCartItems = () => {
    if (cartItems.length === 0) {
      return (
        <div className="cart-container">
          <p>El carrito está vacío</p>
        </div>
      );
    } else {

      return (
        <div>
          {cartItems.map((article) => (
            <li key={article.id}>
              <img src={`http://localhost:8000/images/${article.filename}`} alt={article.name} />
              <div>
                <h3>{article.name}</h3>
                <p>{article.description}</p>
                <p>{article.price}€</p>
                <p>{article.stock ? 'En stock' : 'Agotado'}</p>
                <button onClick={() => removeFromCart(article.id)}>Remove from Cart</button>
              </div>
            </li>
          ))}
        </div>
      );
    };
  }

  return (
    <>
      <body>
        <Header />
        <div className="cart-container">
          <h1>Carrito de Compras</h1>
          {renderCartItems()}
        </div>
        <Footer />
      </body>
    </>
  );
};

export default CartPage;