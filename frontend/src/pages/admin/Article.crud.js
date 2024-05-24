
import ArticleFilter from '../../components/adminFilter/ArticleFilter';
import PurchaseFilter from '../../components/adminFilter/PurchaseFilter';
import Header from '../../components/header/Header';

export default function AdminArticle() {

    return (
        <div>
            <Header />
            <ArticleFilter id="shop"/>
            <PurchaseFilter id="shop"/>
        </div>
    );
}