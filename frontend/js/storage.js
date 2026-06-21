const CART_STORAGE_KEY = "primeScentCart";

function getCart() {
  const cart = localStorage.getItem(CART_STORAGE_KEY);

  if (!cart) {
    return [];
  }

  return JSON.parse(cart);
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function addToCart(productId, qty) {
  const cart = getCart();

  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({
      productId,
      qty
    });
  }

  saveCart(cart);
}

function updateCartItemQty(productId, qty) {
  const cart = getCart();

  const item = cart.find((item) => item.productId === productId);

  if (item) {
    item.qty = qty;
  }

  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = getCart();

  const updatedCart = cart.filter((item) => item.productId !== productId);

  saveCart(updatedCart);
}

function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
}