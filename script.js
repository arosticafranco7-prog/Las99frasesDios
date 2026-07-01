const products = [
  { id: 1, name: "Frase VIP 1", price: 10, img: "https://via.placeholder.com/300" },
  { id: 2, name: "Frase de impacto 2", price: 15, img: "https://via.placeholder.com/300" },
  { id: 3, name: "Frase trader 3", price: 20, img: "https://via.placeholder.com/300" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productContainer = document.getElementById("products");

function renderProducts() {
  productContainer.innerHTML = "";
  products.forEach(p => {
    productContainer.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Agregar</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  document.getElementById("cartCount").innerText = cart.length;
}

function toggleCart() {
  document.getElementById("cartPanel").classList.toggle("hidden");
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    container.innerHTML += `
      <p>${item.name} - $${item.price}
      <button onclick="removeItem(${index})">X</button></p>
    `;
  });

  document.getElementById("cartTotal").innerText = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function checkout() {
  alert("Compra simulada realizada 🔥 (aquí luego conectamos pago real)");
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  renderCart();
}

document.getElementById("cartBtn").addEventListener("click", toggleCart);

renderProducts();
updateCartCount();
