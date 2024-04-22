import axios from "axios";
// import { Toast } from "react-toastify/dist/components";
//  import { ToastContainer } from 'react-toastify';


const ArticleService = {
    getAllArticles: async function () {
        try {
            const response = await axios.get('https://localhost/api/article');
            return response.data;
        } catch (error) {
            return error('Error fetching articles:', error);
        }
    },

    getOneArticle: async function (id) {
        try {
            const response = await axios.get(`https://localhost/api/article/${id}`);
            return response.data;
        } catch (error) {
            return error(`Error fetching article with id ${id} :`, error);
        }
    },

    deleteOneArticle: async function (id) {
        try {
            await axios.delete(`https://localhost:443/api/article/${id}`);
            // Toast.success('Article deleted successfully');
        } catch (error) {
            console.error(`Error deleting with id ${id} :`, error);
            // Toast.error('Error deleting article');
        }
    },

    getArticlesByCategory: async function (category) {
        try {
            let response;
            if (category === "men" || category === "women" || category === "kids") {
                response = await axios.get(`https://localhost/api/article/category/${category}`);
            } else {
                response = await axios.get('https://localhost/api/article');
            }
            return (response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }

}


export default ArticleService;