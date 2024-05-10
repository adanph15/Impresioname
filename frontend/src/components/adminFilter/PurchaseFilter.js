import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import PurchaseService from '../../services/PurcharseService';

export default function PurchaseFilter() {
    const [purchases, setPurchases] = useState([]);
    const [expandedRows, setExpandedRows] = useState({});
    const toast = useRef(null);

    const [articles, setArticles] = useState({});

    useEffect(() => {
        const fetchInfo = async () => {
            const fetchedPurchases = await PurchaseService.getAllPurchases();
            setPurchases(fetchedPurchases);
        };

        fetchInfo();
    }, []);

    const onRowExpand = async (event) => {
        toast.current.show({ severity: 'info', summary: 'Product Expanded', life: 3000 });
        setExpandedRows({ ...expandedRows });
    };

    const onRowCollapse = (event) => {
        toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
        setExpandedRows({ ...expandedRows, [`${event.data.id}`]: false });
    };

    const expandAll = () => {
        let _expandedRows = {};

        purchases.forEach((p) => (_expandedRows[`${p.id}`] = true));

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

    const statusArticleBodyTemplate = (rowData) => {
        return <Tag value={rowData.status.toLowerCase()} severity="success"></Tag>;
    };

    // const imageBodyTemplate = (rowData) => {
    //     return <img src={`https://localhost/images/${rowData.filename}`} alt={rowData.name} width="64px" className="shadow-4" />;
    // };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const stockBodyTemplate = (rowData) => {
        return <Tag value={rowData.stock} severity={getPurchaseSeverity(rowData)}></Tag>;
    };

    const getPurchaseSeverity = (purchase) => {
        return purchase.stock === 1 ? 'success' : 'danger';
    };

    // const getArticleSeverity = (status) => {
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
                <h5>Articles for Purchase ID: {purchase.id}</h5>
                <DataTable value={purchaseArticles}>
                    <Column style={{ width: '5rem' }} />
                    <Column field="name" header="Name" sortable />
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable />
                    <Column field="category" header="Category" sortable />
                    <Column field="stock" header="Stock" body={stockBodyTemplate} sortable />
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
                value={purchases}
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
                <Column field="date" header="Date" sortable />
                <Column field="total" header="Amount" body={amountBodyTemplate} sortable />
                <Column field="status" header="Status" body={statusArticleBodyTemplate} sortable />
            </DataTable>
        </div>
    );
}
