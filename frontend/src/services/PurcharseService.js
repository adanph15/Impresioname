import axios from 'axios';
import CartService from "./CartService";

const BASE_URL = 'https://localhost/api'; // Asegúrate de ajustar la URL según la configuración de tu backend

const status = "Purchase sent";

const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString(); // Obtiene la fecha en formato "2002-10-10T00:00:00.000Z"
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
            console.log("total es igual a = ", total)
            const response = await axios.post(`${BASE_URL}/purchase`, {
                date: date,
                total: total,
                status: status,
                user_id: user_id,
            });
            console.log(response.data)
            console.log("id: ", response.data.id)
            await PurchaseService.associateArticlesWithPurchase(response.data.id);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default PurchaseService;