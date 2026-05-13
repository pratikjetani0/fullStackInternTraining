import { fetchProducts } from "./services/api.js";
import type { Product } from "./types/index.js";
import { addToCart } from "./cart.js";

const productList = document.getElementById("product-list") as HTMLDivElement;
const loading = document.getElementById("loading") as HTMLDivElement;

function renderProduct(products: Product[]): void {
  productList.innerHTML = "";

  products.forEach((product: Product) => {
    const productCard = document.createElement("div");

    productCard.className =
      "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition";

    productCard.innerHTML = `
        <img 
        src="${product.image}" 
        alt="${product.title}" 
        class="w-full h-56 object-contain p-4 bg-slate-50"
      />
      
      <div class="p-4">
        <h3 class="text-lg font-semibold line-clamp-2 min-h-14">
          ${product.title}
        </h3>

        <p class="text-gray-500 text-sm mt-2 capitalize">
          ${product.category}
        </p>

        <div class="flex justify-between items-center mt-4">
            <span class="text-xl font-bold text-blue-600">
            ₹${Math.round(product.price * 85)}
          </span>

          <button
            data-id="${product.id}"
            class="add-to-cart bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
      `;
    productList.appendChild(productCard);
  });
}

async function init(): Promise<void> {
  const products = await fetchProducts();
  
  loading.classList.add("hidden");
  productList.classList.remove("hidden");

  renderProduct(products);

  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number((button as HTMLButtonElement).dataset.id);

      const selectedProduct = products.find(
        (product) => product.id === productId,
      );

      if (selectedProduct) {
        addToCart(selectedProduct);
      }
    });
  });
}

init();
