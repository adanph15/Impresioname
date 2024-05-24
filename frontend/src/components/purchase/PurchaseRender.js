import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import PurchaseService from '../../services/PurcharseService';

const PurchaseRender = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const id = userInfo.id;
    const [purchases, setPurchases] = useState([]);
    const [articles, setArticles] = useState({});

    const fetchPurchases = async () => {
        try {
            const response = await axios.get(`https://localhost/api/purchase/user/${id}`);
            setPurchases(response.data);
        } catch (error) {
            console.error('Error fetching Purchases:', error);
        }
    };

    const fetchData = async (purchase) => {
        try {
            const articlesData = await PurchaseService.getArticlesByPurchaseId(purchase.id);
            setArticles((prevArticles) => ({
                ...prevArticles,
                [purchase.id]: articlesData,
            }));
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    useEffect(() => {
        fetchPurchases();
    }, []);

    useEffect(() => {
        purchases.forEach(purchase => {
            fetchData(purchase);
        });
    }, [purchases]);

    const viewArticles = (purchase) => {
        const purchaseArticles = articles[purchase.id];

        if (!purchaseArticles) {
            return null; // or return a loading indicator
        }

        return (
            <div className="p-3">   
                {purchaseArticles.map((article) => (
                    <div className="border border-gray-200 rounded-lg p-4" key={article.id}>
                        <div className="mb-2 flex-row flex items-center gap-6">
                            <img src={`https://localhost/images/${article.filename}`} alt={article.name} width="80px" className="shadow-4" />
                            <p className="font-bold text-base">{article.name}</p>
                            <p className='text-base'>{article.price} €</p>
                            <p className='text-base'>{article.category.charAt(0).toUpperCase() + article.category.slice(1)}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className='grid gap-4'>
                {purchases.map((purchase) => (
                    <div className="border border-gray-200 rounded-lg p-4" key={purchase.id}>
                        <div className="mb-2">
                            <p className="font-bold">Street:</p>
                            <p>Purchase: {format(new Date(purchase.date), 'yyyy-MM-dd')}</p>
                            <p>Total: {purchase.total}€</p>
                            <p>Status: {purchase.status}</p>
                        </div>
                        {viewArticles(purchase)}
                        <div className="flex">
                            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline" onClick={() => handleUpdate(address)}>Update</button> */}
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Cancel Purchase</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PurchaseRender;







