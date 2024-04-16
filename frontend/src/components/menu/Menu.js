import "./Menu.css";

export default function Menu({ isOpen, closeNav }) {
  return (
    <div className={`sidenav ${isOpen ? 'open' : ''}`}>
      <a href="#!" className="closebtn" onClick={closeNav}>
        &times;
      </a>
      <a className="menu-a" href="/home">Home</a>
      <a className="menu-a" href="/shop/men">Men</a>
      <a className="menu-a" href="/shop/women">Women</a>
      <a className="menu-a" href="/shop/kids">Kids</a>
      <a className="menu-a" href="/sign-in">Sign-in</a>
      <a className="menu-a" href="/sign-up">Sign-up</a>
      {/* <Link to="http://localhost:5488/templates/Obk5LjW" target="blank" className='menu-a'>Report</Link>  */}
    </div>
  );
}

