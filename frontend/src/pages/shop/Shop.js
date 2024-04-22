import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../../components/header/Header";
import { Link } from 'react-router-dom';
import { SelectButton } from 'primereact/selectbutton';
import { ToastContainer } from 'react-toastify';
import useSocketService from '../../services/SocketService';
import ArticleService from '../../services/ArticleService';

export default function Shop() {
  useSocketService();
  const { category } = useParams();

  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');

  useEffect(() => {
    fetchArticles(selectedCategory);
  }, [selectedCategory]);

  const fetchArticles = async (category) => {
    try {
      const fetchedArticles = await ArticleService.getArticlesByCategory(category);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
  };

  const getHeader = (category) => {
    if (category === "men") {
      return ("Men");
    } else if (category === "women") {
      return ("Women");
    } else if (category === "kids") {
      return ("Kids");
    } else {
      return ("All");
    }
  }


  const categories = [
    { name: "All Categories", value: "All" },
    { name: "Men", value: "men" },
    { name: "Women", value: "women" },
    { name: "Kids", value: "kids" }
  ];



  // <div className="card flex justify-content-center">
  //     <Dropdown value={selectedCity} onChange={handleCategoryChange} options={categories}
  //         placeholder="Select a Category" className=" bg-primary text-white w-48" />
  // </div>




  const articlesList = () => {
    return (
      <div className="flex flex-col justify-between items-center gap-y-5  mt-10">
        {/* <h2 className='text-2xl font-bold'>{getHeader(selectedCategory)}</h2>
        <div>
          <select className="bg-primary text-white w-48" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">All Categories</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div> */}
        <div className="w-6/12	flex justify-content-center bg-surface-card p-8 mb-4 rounded-lg border-2 border-terciary border-solid text-2xl font-bold">
          <SelectButton className='color-primary' value={selectedCategory} onChange={handleCategoryChange} optionLabel="name" options={categories} />
        </div>
        <div className="w-85vw flex flex-row flex-wrap justify-around items-center  text-white font-bold text-base">
          {articles.map((article) => (
            <Link to={`/glasses/${article.id}`} classNameName='link' key={article.id}>
              <div className="w-48 min-h-60 flex flex-col flex-nowrap justify-center items-center bg-primary m-10 rounded-lg transition-transform transform hover:scale-110">
                <img className="mt-0 mb-1 rounded-t-lg " src={`https://localhost/images/${article.filename}`} alt={article.name} />
                <strong>{article.name}</strong>
                <p>{article.price}€</p>
                <button className="w-40 h-10 mt-2 bg-white text-black font-bold mb-2 rounded-md cursor-pointer text-sm hover:bg-black hover:text-white">
                  Know me
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };


  return (
    <>
      <div>
        <Header />
        {articlesList()}
        <ToastContainer />
      </div>
    </>
  );
}
