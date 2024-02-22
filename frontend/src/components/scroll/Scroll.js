import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Scroll.css';

const Scroll = () => {

    const [articles, setArticles] = useState([]);
    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('https://localhost/api/article');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };
    const articlesList = () => {
        return (
            <div className="scroll-card">
                {articles.map((article) => (
                    <Link to={`/glasses/${article.id}`} className='link'>
                        <div className="scroll-card-item">
                            <img src={`https://localhost/images/${article.filename}`} alt={article.name} className="scroll-card-item-photo" />
                            <strong className='scroll-card-item-title'>{article.name}</strong>
                            <p className="scroll-card-item-text">{article.price}€</p>
                            <p className="scroll-card-item-text">For {article.category}</p>
                        </div>
                    </Link>
                ))}
            </div>
        );
    };

    useEffect(() => {
        const scrollers = document.querySelectorAll(".scroller");

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            addAnimation();
        }

        function addAnimation() {
            scrollers.forEach((scroller) => {
                scroller.setAttribute("data-animated", true);

                const scrollerInner = scroller.querySelector(".scroller__inner");
                const scrollerContent = Array.from(scrollerInner.children);

                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        }
    }, []);

    return (
        <div className="scroller" data-direction="right" data-speed="slow">
            <div className="scroller__inner">
                {articlesList()}
            </div>
        </div>
    );
};

export default Scroll;


