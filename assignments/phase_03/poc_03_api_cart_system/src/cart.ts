import type { Product, CartItem } from "./types";
import { saveCart, loadCart } from "./utils/storage.js";
import { Toast } from "./utils/Toast.js";

const toast = new Toast()
let cart: CartItem[] = loadCart();

// Add product into cart
export function addToCart(product: Product): void {
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      product,
      quantity: 1,
    });
  }

  toast.show("Product added successfully", "success")

  saveCart(cart);
  renderCart();
}

// Total Calculation
function calculateTotal(): number {
  return cart.reduce((total, item) => {
    return total + item.product.price * item.quantity * 85;
  }, 0);
}

// Total Item count for header cart
function getTotalItems(): number {
  return cart.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
}

// Increase Quantity
function increaseQuantity(productId: number) {
  const item = cart.find((item) => item.product.id === productId);

  if (item) {
    item.quantity++;
  }

  saveCart(cart);
  renderCart();
}

// Decrease Quantity
function decreaseQuantity(productId: number) {
  const item = cart.find((item) => item.product.id === productId);

  if (!item) return;

  item.quantity--;

  if (item.quantity <= 0) {
    cart = cart.filter((cartItem) => cartItem.product.id !== productId);
  }

  saveCart(cart);
  renderCart();
}

// Cart Item show
function createCartItem(item: CartItem): HTMLDivElement {
  const cartItem = document.createElement("div");
  cartItem.className = "flex justify-between items-center  pb-3";

  cartItem.innerHTML = `
    <div class="flex-1">
      <h4 class="font-medium text-sm line-clamp-2">
        ${item.product.title}
      </h4>

      <div class="flex items-center gap-3 mt-3">

        <button 
          class="decrease bg-red-500 text-white w-8 h-8 rounded-full cursor-pointer"
          data-id="${item.product.id}"
        >
          -
        </button>

        <span class="font-medium">
          ${item.quantity}
        </span>

        <button 
          class="increase bg-green-500 text-white w-8 h-8 rounded-full cursor-pointer"
          data-id="${item.product.id}"
        >
          +
        </button>

      </div>
    </div>

    <span class="font-semibold text-blue-600 ml-4">
      ₹${Math.round(item.product.price * item.quantity * 85)}
    </span>
  
  `;

  return cartItem;
}

// EVENT FOR INCREMENT AND DECREMENT
function addCartEvents(): void {
  const increaseButtons = document.querySelectorAll(".increase");
  const decreaseButtons = document.querySelectorAll(".decrease");

  increaseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = Number((btn as HTMLButtonElement).dataset.id);

      increaseQuantity(productId);
    });
  });

  decreaseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = Number((btn as HTMLButtonElement).dataset.id);

      decreaseQuantity(productId);
    });
  });
}

// Checkout function
function checkout(): void {
  if (cart.length === 0) {
    toast.show("Your cart is empty", "warning");
    return;
  }

  const modal = document.getElementById("success-modal") as HTMLDivElement;

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  cart = [];
  saveCart(cart);
  renderCart();

  setTimeout(() => {
    location.reload();
  }, 2000);
}

function addCheckoutEvent(): void {
  const checkoutBtn = document.getElementById(
    "checkout-btn",
  ) as HTMLButtonElement;

  checkoutBtn.addEventListener("click", checkout);
}

//Render cart
function renderCart(): void {
  const cartItems = document.getElementById("cart-items") as HTMLDivElement;
  const cartCount = document.getElementById("cart-count") as HTMLSpanElement;
  const cartTotal = document.getElementById("cart-total") as HTMLSpanElement;
  const emptyMessage = document.getElementById(
    "empty-cart-msg",
  ) as HTMLParagraphElement;

  cartItems.innerHTML = "";

  // Empty message
  if (cart.length === 0) {
    emptyMessage.classList.remove("hidden");
  } else {
    emptyMessage.classList.add("hidden");
  }

  cart.forEach((item) => {
    const cartItem = createCartItem(item);
    cartItems.appendChild(cartItem);
  });

  cartCount.textContent = getTotalItems().toString()
  cartTotal.textContent = Math.round(calculateTotal()).toString();

  addCartEvents();
}

renderCart();
addCheckoutEvent();
