import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import PurchaseService from '../../services/PurcharseService';
import { XCircleIcon } from "@heroicons/react/24/solid";

const UserPurchasePage = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const id = userInfo?.id;
    const [purchases, setPurchases] = useState([]);
    const [expandedRows, setExpandedRows] = useState({});
    const [articles, setArticles] = useState({});
    const [requestedArticles, setRequestedArticles] = useState({});

    const fetchData = async (purchase) => {
        try {
            if (!requestedArticles[purchase.id]) {
                const articlesData = await PurchaseService.getArticlesByPurchaseId(purchase.id);
                setArticles((prevArticles) => ({
                    ...prevArticles,
                    [purchase.id]: articlesData,
                }));
                setRequestedArticles((prevRequestedArticles) => ({
                    ...prevRequestedArticles,
                    [purchase.id]: true,
                }));
            }
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    const toggleRowExpansion = async (purchaseId) => {
        const isExpanded = !expandedRows[purchaseId];
        setExpandedRows((prevExpandedRows) => ({
            ...prevExpandedRows,
            [purchaseId]: isExpanded,
        }));

        if (isExpanded) {
            const purchase = purchases.find((purchase) => purchase.id === purchaseId);
            if (purchase) {
                await fetchData(purchase);
            }
        }
    };

    useEffect(() => {
        const fetchPurchases = async () => {
            if (!id) {
                console.error('User ID is missing');
                return;
            }

            try {
                const data = await PurchaseService.getPurchaseByUserId(id);
                console.log('Fetched purchases:', data);
                setPurchases(data);
            } catch (error) {
                console.error('Error fetching purchases:', error);
            }
        };

        fetchPurchases();
    }, [id]);

    console.log('Rendering UserPurchasePage with purchases:', purchases);

    return (
        <div className="w-[60vw]">
            <h2 className="text-3xl text-center font-bold text-terciary mt-6 mb-10">My Purchases</h2>
            {purchases.map((purchase) => (
                <div className="bg-gray-50 p-4 rounded-md border shadow-md flex flex-col mt-6 mb-6" key={purchase.id}>
                    <div className='w-full flex'>
                        <div className="w-2/4 flex flex-col ">
                            <div className='flex flex-row gap-8 items-center text-lg '>
                                <p className='font-semibold'>Purchase of {format(new Date(purchase.date), 'dd-MM-yyyy')}</p>
                                <p>Status: {purchase.status}</p>
                            </div>
                            <p className="text-lg">Total: {purchase.total}€</p>
                        </div>
                        <div className='w-2/4 gap-10 justify-center flex flex-row items-center'>
                            <button className="w-40 h-14 bg-primary text-white text-base rounded-md cursor-pointer button-hover hover:text-black hover:bg-white hover:border" onClick={() => toggleRowExpansion(purchase.id)}>
                                {expandedRows[purchase.id] ? 'Hide Articles' : 'Show Articles'}
                            </button>
                            <button className="button-hover button-cart flex flex-row justify-around items-center bg-primary text-white w-40 h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-white hover:border-primary hover:border-solid hover:border">
                                <p className='mr-10' disabled>Cancel Purchase</p>
                                <div className="icon mr-2">
                                    <XCircleIcon className='w-6' />
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className='w-full'>
                        {expandedRows[purchase.id] && (
                            articles[purchase.id] ? (
                                <div className='flex flex-wrap gap-8 mt-8'>
                                    {articles[purchase.id].map((article, index) => (
                                        <div className='w-80 border shadow-md rounded-md p-4 flex flex-row' key={index}>
                                            <img src={`${process.env.REACT_APP_SERVER_URL}images/${article.filename}`} alt={article.name} className="w-3/6 rounded-md border" />
                                            <div className='ml-6 w-full flex flex-col items-start justify-center'>
                                                <p className='text-lg font-semibold'>{article.name}</p>
                                                <p className="text-lg font-regular">Price: {article.price}€</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>Loading articles...</div>
                            )
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserPurchasePage;