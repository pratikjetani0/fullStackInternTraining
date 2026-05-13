const form = document.getElementById("product-form");

let products = JSON.parse(localStorage.getItem("products")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newProduct = {
    id: Date.now(),
    name: document.getElementById("name").value,
    price: Number(document.getElementById("price").value),
    description: document.getElementById("description").value,
    image: document.getElementById("image").value,
  };

  if (
    !newProduct.name ||
    !newProduct.price ||
    !newProduct.description ||
    !newProduct.image
  ) {
    showToast("❌All fields required");
    return;
  }

  products.push(newProduct);

  localStorage.setItem("products", JSON.stringify(products));

  showToast("✅ Product Added Successfully");

  form.reset();

  window.location.href = "./index.html";
});

// Message show
function showToast(msg) {
  const toast = document.createElement("div");
  toast.innerText = msg;
  toast.className = "toast";
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => toast.remove(), 2500);
}
