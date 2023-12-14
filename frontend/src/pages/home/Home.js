import Header from "../../components/header/Header";
import Scroll from "../../components/scroll/Scroll";
import jasonCategories from "../../assets/images/jasonCategories"
import "./Home.css";

export default function Home() {
  return (
    <>
      <div>
        <Header />
        <div className="home-container">
          <h2>Newest</h2>
          <div className="home-container-newest">
            <Scroll />
          </div>
          <h2>Category</h2>
          <div className="home-container-category">
            <a href="/shop-men">
              <div className="home-container-category-item" >
                <img src={jasonCategories[0]} alt="men" className="home-container-category-item-img" />
                <h3>Men</h3>
              </div>
            </a>
            <a href="/shop-women">
              <div className="home-container-category-item" >
                <img src={jasonCategories[1]} alt="women" className="home-container-category-item-img" />
                <h3>Women</h3>
              </div>
            </a>
            <a href="/shop-kids">
              <div className="home-container-category-item" >
                <img src={jasonCategories[2]} alt="kids" className="home-container-category-item-img" />
                <h3>Kids</h3>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
