import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Shop.css";

export default function ShopMen() {

    const [articles, setArticles] = useState([]);
    useEffect(() => {
        fetchArticles();
    }, []); // Se ejecutará cada vez que la categoría seleccionada cambie

    // Modifica la función fetchArticles en tu componente React
    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/article/men');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };
    const articlesList = () => {
        return (
            <div className="shop-container">
                <h2>men</h2>
                <div className="shop-card-container">
                    {articles.map((article) => (
                        <div className="shop-card-item">
                            <img src={`http://localhost:8000/images/${article.filename}`} className="shop-card-item-photo" />
                            <strong>{article.name}</strong>
                            <p>{article.description}</p>
                            <p>Price: {article.price}€</p>
                            <p>Category: {article.category}</p>
                            <p>{article.stock ? 'In Stock' : 'Out of Stock'}</p>
                            <button className="shop-card-item-button">
                                try me 
                            </button>
                        </div>
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