import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../../components/header/Header";
import { ToastContainer } from 'react-toastify';
import useSocketService from '../../services/SocketService';

    


export default function ShopWomen() {
    useSocketService();
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        fetchArticles();
    }, []); 

    const fetchArticles = async () => {
        try {
            const response = await axios.get('https://localhost/api/article/category/women');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };
    const articlesList = () => {
        return (
            <div className="shop-container">
                <h2>Women</h2>
                <div className="shop-card-container">
                    {articles.map((article) => (
                    <Link to={`/glasses/${article.id}`} className='link' key={article.id}>
                        <div className="shop-card-item">
                            <img src={`https://localhost/images/${article.filename}`} alt={article.name} className="shop-card-item-photo" />
                            <strong>{article.name}</strong>
                            <p>{article.price}€</p>
                            <button className="shop-card-item-button"> Know More </button>
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