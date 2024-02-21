import Header from "../../components/header/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import PurchaseService from '../../services/PurcharseService';
import { format } from 'date-fns';


const UserPurchasePage = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const id = userInfo.id;
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await axios.get(`https://localhost/api/purchase/user/${id}`);
                setPurchases(response.data);
            } catch (error) {
                console.error('Error fetching Purchases:', error);
            }
        };

        fetchPurchases();
    }, [id]);


    //     const renderArticlesForPurchase = async (purchaseId) => {
    //   try {
    //     const articles = await PurchaseService.getArticlesByPurchaseId(purchaseId);
    //     return (
    //       <div>
    //         {articles.map((article) => (
    //           <div key={article.id}>
    //             <p>Name: {article.name}</p>
    //             <p>Price: {article.price}</p>
    //           </div>
    //         ))}
    //       </div>
    //     );
    //   } catch (error) {
    //     console.error('Error al obtener los artículos:', error);
    //   }
    // };

    return (
        <>
            <body>
                <Header />
                <div className="purchase">
                    <h2>My Purchases</h2>
                    {purchases.map((purchase) => (
                        <div className="purchase-container">
                            <div className="purchase-item">
                                <p>Purchase: {format(new Date(purchase.date), 'yyyy-MM-dd')}</p>
                                <p>Total: {purchase.total}€</p>
                                <p>Status: {purchase.status}</p>
                            </div>
                            <div>
                                {/* {renderArticlesForPurchase(purchase.id)} */}
                            </div>
                            <div>
                                <button className="purchase-button" disabled>Cancel Purchase</button>
                                {/* <button className="direction-button" onClick={() => handleDelete(purchase.id)}>Delete</button> */}
                            </div>
                        </div>
                    ))}
                </div>
            </body >
        </>
    );
};

export default UserPurchasePage;




