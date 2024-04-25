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
  const [activeTab, setActiveTab] = useState(category || 'all'); // Using lowercase 'all' for consistency
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

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setSelectedCategory(tabId === 'all' ? 'All' : tabId); // Convert 'all' back to 'All' for consistency
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
  };

  const articlesList = () => {
    return (
        <div className="w-85vw flex flex-row flex-wrap justify-around items-center text-white font-bold text-base">
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
    );
  };

  return (
    <>
        <Header />
        <div className="flex flex-col justify-between items-center gap-y-5">
          <h2 className="text-4xl font-bold text-terciary mt-10">Shop</h2>

          <ul className="flex border-b border-gray-300" value>
            <TabItem
              label="All"
              tabId="all"
              activeTab={activeTab}
              onClick={handleTabClick}
            />
            <TabItem
              label="Men"
              tabId="men"
              activeTab={activeTab}
              onClick={handleTabClick}
            />
            <TabItem
              label="Women"
              tabId="women"
              activeTab={activeTab}
              onClick={handleTabClick}
            />
            <TabItem
              label="Kids"
              tabId="kids"
              activeTab={activeTab}
              onClick={handleTabClick}
            />
          </ul>
          <TabContent tabId="all" activeTab={activeTab}>
            {articlesList()}
          </TabContent>
          <TabContent tabId="men" activeTab={activeTab}>
            {articlesList()}
          </TabContent>
          <TabContent tabId="women" activeTab={activeTab}>
            {articlesList()}
          </TabContent>
          <TabContent tabId="kids" activeTab={activeTab}>
            {articlesList()}
          </TabContent>
        </div>
        <ToastContainer />
    </>
  );
}

function TabItem({ label, tabId, activeTab, onClick }) {
  const isActive = tabId === activeTab;
  return (
    <li
      className={`relative flex items-center cursor-pointer py-2 px-4 text-xl ${isActive ? "text-terciary font-bold " : "text-primary font-medium"
        }`}
      onClick={() => onClick(tabId)}
    >
      {label}
    </li>
  );
}

function TabContent({ tabId, activeTab, children }) {
  return (
    <div
      className={`content ${tabId === activeTab ? "block" : "hidden"}`}
      id={tabId}
    >
      {children}
    </div>
  );
}
