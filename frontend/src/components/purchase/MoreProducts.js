import React, { useState, useEffect } from 'react';
import ArticleService from '../../services/ArticleService';

const MoreProducts = ({ excludedId }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await ArticleService.getAllArticles();
        const randomArticles = getRandomArticles(fetchedArticles, 4, excludedId);
        setArticles(randomArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    
    fetchArticles();
  }, [excludedId]); // Agregamos 'excludedId' al arreglo de dependencias

  const getRandomArticles = (articles, n, excludedId) => {
    const filteredArticles = articles.filter(article => article.id !== excludedId);
    const shuffled = filteredArticles.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {articles.map((product) => (
          <div key={product.id} className="group relative rounded-lg">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={`https://localhost/images/${product.filename}`}
                alt={product.name}
                className="h-full image-glasses w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.description}</p>
              </div>
              <p className="text-sm font-medium text-gray-900 mr-2">{product.price}€</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MoreProducts;