import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import jasonCategories from "../../assets/images/jasonCategories"
import "./Home.css";

export default function Home() {
  return (
    <>
      <body>
        <Header />
        <div className="home-container">
          <h2>newest</h2>
          <div className="home-container-newest">
            <p>will be soon</p>
          </div>
          <h2>category</h2>
          <div className="home-container-category">
            <div className="home-container-category-item" >
              <img src={jasonCategories[0]} alt="men" className="home-container-category-item-img"/>
              <h3>men</h3>
            </div>
            <div className="home-container-category-item" >
              <img src={jasonCategories[1]} alt="women" className="home-container-category-item-img"/>
              <h3>women</h3>
            </div>
            <div className="home-container-category-item" >
              <img src={jasonCategories[2]} alt="kids" className="home-container-category-item-img"/>
              <h3>kids</h3>
            </div>
          </div>
        </div>
        <a href="/shop-men"><button>hola</button></a>
        <Footer />
      </body>
    </>
  );
}
