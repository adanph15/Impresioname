import React, { useState, useEffect } from 'react';
import ArticleService from '../../services/ArticleService';
import PurchaseService from '../../services/PurcharseService';

const ArticleFilter = () => {
    const [articles, setArticles] = useState([]);
    const [setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [expandedRows, setExpandedRows] = useState({});
    // const [categories] = useState(['men', 'women', 'kids']);
    // const [stocks] = useState(['true', 'false']);
    // const toast = useRef(null);
    const [purchases, setPurchases] = useState({});
    const [requestedArticles, setRequestedArticles] = useState({});

    useEffect(() => {
        fetchInfo();
    }, []);

    const fetchInfo = async () => {
        const fetchedArticles = await ArticleService.getAllArticles();
        setArticles(fetchedArticles);
        setLoading(false);
    };

    const onRowExpand = async (event, articleId) => {
        const newExpandedRows = { ...expandedRows };
        newExpandedRows[articleId] = !newExpandedRows[articleId];
        setExpandedRows(newExpandedRows);
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
    };

    const fetchData = async (article) => {
        try {
            if (!requestedArticles[article.id]) {
                const purchasesData = await PurchaseService.getPurchasesByArticleId(article.id);

                console.log("info: ", purchasesData)
                setPurchases((prevPurchases) => ({
                    ...prevPurchases,
                    [article.id]: purchasesData,
                }));

                setRequestedArticles((prevRequestedArticles) => ({
                    ...prevRequestedArticles,
                    [article.id]: true,
                }));
            }
        } catch (error) {
            console.error("Error fetching purchases:", error);
        }
    };

    const rowExpansionTemplate = (article) => {
        const articlePurchases = purchases[article.id];

        if (!articlePurchases) {
            fetchData(article);
            return <div>Not found</div>;
        }

        return (
            <div className="p-3">
                <h5>Orders for {article.name}</h5>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articlePurchases.map(purchase => (
                            <tr key={purchase.id}>
                                <td>{purchase.id}</td>
                                <td>{purchase.username}</td>
                                <td>{purchase.date}</td>
                                <td>{formatCurrency(purchase.total)}</td>
                                <td>{purchase.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const expandAll = () => {
        let _expandedRows = {};

        articles.forEach((a) => (_expandedRows[`${a.id}`] = true));

        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows({});
    };

    const checkStock = (stock) => {
        return stock === "true" ? "On Stock" : "Out of Stock";
    }

    // Filter articles based on global filter value
    const filteredArticles = articles.filter(article => {
        const matchesName = article.name.toLowerCase().includes(globalFilterValue.toLowerCase());
        const matchesCategory = article.category.toLowerCase().includes(globalFilterValue.toLowerCase());
        return matchesName || matchesCategory;
    });

    return (
        <div className="flex flex-col justify-center items-center">
            <div className='bg-red-400 flex justify-around'>
                <div className="flex justify-content-end mb-2">
                    <input value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5">
                <SearchBar
                    globalFilterValue={globalFilterValue}
                    setGlobalFilterValue={setGlobalFilterValue}
                    expandAll={expandAll}
                    collapseAll={collapseAll}
                />
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 text-center">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-1/12">
                                More Info
                            </th>
                            <th scope="col" className="px-6 py-3 w-1/12">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 w-3/12">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 w-1/12">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 w-1/12">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3 w-1/12">
                                Stock
                            </th>
                            <th scope="col" className="px-6 py-3 w-1/12">
                                Delete
                            </th>
                            <th scope="col" className="px-6 py-3 w-1/12">
                                Update
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render filtered articles */}
                        {filteredArticles.map(article => (
                            <React.Fragment key={article.id}>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <button onClick={(e) => onRowExpand(e, article.id)}>
                                            {expandedRows[article.id] ? 'Collapse' : 'Expand'}
                                        </button>
                                    </th>
                                    <td className="px-6 py-4">{article.id}</td>
                                    <td className="px-6 py-4 flex items-center justify-evenly ">
                                        <img src={`https://localhost/images/${article.filename}`} alt={article.name} className="w-1/5" />
                                        <p>{article.name}</p>
                                    </td>
                                    <td className="px-6 py-4">{formatCurrency(article.price)}</td>
                                    <td className="px-6 py-4">{article.category}</td>
                                    <td className="px-6 py-4">{checkStock(article.stock)}</td>
                                    <td className="px-6 py-4">borrar</td>
                                    <td className="px-6 py-4">actualizar</td>
                                </tr>
                                {expandedRows[article.id] && (
                                    <tr>
                                        <td colSpan="6">{rowExpansionTemplate(article)}</td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const SearchBar = ({ globalFilterValue, setGlobalFilterValue, expandAll, collapseAll }) => {
    const handleSearch = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
    };

    return (
        <div className='flex justify-between'>
            <form className="w-1/2 ml-0 mb-10">
                <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search by article Name or Category"
                    onChange={handleSearch}
                    value={globalFilterValue}
                    required
                />
                <button
                    type="submit"
                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-secundary rounded-e-lg border border-secundary  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </form>
            <div className='flex justify-evenly w-1/2 ml-0 mb-10 '>
                <button className="bg-secundary rounded-lg w-1/5 text-sm" onClick={expandAll}>Expand All</button>
                <button className="bg-secundary rounded-lg w-1/5 text-sm " onClick={collapseAll}>Collapse All</button>
            </div>
        </div>
    );
}

export default ArticleFilter;
