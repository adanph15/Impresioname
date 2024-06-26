import axios from 'axios';
import CartService from "./CartService";
import ArticleService from './ArticleService';

const userInfo = JSON.parse(localStorage.getItem('userInfo'));
const status = "Purchase sent";

const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    return formattedDate;
};

const PurchaseService = {
    getAllPurchases: async function () {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/purchase`);
            return response.data;
        } catch (error) {
            console.error('Error fetching purchases:', error);
        }
    },

    getPurchaseById: async function (id) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/purchase/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching purchase with id ${id} :`, error);
        }
    },

    getPurchaseByUserId: async function (userId) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/purchase/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching purchase with userID ${userId} :`, error);
        }
    },

    associateArticlesWithPurchase: async (idPurchase) => {
        try {
            const user_id = userInfo.id;
            const cart = CartService.getCart(user_id);

            const promises = cart.map(async (article) => {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}api/carry`, {
                    article_id: article.id,
                    purchase_id: idPurchase,
                });
                return response.data;
            });

            CartService.removeToken(userInfo.id);

            return Promise.all(promises);
        } catch (error) {
            throw error;
        }
    },

    createPurchase: async (total) => {
        try {
            const user_id = userInfo.id;
            const date = getCurrentDate();
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}api/purchase`, {
                date: date,
                total: total,
                status: status,
                user_id: user_id,
            });
            await PurchaseService.associateArticlesWithPurchase(response.data.id);
            window.location.href = '/profile';
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getArticlesByPurchaseId: async (purchaseId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/carry/purchase/${purchaseId}`);
            const articles = [];
            for (let t = 0; t < response.data.length; t++) {
                const carry = response.data[t];
                let article = await ArticleService.getOneArticle(carry.article_id);
                articles.push(article);
            }    
            if (articles.length === 0) {
                return null;
            } else {
                return articles;
            }
        } catch (error) {
            throw error;
        }
    },

    getPurchasesByArticleId: async (articleId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/carry/article/${articleId}`);
            let purchases = [];
            for (let t = 0; t < response.data.length; t++) {
                const carry = response.data[t];
                let purchase = await PurchaseService.getPurchaseById(carry.purchase_id);
                purchases.push(purchase);
            }    
            if (purchases.length === 0) {
                return null;
            } else {
                return purchases;
            }
    
        } catch (error) {
            console.error(`Error fetching article with id ${articleId} :`, error);
        }
    },
    
    getUserNameByPurchaseId: async (purchaseId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/carry/purchase/${purchaseId}`);
            const userId = response.data.user_id;
            const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/users/${userId}`);
            return userResponse.data.name;
        } catch (error) {
            console.error(`Error fetching users with purchase id ${purchaseId} :`, error);
        }
    }
};

export default PurchaseService;