// ------------------------
// INITIAL DATA
// ------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

// ------------------------
// UPDATE COUNTS
// ------------------------
function updateCounts() {
  const cartCount = document.getElementById("cart-count");
  const favCount = document.getElementById("fav-count");
  if (cartCount) cartCount.textContent = cart.length;
  if (favCount) favCount.textContent = favourites.length;
}

// ------------------------
// ADD TO CART
// ------------------------
function addToCart(name, image, price) {
  name = decodeURIComponent(name);
  image = decodeURIComponent(image);

  const exists = cart.some(item => item.name === name);
  if (!exists) {
    cart.push({ name, image, price: parseInt(price) });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to Cart 🛒`);
  } else {
    alert(`${name} is already in Cart!`);
  }
  updateCounts();
  displayCart();
}

// ------------------------
// ADD TO FAVORITES
// ------------------------
function addToFavorites(name, image, price) {
  name = decodeURIComponent(name);
  image = decodeURIComponent(image);

  const exists = favourites.some(item => item.name === name);
  if (!exists) {
    favourites.push({ name, image, price });
    localStorage.setItem("favourites", JSON.stringify(favourites));
    alert(`${name} added to Favorites ❤️`);
  } else {
    alert(`${name} is already in Favorites!`);
  }
  updateCounts();
  displayFavorites();
}

// ------------------------
// SEARCH & DISPLAY PRODUCTS (CLIENT-SIDE FETCH)
// ------------------------
async function searchGrocery() {
  const query = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");
  const loader = document.getElementById("loader");
  resultsDiv.innerHTML = "";

  if (query === "") {
    resultsDiv.innerHTML = `<div class="alert alert-danger">⚠️ Please enter a grocery item!</div>`;
    return;
  }

  // Show loader
  loader.style.display = "flex";

  try {
    // Fetch directly from OpenFoodFacts API
    const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1`);
    const data = await response.json();

    resultsDiv.innerHTML = ""; // clear previous results

    if (!data.products || data.products.length === 0) {
      resultsDiv.innerHTML = `<div class="alert alert-warning">😕 No results found!</div>`;
      return;
    }

    data.products.slice(0, 12).forEach(product => {
      const price = Math.floor(Math.random() * 500) + 100; // random price
      const nameEnc = encodeURIComponent(product.product_name || "No Name");
      const imgEnc = encodeURIComponent(product.image_url || "https://via.placeholder.com/150");

      const card = `
        <div class="col-md-3 col-sm-6 mb-4">
          <div class="card h-100 shadow-sm">
            <img src="${product.image_url || 'https://via.placeholder.com/150'}" class="card-img-top">
            <div class="card-body text-center">
              <h5 class="card-title">${product.product_name || "No Name"}</h5>
              <p><strong>Brand:</strong> ${product.brands || "Unknown"}</p>
              <p><strong>Price:</strong> ${price} PKR</p>
              <button class="btn btn-outline-danger btn-sm" 
                onclick="addToFavorites('${nameEnc}','${imgEnc}','${price}')">
                <i class="bi bi-heart"></i> Favorite
              </button>
              <button class="btn btn-success btn-sm" 
                onclick="addToCart('${nameEnc}','${imgEnc}','${price}')">
                <i class="bi bi-cart"></i> Buy
              </button>
            </div>
          </div>
        </div>
      `;
      resultsDiv.innerHTML += card;
    });

  } catch (error) {
    resultsDiv.innerHTML = `<div class="alert alert-danger">🚨 Error fetching data! Please check your internet connection.</div>`;
    console.error(error);
  } finally {
    // Hide loader
    loader.style.display = "none";
  }
}

// ------------------------
// DISPLAY FAVORITES
// ------------------------
function displayFavorites() {
  const favDiv = document.getElementById("favorites");
  if (!favDiv) return;

  favDiv.innerHTML = favourites.map((item, index) => `
    <div class="col-md-3 mb-4">
      <div class="card h-100">
        <img src="${item.image}" class="card-img-top">
        <div class="card-body text-center">
          <h5>${item.name}</h5>
          <p>Price: ${item.price} PKR</p>
          <button class="btn btn-danger btn-sm" onclick="removeFavorite(${index})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

function removeFavorite(index) {
  favourites.splice(index, 1);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  displayFavorites();
  updateCounts();
}

// ------------------------
// DISPLAY CART
// ------------------------
function displayCart() {
  const cartDiv = document.getElementById("cartItems");
  const totalDiv = document.getElementById("totalPrice");
  if (!cartDiv || !totalDiv) return;

  let total = 0;
  cartDiv.innerHTML = cart.map((item, index) => {
    total += item.price;
    return `
      <div class="col-md-4 mb-3">
        <div class="card h-100">
          <img src="${item.image}" class="card-img-top">
          <div class="card-body text-center">
            <h5>${item.name}</h5>
            <p>Price: ${item.price} PKR</p>
            <button class="btn btn-danger btn-sm" onclick="removeCartItem(${index})">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  totalDiv.innerText = total;
}

function removeCartItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCounts();
}

// ------------------------
// CHECKOUT FUNCTION
// ------------------------
function checkoutCart() {
  if (cart.length === 0) {
    alert("🛒 Your cart is empty!");
    return;
  }

  let total = 0;
  let billHTML = `
    <h4>🛍️ Your Shopping Bill</h4>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th>Price (PKR)</th>
        </tr>
      </thead>
      <tbody>
  `;

  cart.forEach((item, index) => {
    total += item.price;
    billHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
      </tr>
    `;
  });

  billHTML += `
      <tr>
        <th colspan="2">Total</th>
        <th>${total} PKR</th>
      </tr>
      </tbody>
    </table>
    <div class="alert alert-success text-center">
      ✅ Thank you! Your shopping was successful.
    </div>
  `;

  const billContainer = document.getElementById("billContainer");
  if (billContainer) {
    billContainer.innerHTML = billHTML;
    billContainer.scrollIntoView({ behavior: "smooth" });
  } else {
    alert("Checkout Complete! Total: " + total + " PKR");
  }

  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCounts();
}

// ------------------------
// INIT ON LOAD
// ------------------------
updateCounts();
displayFavorites();
displayCart();
