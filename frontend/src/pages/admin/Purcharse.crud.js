
import Header from "../../components/header/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPurcharse() {
    const [articles, setArticles] = useState([]);
    const [newArticle, setNewArticle] = useState({
        date: '',
        total: 0,
        status: 0,
    });

    useEffect(() => {
        showArticles();
    }, []);

    const showArticles = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/article/men');
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
            const formData = new FormData();
            formData.append('date', newArticle.date);
            formData.append('total', newArticle.total);
            formData.append('status', newArticle.status);
            console.log('Form Data:', formData);
            await axios.post('http://localhost:8000/api/article', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            showArticles();
            setNewArticle({
                date: '',
                total: 0,
                status: 0,
            });
        } catch (error) {
            console.error('Error creating article:', error);
        }
    };

    const handleDeleteArticle = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/article/${id}`);
            showArticles();
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    const renderArticles = () => {
        return (
            <div className="shop-container">
                <h2>Articles</h2>
                <div className="card-container">
                    {articles.map((article) => (
                        <div key={article.id} className="card-item">
                            <img src={`http://localhost:8000/images/${article.filename}`} className="card-item-photo" />
                            <strong>{article.name}</strong>
                            <p>{article.description}</p>
                            <p>Price: {article.price}€</p>
                            <p>Category: {article.category}</p>
                            <p>{article.stock ? 'In Stock' : 'Out of Stock'}</p>
                            <button onClick={() => handleDeleteArticle(article.id)} className='card-item-button'>
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
            <div>
                <Header />
                <form onSubmit={handleCreateArticle} className='singin-form-container'>
                    <div className="singin-form-item">
                        <h4>name</h4>
                        <input name="name" type="text" value={newArticle.name} onChange={handleInputChange}></input>
                    </div>
                    <div className="singin-form-item">
                        <h4>description</h4>
                        <input name="description" type="text" value={newArticle.description} onChange={handleInputChange}></input>
                    </div>
                    <div className="singin-form-item">
                        <h4>price</h4>
                        <input name="price" type="number" value={newArticle.price} onChange={handleInputChange}></input>
                    </div>
                    <div className="singin-form-item">
                        <h4>image</h4>
                        <input name="file" type="file" onChange={handleImageChange} multiple></input>
                    </div>
                    <div className="signin-form-item">
                        <h4>category</h4>
                        <select name="category" value={newArticle.category} onChange={handleInputChange}>
                            <option value="men">men</option>
                            <option value="women">women</option>
                            <option value="kids">kids</option>
                        </select>
                    </div>
                    <div className="singin-form-item">
                        <h4>stock</h4>
                        <input name="category" type="checkbox" checked={newArticle.stock} onChange={() =>
                            setNewArticle((prevArticle) => ({
                                ...prevArticle,
                                stock: !prevArticle.stock,
                            }))
                        }></input>
                    </div>
                    <div className="singin-form-item">
                        <button type='submit'>create</button>
                    </div>
                </form>

                {renderArticles()}
            </div>
        </>
    );
};