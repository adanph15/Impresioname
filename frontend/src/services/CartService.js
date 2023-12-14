const CartService = {
  getCart(id) {
    const cartString = localStorage.getItem(`cart${id}`);
    // Parse the stored string and ensure it is an array, or default to an empty array
    const cartArray = cartString ? JSON.parse(cartString) : [];
    return Array.isArray(cartArray) ? cartArray : [];
  },

  setCart(id, article) {
    localStorage.setItem(`cart${id}`, JSON.stringify(article));
  },

  removeToken(id) {
    localStorage.removeItem(`cart${id}`);
  },

};

export default CartService;
