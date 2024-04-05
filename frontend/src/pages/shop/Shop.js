import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from "../../components/header/Header";
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useSocketService from '../../services/SocketService';

export default function Shop() {
    useSocketService();

    const [articles, setArticles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchArticles(selectedCategory);
    }, [selectedCategory]);

    const fetchArticles = async (category) => {
        try {
            let response;
            if (category === "Men" || category === "Women" || category === "Kids") {
                response = await axios.get(`https://localhost/api/article/category/${category}`);
            } else {
                response = await axios.get('https://localhost/api/article');
            }
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const articlesList = () => {
        return (
            <div className="shop-container">
                <h2>{selectedCategory}</h2>
                <div>
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="All">All</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div className="shop-card-container">
                    {articles.map((article) => (
                    <Link to={`/glasses/${article.id}`} className='link' key={article.id}>
                        <div className="shop-card-item">
                            <img src={`https://localhost/images/${article.filename}`} alt={article.name} className="shop-card-item-photo" />
                            <strong>{article.name}</strong>
                            <p>{article.price}€</p>
                            <button className="shop-card-item-button">
                                Know me 
                            </button>
                        </div>
                    </Link>
                    ))}
                </div>
            </div>
        );
    };
    

    return (
        <>
            <div>
                <Header />
                {articlesList()}
                <ToastContainer />
            </div>
        </>
    );
}
