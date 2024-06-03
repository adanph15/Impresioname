import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticleService from '../services/ArticleService';

const NewProducs = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const fetchedArticles = await ArticleService.getAllArticles();
                const randomArticles = getRandomArticles(fetchedArticles, 3);
                setArticles(randomArticles);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchArticles();
    }, []);

    const getRandomArticles = (articles, n, excludedId) => {
        const filteredArticles = articles.filter(article => article.id);
        const shuffled = filteredArticles.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    };

    const getCategory = (category) => {
        if (category === "men") {
            return ("Men");
        } else if (category === "women") {
            return ("Women");
        } else if (category === "kids") {
            return ("Kids");
        } else {
            return ("M");
        }
    };

    const articlesList = () => {
        return (
            <div className='flex flex-col items-center gap-6 '>
                <h2 className='text-2xl font-semibold'>New products just arrived</h2>
                <div className="flex flex-row gap-10 justify-around">
                    {articles.map((article) => (
                        <Link to={`/glasses/${article.id}`} className='link' key={article.id}>
                            <div className=" w-48 pb-8 text-black flex flex-col flex-nowrap justify-center items-center  rounded-lg  hover:scale-105">
                                <img src={`https://localhost/images/${article.filename}`} alt={article.name} className="mt-0 mb-1 rounded-lg border-primary" />
                                <div className='h-full w-full pb-4 flex flex-col items-center justify-center  rounded-b-lg'>
                                    <strong className='mt-4'>{article.name}</strong>
                                    <p>{getCategory(article.category)} - {article.price}€</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        );
    };

    return (
        <div className="w-full mt-20 bg-gray-200 p-4 pb-10 rounded-lg shadow-inner text-terciary info-home flex flex-row justify-between" data-direction="right" data-speed="slow">
            <div className="  " style={{ height: '304.5px' }}>
                <img src="/s.jpg" className="h-80 rounded-lg" alt='model-iamge-right' />
            </div>
            <div className="  h-80">
                {articlesList()}
            </div>
            <div className="  " style={{ height: '304.5px' }}>
                <img src="/f.jpeg" className="h-80  rounded-lg" alt='model-iamge-right' />
            </div>
        </div>
    );
};

export default NewProducs;