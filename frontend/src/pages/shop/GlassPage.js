import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from "../../components/header/Header";
import { useParams } from 'react-router-dom';
import CartService from "../../services/CartService";
import { Link } from 'react-router-dom';
import useSocketService from '../../services/SocketService';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function GlassesPage() {
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  console.log("ID:", id);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [cartItems, setCartItems] = useState([]);
  useSocketService();
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`https://localhost/api/article/${id}`);
        setArticle(response.data);
        if (userInfo) {
          const cart = CartService.getCart(userInfo.id);
          setCartItems(cart);
        }
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
      filename: `https://localhost/images/${article.filename}`,
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
    goToShop();
  }

  const goToShop = () => {
    navigate(`/shop/All`);
  };

  const goToTryGlasses = (id) => {
    navigate(`/preview/${id}`);
  };

//   .glasses {
//     height: 100vh;
// }

// .glasses-container {
//     margin-top: 10vh;
//     display: flex;
//     justify-content: center;
// }

// .glasses-item {
//     width: 85%;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-evenly;
//     align-items: center;    
//     background-color: #333333;
//     color: white;
//     border-radius: 6px;
// }

// .glasses-item-info {
//     margin-top: 3vh;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     flex-direction: column;
//     gap: 10px 60px;
//     margin-bottom: 5vh;
// }

// .glasses-info {
//     width: 100%;
//     margin-top: -2vh;
// }

// .button-glasses {
//     background-color: white;
//     color: black;
// }

// .button-glasses:hover {
//     background-color: black;
//     color: white;
// }

// .glasses-item-img {
//     border-radius: 6px;
//     width: 30vw;
// }


  return (
    <>
      <div>
        <Header />
        <div className="glasses">
          <div className='glasses-container'>
            <div className='glasses-item'>
              <div className='glasses-item-info'>
                <img src={`https://localhost/images/${article.filename}`} className="glasses-item-img" alt='articleImagesGlasses'/>
                <div className='glasses-info'>
                  <h2>{article.price}€</h2>
                  <p>{article.name} - {article.description}</p>
                  <p>{article.stock ? 'in stock' : 'out of stock'}</p>
                </div>
                <Link to={`/shop`} className='link'>
                  <button className="button-glasses" id='buttonBasket' onClick={addToCart}>Add to Basket</button>
                </Link>
                <ToastContainer />
                  <button onClick={() => goToTryGlasses(article.id)} className="button-glasses" id='buttonBasket'>Try Me</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}