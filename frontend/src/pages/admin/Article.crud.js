import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import ArticleService from '../../services/ArticleService';
import PurchaseService from '../../services/PurcharseService'

export default function AdminArticle() {
    const [articles, setArticles] = useState([]);
    const [expandedRows, setExpandedRows] = useState({});
    const toast = useRef(null);

    const [purchases, setPurchases] = useState({});
    // const [purchases, setPurchases] = useState({});



    useEffect(() => {
        const fetchInfo = async () => {
            const fetchedArticles = await ArticleService.getAllArticles();
            setArticles(fetchedArticles);
        };

        fetchInfo();
    }, []);

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

    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.total);
    };

    const statusPurchaseBodyTemplate = (rowData) => {
        // return <Tag value={rowData.status.toLowerCase()} severity={getPurchaseSeverity(rowData.status)}></Tag>;
        return <Tag value={rowData.status.toLowerCase()} severity="success"></Tag>;

    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`https://localhost/images/${rowData.filename}`} alt={rowData.name} width="64px" className="shadow-4" />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const stockBodyTemplate = (rowData) => {
        return <Tag value={rowData.stock} severity={getArticleSeverity(rowData)}></Tag>;
    };

    const getArticleSeverity = (article) => {
        return article.stock === 1 ? 'success' : 'danger';
    };

    const getPurchaseSeverity = (status) => {
        switch (status) {
            case 'DELIVERED':
                return 'success';

            case 'CANCELLED':
                return 'danger';

            case 'PENDING':
                return 'warning';

            case 'RETURNED':
                return 'info';

            default:
                return null;
        }
    };

    const fetchData = async (article) => {
        try {
            const purchasesData = await PurchaseService.getPurchasesByArticleId(article.id);
            setPurchases((prevPurchases) => ({
                ...prevPurchases,
                [article.id]: purchasesData,
            }));
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
                    {/* <Column field={async (rowData) => {
                        const name = await PurchaseService.getUserNameByPurchaseId(rowData.id);
                        console.log("NOMBRE:", name);
                        return name;
                    }} header="Customer" sortable /> */}
                    <Column field="user_id" header="Name" sortable />
                    <Column field="date" header="Date" sortable />
                    <Column field="total" header="Amount" body={amountBodyTemplate} sortable />
                    <Column field="status" header="Status" body={statusPurchaseBodyTemplate} sortable />
                </DataTable>
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text style={{ width: '5rem' }} />
            <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text style={{ width: '5rem' }} />
        </div>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <DataTable
                value={articles}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                onRowExpand={onRowExpand}
                onRowCollapse={onRowCollapse}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey="id"
                header={header}
                tableStyle={{ minWidth: '60rem', borderCollapse: 'collapse', border: '1px solid black' }}
            >
                <Column expander={true} style={{ width: '5rem' }} />
                <Column field="id" header="ID" sortable />
                <Column field="name" header="Name" sortable />
                <Column header="Image" body={imageBodyTemplate} />
                <Column field="price" header="Price" sortable body={priceBodyTemplate} />
                <Column field="category" header="Category" sortable />
                <Column field="stock" header="Stock" sortable body={stockBodyTemplate} />
            </DataTable>
        </div>
    );
}
