import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Scroll.css'; // Make sure to import your styles

const Scroll = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles();
    }, []); 

    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/article/men');
            // Limita los artículos a diez elementos
            setArticles(response.data.slice(0, 10));
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
                        <div className="shop-card-item" key={article.id}>
                            <img src={`http://localhost:8000/images/${article.filename}`} className="shop-card-item-photo" alt={article.name} />
                            <strong>{article.name}</strong>
                            <p>Price: {article.price}€</p>
                        </div>
                    ))}
                </div>
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
                <img src="https://i.pravatar.cc/150?img=1" alt="" />
                <img src="https://i.pravatar.cc/150?img=2" alt="" />
                <img src="https://i.pravatar.cc/150?img=3" alt="" />
                <img src="https://i.pravatar.cc/150?img=4" alt="" />
                <img src="https://i.pravatar.cc/150?img=5" alt="" />
                <img src="https://i.pravatar.cc/150?img=6" alt="" />
            </div>
        </div>
    );
};

export default Scroll;


