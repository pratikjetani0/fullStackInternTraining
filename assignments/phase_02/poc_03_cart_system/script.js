// Product Data
const defaultProducts = [
  {
    id: 1,
    name: "Gaming Keyboard",
    price: 2899,
    description: "Mechanical RGB keyboard designed for precision gaming.",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600&auto=format&fit=crop&q=60",
  },

  {
    id: 2,
    name: "Smartphone",
    price: 18999,
    description: "High-performance smartphone with stunning display.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Gaming Phone",
    price: 18999,
    description: "High-performance smartphone with stunning display.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=60",
  },
];

let products = JSON.parse(localStorage.getItem("products")) || defaultProducts;


// Cart State
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

// show product in web
function showProducts() {
  productList.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">  
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
              <p>${product.description}</p>
              <div class="price">₹${product.price}</div>
              <button class="add-btn" onclick="addToCart(${product.id})" >Add to Cart</button>
        </div>
        `,
    )
    .join("");
}

// Product add to local stotage (or cart)
function addToCart(productId) {

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    const product = products.find((item) => item.id === productId); // find id of product
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  //   localStorage.setItem("cart", JSON.stringify(cart));

  showToast("✅ Product added successfully");

  updateCart();
}

// show added product on cart
function showCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart"> 🛒 Your cart is empty <br>
    Add some products</p>`;
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <h4>${item.name}</h4>

            <div class="cart-controls">
              <button class="qty-btn" onclick="decreaseQuantity(${item.id})">-</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" onclick="increaseQuantity(${item.id})">+</button>
            </div>

            <p>₹${(item.price * item.quantity).toLocaleString()}</p>
            <button class="remove-btn" onclick="removeProductFromCart(${item.id})">Remove</button>
          </div>
        
        
        `,
    )
    .join("");
}

// Increase Quantity
function increaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity++;
    updateCart();
  }

  showToast("✅ Increase Product Quantity");
}

// Decrease Quantity
function decreaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);

  if (!item) return;

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    removeProductFromCart(productId); // remove the product if quality is 1
    return;
  }

  showToast("✅ Decrease Product Quantity");

  updateCart();
}

// Remove the product and also if decrese to 0 also remove the product
function removeProductFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId); // if match exclude
  showToast("✅ Remove Product Successfully");
  updateCart();
}

// Calculate Cart total price
function calculateTotal() {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

// Update Cart Count // this is for show count items in cart in header
function updateCartCount() {
  const totalItems = cart.reduce((count, item) => {
    return count + item.quantity;
  }, 0);

  cartCount.textContent = totalItems;
}

// save the product in local storage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Message show
function showToast(msg) {
  const toast = document.createElement("div");
  toast.innerText = msg;
  toast.className = "toast";
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => toast.remove(), 2500);
}

// Update Entire Cart
function updateCart() {
  showCart();
  updateCartCount();
  cartTotal.textContent = calculateTotal().toLocaleString();
  saveCart();
}

// Initialize App
function init() {
  showProducts();
  updateCart();
}

document.querySelector(".checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("⚠️ Your cart is empty");
    return;
  }

  showToast(" ✅Order placed successfully!");
  cart = [];
  updateCart();
});

init();
