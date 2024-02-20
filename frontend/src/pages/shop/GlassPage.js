import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from "../../components/header/Header";
import { useParams } from 'react-router-dom';
import CartService from "../../services/CartService";
import { BrowserRouter as Link } from 'react-router-dom';

export default function GlassesPage() {
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`https://localhost:8000/api/article/${id}`);
        setArticle(response.data);
        const cart = CartService.getCart(userInfo.id);
        setCartItems(cart);
      } catch (error) {
        console.error('Error fetching article details:', error);
      }
    };
    fetchArticle();
  }, [id]);

  const addToCart = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const newItem = {
      id: article.id,
      name: article.name,
      price: article.price,
      filename: `https://localhost:8000/images/${article.filename}`,
      stock: article.stock,
    };

    const currentCart = CartService.getCart(userInfo.id);

    // Append the new item to the current cart
    const updatedCart = [...currentCart, newItem];

    // Save the updated cart to local storage
    CartService.setCart(userInfo.id, updatedCart);

    // Update the state with the updated cart
    setCartItems(updatedCart);
    console.log(updatedCart)
  };


  if (!article) {
    return <div>glasses not found</div>;
  }

  return (
    <>
      <div>
        <Header />
        <div className="glasses">
          <div className='glasses-container'>
            <div className='glasses-item'>
              <div className='glasses-item-info'>
                <img src={`https://localhost:8000/images/${article.filename}`} className="glasses-item-img" alt='articleImagesGlasses'/>
                <div className='glasses-info'>
                  <h2>{article.price}€</h2>
                  <p>{article.name} - {article.description}</p>
                  <p>{article.stock ? 'in stock' : 'out of stock'}</p>
                </div>
                <Link to={`/shop-men`} className='link'>
                  <button className="button-glasses" id='buttonBasket' onClick={addToCart}>add to basket</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}