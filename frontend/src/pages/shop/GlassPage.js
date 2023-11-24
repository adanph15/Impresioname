import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Shop.css";
import { useParams } from 'react-router-dom';


export default function GlassesPage() {
    const [article, setArticle] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/article/${id}`);
                setArticle(response.data);
                setIsButtonDisabled(!response.data.stock);
            } catch (error) {
                console.error('Error fetching article details:', error);
            }
        };
        fetchArticle();
    }, [id]);

    if (!article) {
        return <div>glasses not found</div>;
    }

    return (
        <>
            <body>
                <Header />
                <div className='glasses-container'>
                    <div className='glasses-item'>
                        <div className='glasses-item-info'>
                            <img src={`http://localhost:8000/images/${article.filename}`} className="glasses-item-img" />
                            <div className='c'>
                                <h2>{article.price}€</h2>
                                <p>{article.name} - {article.description}</p>
                                <p>{article.stock ? 'in stock' : 'out of stock'}</p>
                            </div>
                            <button id='buttonBasket' disabled={isButtonDisabled} style={{ backgroundColor: isButtonDisabled ? 'gray' : 'white' }}>add to basket</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </body>
        </>
    );

}







