import Header from "../../components/header/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Admin.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';

export default function AdminArticle() {
    const [file, setImage] = useState();
    const [articles, setArticles] = useState([]);
    const [newArticle, setNewArticle] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        stock: true,
        file: '',
    });

    const runEvent = (name, price, category) => {
        const socket = io("http://localhost:8000", { transports: ["websocket"] });
        socket.emit("new_glasses", { message:
            `New glasses ${name} 
            added right now go check it in ${category} category, 
            with a price of ${price}€.`
        });
    };

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleCreateArticle = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', newArticle.name);
            formData.append('description', newArticle.description);
            formData.append('price', newArticle.price);
            formData.append('category', newArticle.category);
            formData.append('stock', newArticle.stock);
            formData.append('file', file);
            console.log('Form Data:', formData);
            await axios.post('http://localhost:8000/api/article', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            runEvent(newArticle.name, newArticle.price, newArticle.category);
            showArticles();
            setNewArticle({
                name: '',
                description: '',
                price: 0,
                category: '',
                stock: false,
                file: '',
            });
            setImage(null);
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
                <div className="aricle-admin-container">
                    {articles.map((article) => (
                        <div key={article.id} className="article-admin-item">
                            <img src={`http://localhost:8000/images/${article.filename}`} alt={article.name} className="shop-card-item-photo" />
                            <p></p>
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
                    <h2>Add New Article</h2>
                    <div className="singin-form-item">
                        <h4>Name:</h4>
                        <input name="name" type="text" value={newArticle.name} onChange={handleInputChange}></input>
                    </div>
                    <div className="singin-form-item">
                        <h4>Description:</h4>
                        <input name="description" type="text" value={newArticle.description} onChange={handleInputChange}></input>
                    </div>
                    <div className="singin-form-item">
                        <h4>Price:</h4>
                        <input name="price" type="number" value={newArticle.price} onChange={handleInputChange}></input>
                    </div>
                    <div className="singin-form-item">
                        <h4>Image</h4>
                        <input name="file" type="file" onChange={handleImageChange} multiple></input>
                    </div>
                    <div className="signin-form-item">
                        <h4>Category:</h4>
                        <select name="category" value={newArticle.category} onChange={handleInputChange}>
                            <option value="">Choose Category</option>
                            <option value="men">men</option>
                            <option value="women">women</option>
                            <option value="kids">kids</option>
                        </select>
                    </div>
                    <div className="singin-form-item">
                        <h4>Stock:</h4>
                        <input name="category" type="checkbox" checked={newArticle.stock} onChange={() =>
                            setNewArticle((prevArticle) => ({
                                ...prevArticle,
                                stock: !prevArticle.stock,
                            }))
                        }></input>
                    </div>
                    <div className="singin-form-item">
                        <button type='submit'>Create</button>
                    </div>
                    <ToastContainer />
                </form>

                {renderArticles()}
            </div>
        </>
    );
};