import React, { useState, useEffect, useRef } from 'react';
import ArticleService from '../../services/ArticleService';
import PurchaseService from '../../services/PurcharseService';

const PurchaseFilter = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [expandedRows, setExpandedRows] = useState({});
    const [categories] = useState(['men', 'women', 'kids']);
    const [stocks] = useState(['true', 'false']);
    const toast = useRef(null);
    const [purchases, setPurchases] = useState({});
    const [requestedArticles, setRequestedArticles] = useState({});

    useEffect(() => {
        fetchInfo();
    }, []);

    const fetchInfo = async () => {
        const fetchedPurchases = await PurchaseService.getAllPurchases();
        setPurchases(fetchedPurchases);
        setLoading(false);
    };

    const onRowExpand = async (event, purchaseId) => {
        const newExpandedRows = { ...expandedRows };
        newExpandedRows[purchaseId] = !newExpandedRows[purchaseId];
        setExpandedRows(newExpandedRows);
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
    };

    const fetchData = async (purchase) => {
        try {
            const articlesData = await PurchaseService.getArticlesByPurchaseId(purchase.id);
            setArticles((prevArticles) => ({
                ...prevArticles,
                [purchase.id]: articlesData,
            }));
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    const rowExpansionTemplate = (purchase) => {
        const purchaseArticles = articles[purchase.id];

        if (!purchaseArticles) {
            fetchData(purchase);
            return <div>Not found</div>;
        }

        return (
            <div className="p-3">
                <h5>Articles for {purchase.name}</h5>
                <table>
                    <thead>
                        <tr>
                            <th>Article-ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseArticles.map(article => (
                            <tr key={purchase.id}>
                                <td className="px-6 py-4">{article.id}</td>
                                <td className="px-6 py-4 flex items-center justify-evenly ">
                                    <img src={`https://localhost/images/${article.filename}`} alt={article.name} className="w-1/5" />
                                    <p>{article.name}</p>
                                </td>
                                <td className="px-6 py-4">{formatCurrency(article.price)}</td>
                                <td className="px-6 py-4">{article.category}</td>
                                <td className="px-6 py-4">{checkStock(article.stock)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const expandAll = () => {
        let _expandedRows = {};

        purchases.forEach((p) => (_expandedRows[`${p.id}`] = true));

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
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 w-1/12">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 w-1/12">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3 w-1/12">
                                User-ID
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
                        {filteredArticles.map(purchase => (
                            <React.Fragment key={purchase.id}>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <button onClick={(e) => onRowExpand(e, purchase.id)}>
                                            {expandedRows[purchase.id] ? 'Collapse' : 'Expand'}
                                        </button>
                                    </th>
                                    <td className="px-6 py-4">{purchase.id}</td>
                                    <td className="px-6 py-4">{purchase.date}</td>
                                    <td className="px-6 py-4">{purchase.status}</td>
                                    <td className="px-6 py-4">{purchase.total}€</td>
                                    <td className="px-6 py-4">{purchase.user_id}</td>
                                    <td className="px-6 py-4">borrar</td>
                                    <td className="px-6 py-4">actualizar</td>
                                </tr>
                                {expandedRows[purchase.id] && (
                                    <tr>
                                        <td colSpan="6">{rowExpansionTemplate(purchase)}</td>
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
            <form className="w-1/2 ml-20 mt-24 mb-10 flex flex-row ">
                <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-3/4 z-20 text-sm text-gray-900 bg-gray-50 rounded-l-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search by article Name or Category"
                    onChange={handleSearch}
                    value={globalFilterValue}
                    required
                />
                <button
                    type="submit"
                    className=" top-0 p-2.5 text-sm font-medium  text-white bg-secundary rounded-e-lg border border-secundary  focus:ring-4 focus:outline-none focus:ring-blue-300"
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

export default PurchaseFilter;
