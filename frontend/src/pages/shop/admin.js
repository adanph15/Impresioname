
const [articles, setArticles] = useState([]);
const [newArticle, setNewArticle] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: true,
});

useEffect(() => {
    showArticles();
}, []);

const showArticles = async () => {

    try {
        const response = await axios.get('http://localhost:8000/api/article');
        setArticles(response.data);
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
};

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle((prevArticle) => ({
        ...prevArticle,
        [name]: value,
    }));
};

const handleCreateArticle = async () => {
    try {
        await axios.post('/api/articles', newArticle);
        showArticles();
        setNewArticle({
            name: '',
            description: '',
            price: 0,
            category: '',
            stock: false,
        });
    } catch (error) {
        console.error('Error creating article:', error);
    }
};

const handleDeleteArticle = async (id) => {
    try {
        await axios.delete(`/api/articles/${id}`);
        showArticles();
    } catch (error) {
        console.error('Error deleting article:', error);
    }
};



const renderArticles = () => {

    return (
        <div className="shop-container">
            <h2>men</h2>
            <div className="shop-card-container">
                {articles.map((article) => (
                    <div className="shop-card-item">
                        <strong>{article.name}</strong>
                        <p>{article.description}</p>
                        <p>Price: {article.price}€</p>
                        <p>Category: {article.category}</p>
                        <p>{article.stock ? 'In Stock' : 'Out of Stock'}</p>
                        <button onClick={() => handleDeleteArticle(article.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};




return (
    <>
        <body>
            {renderArticles()}
        </body>
    </>
);
