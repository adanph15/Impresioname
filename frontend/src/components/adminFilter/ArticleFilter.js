import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import ArticleService from '../../services/ArticleService';
import PurchaseService from '../../services/PurcharseService'

import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

import './AdminArticle.css';

const ArticleFilter = () => {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        price: { value: null, matchMode: FilterMatchMode.EQUALS },
        categoty: { value: null, matchMode: FilterMatchMode.EQUALS },
        stock: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [expandedRows, setExpandedRows] = useState({});
    const toast = useRef(null);

    const [categories] = useState(['men', 'women', 'kids']);
    const [stocks] = useState(['true', 'false']);

    const [articles, setArticles] = useState([]);
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

    const onRowExpand = async (event) => {
        toast.current.show({ severity: 'info', summary: 'Product Expanded', life: 3000 });
        setExpandedRows({ ...expandedRows, });
    };

    const onRowCollapse = (event) => {
        toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
        setExpandedRows({ ...expandedRows, [`${event.data.id}`]: false });
    };

    const expandAll = () => {
        let _expandedRows = {};

        articles.forEach((a) => (_expandedRows[`${a.id}`] = true));

        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows({});
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div>
                <div className="flex justify-content-end">
                    {/* <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                    </span> */}
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search"> </InputIcon>
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} v-model="value1" placeholder="Search" />
                    </IconField>
                </div>
                <div className="flex flex-wrap justify-content-end gap-2">
                    <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text style={{ width: '5rem' }} />
                    <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text style={{ width: '5rem' }} />
                </div>
            </div>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <div className='xsadad'>
                <p>{rowData.name}</p>
                <img src={`https://localhost/images/${rowData.filename}`} alt={rowData.name} width="64px" className="shadow-4" />
            </div>
        );
    };

    const stockBodyTemplate = (rowData) => {
        return <Tag value={rowData.stock} severity={getStock(rowData)} />;
    };

    const stockItemTemplate = (option) => {
        return <Tag value={option.stock} severity={getStock(option.stock)} />;
    };

    const stockRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={stocks} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={stockItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
        );
    };

    const categoryBodyTemplate = (rowData) => {
        return <Tag value={rowData.category} />;
    };

    const categoryItemTemplate = (option) => {
        return <Tag value={option} />;
    };

    const categoryRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={categories} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={categoryItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
        );
    };

    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.total);
    };

    const statusPurchaseBodyTemplate = (rowData) => {
        return <Tag value={rowData.status.toLowerCase()} />;

    };

    const getStock = (stock) => {
        console.log("stock  ", stock)
        // switch (stock) {
        //     case 'false':
        //         return 'danger';

        //     case 'true':
        //         return 'success';
        // }
    };

    // const getPurchaseSeverity = (status) => {
    //     switch (status) {
    //         case 'DELIVERED':
    //             return 'success';

    //         case 'CANCELLED':
    //             return 'danger';

    //         case 'PENDING':
    //             return 'warning';

    //         case 'RETURNED':
    //             return 'info';

    //         default:
    //             return null;
    //     }
    // };

    const fetchData = async (article) => {
        try {
            // Verificar si ya se ha solicitado este artículo
            if (!requestedArticles[article.id]) {
                const purchasesData = await PurchaseService.getPurchasesByArticleId(article.id);

                console.log("info: ", purchasesData)
                setPurchases((prevPurchases) => ({
                    ...prevPurchases,
                    [article.id]: purchasesData,
                }));

                // Marcar el artículo como solicitado
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
                <DataTable value={articlePurchases}>
                    <Column style={{ width: '5rem' }} />
                    <Column field="id" header="Id" sortable />
                    <Column field="username" header="Name" sortable />
                    <Column field="date" header="Date" sortable />
                    <Column field="total" header="Amount" body={amountBodyTemplate} sortable />
                    <Column field="status" header="Status" body={statusPurchaseBodyTemplate} sortable />
                </DataTable>
            </div>
        );
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <DataTable
                value={articles}
                paginator
                rows={10}
                filters={filters}
                filterDisplay="row"
                loading={loading}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                onRowExpand={onRowExpand}
                onRowCollapse={onRowCollapse}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey="id"
                header={renderHeader}
                globalFilterFields={['name', 'price', 'category', 'stock']}
                tableStyle={{ minWidth: '60rem', borderCollapse: 'collapse', border: '1px solid black' }}
                emptyMessage="No articles found."
                className="my-datatable"
            >
                <Column expander={true} style={{ width: '5rem' }} />
                <Column field="id" header="ID" sortable className="columnStyle" />
                <Column header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} className="columnStyle" body={imageBodyTemplate} />
                <Column field="price" header="Price" sortable body={priceBodyTemplate} className="columnStyle" />
                <Column field="category" header="category" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={categoryBodyTemplate} filter filterElement={categoryRowFilterTemplate} className="columnStyle" />
                <Column field="stock" header="Stock" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={stockBodyTemplate} filter filterElement={stockRowFilterTemplate} className="columnStyle" />
            </DataTable>
        </div>
    );
}

export default ArticleFilter;