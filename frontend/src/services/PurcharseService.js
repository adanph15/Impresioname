import axios from 'axios';
import CartService from "./CartService";

const BASE_URL = 'https://localhost/api';

const status = "Purchase sent";

const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    return formattedDate;
};
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const PurchaseService = {
    associateArticlesWithPurchase: async (idPurchase) => {
        try {
            const user_id = userInfo.id;
            const cart = CartService.getCart(user_id);

            const promises = cart.map(async (article) => {
                const response = await axios.post(`${BASE_URL}/carry`, {
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
            const response = await axios.post(`${BASE_URL}/purchase`, {
                date: date,
                total: total,
                status: status,
                user_id: user_id,
            });
            await PurchaseService.associateArticlesWithPurchase(response.data.id);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default PurchaseService;