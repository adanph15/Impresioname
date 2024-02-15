import "./Menu.css";

export default function Menu({ isOpen, closeNav }) {
  return (
    <div className={`sidenav ${isOpen ? 'open' : ''}`}>
      <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
        &times;
      </a>
      <a className="menu-a" href="/home">Home</a>
      <a className="menu-a" href="/shop-men">Men</a>
      <a className="menu-a" href="/shop-women">Women</a>
      <a className="menu-a" href="/shop-kids">Kids</a>
      <a className="menu-a" href="/sing-in">Sing-in</a>
      <a className="menu-a" href="/sing-up">Sing-up</a>
    </div>
  );
}