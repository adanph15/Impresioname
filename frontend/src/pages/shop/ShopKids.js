import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function ShopKids() {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/article/category/kids');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };
    const articlesList = () => {
        return (
            <div className="shop-container">
                <h2>Kids</h2>
                <div className="shop-card-container">
                    {articles.map((article) => (
                    <Link to={`/glasses/${article.id}`} className='link'>
                        <div className="shop-card-item">
                            <img src={`http://localhost:8000/images/${article.filename}`} className="shop-card-item-photo" />
                            <strong>{article.name}</strong>
                            <p>{article.price}€</p>
                            <button className="shop-card-item-button">
                                Try me 
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
            <body>
                <Header />
                {articlesList()}
                <Footer />
            </body>
        </>
    );
}