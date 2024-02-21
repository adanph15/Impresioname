import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from "../../components/header/Header";
import { Link } from 'react-router-dom';


export default function ShopMen() {

    const [articles, setArticles] = useState([]);
    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('https://localhost:8000/api/article/category/men');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const articlesList = () => {
        return (
            <div className="shop-container">
                <h2>Men</h2>
                <div className="shop-card-container">
                    {articles.map((article) => (
                    <Link to={`/glasses/${article.id}`} className='link'>
                        <div className="shop-card-item">
                            <img src={`https://localhost:8000/images/${article.filename}`} alt={article.name} className="shop-card-item-photo" />
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
            </div>
        </>
    );
}