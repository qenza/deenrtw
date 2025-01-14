const shippingCost = 8;

// Initialize favourites and cart from localStorage
let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = {};

// Load products from JSON
function loadProducts() {
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts("abaya"); // Default category filter is "abaya"
        })
        .catch(error => console.error("Error loading products:", error));
}

// Render products for a specific category
function renderProducts(category) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; // Clear the product container

    // Loop through products and render them based on selected category
    const categoryProducts = products[category];

    // Check if the category has any products
    if (categoryProducts && categoryProducts.length > 0) {
        categoryProducts.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>RM ${product.price}</p>
                <div class="button-container">
                    <button class="like-button" data-name="${product.name}">❤</button>
                    <button class="add-to-cart-btn" data-name="${product.name}">Add to Cart</button>
                </div>
            `;

            // Add click event to "Like" button
            const likeButton = productCard.querySelector(".like-button");
            likeButton.addEventListener("click", function () {
                toggleFavourite(product);
                this.classList.toggle("liked", isLiked(product.name));
            });

            // Add click event to "Add to Cart" button
            const addToCartButton = productCard.querySelector(".add-to-cart-btn");
            addToCartButton.addEventListener("click", function () {
                addToCart(product);
                alert(`${product.name} has been added to your cart!`);
            });

            productContainer.appendChild(productCard);
        });
    } else {
        productContainer.innerHTML = "<p>No products in this category.</p>"; // Show message if no products
    }
}

// Add product to the cart
function addToCart(product) {
    const existingItem = cart.find(cartItem => cartItem.name === product.name);

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if product already in cart
    } else {
        const cartItem = { ...product, quantity: 1 }; // Add new product to cart
        cart.push(cartItem);
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Toggle favourite status
function toggleFavourite(product) {
    const isLiked = favourites.some(fav => fav.name === product.name);

    if (!isLiked) {
        favourites.push(product);
    } else {
        favourites = favourites.filter(fav => fav.name !== product.name);
    }

    // Save updated favourites to localStorage
    localStorage.setItem('favourites', JSON.stringify(favourites));
}

// Check if a product is in the favourites list
function isLiked(productName) {
    return favourites.some(fav => fav.name === productName);
}

// Category filter buttons
document.querySelectorAll(".category-filter button").forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;
        renderProducts(category);
    });
});

// Load products initially
loadProducts();


// Example function to add product to favourites
const favouriteButton = document.querySelectorAll(".like-button");
favouriteButton.forEach(button => {
    button.addEventListener("click", function() {
        const product = getProductByName(this.dataset.name); // Replace with your method of retrieving a product by its name
        if (!favourites.includes(product)) {
            favourites.push(product);
            console.log(product.name + " added to favourites");
        }
    });
});

// Show the Favourites Page
function showFavouritesPage() {
    const favouriteProductsContainer = document.getElementById("favourite-products");
    favouriteProductsContainer.innerHTML = ""; // Clear previous favourite products

    // Display all products in the favourites list
    if (favourites.length > 0) {
        favourites.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>RM ${product.price}</p>
            `;
            favouriteProductsContainer.appendChild(productCard);
        });
    } else {
        favouriteProductsContainer.innerHTML = "<p>No products in your favourites list.</p>";
    }
}

// Load the favourites list when on the favourites page
if (window.location.pathname.includes("favourites.html")) {
    showFavouritesPage();
}


// Select elements
const menuButton = document.getElementById("menu-button");
const closeMenuButton = document.getElementById("close-menu");
const popupMenu = document.getElementById("popup-menu");

// Open the menu
menuButton.addEventListener("click", () => {
  popupMenu.classList.remove("hidden");
});

// Close the menu
closeMenuButton.addEventListener("click", () => {
  popupMenu.classList.add("hidden");
});

// Load cart items from localStorage and render them
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const noItemsMessage = document.getElementById("no-items");
  let total = 0;

  cartItemsContainer.innerHTML = ""; // Clear previous cart items

  if (cart.length === 0) {
    noItemsMessage.classList.remove("hidden"); // Show "No items" message
  } else {
    noItemsMessage.classList.add("hidden"); // Hide "No items" message

    cart.forEach(item => {
      total += item.price * item.quantity;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <div>
          <h3>${item.name}</h3>
          <p>Quantity: ${item.quantity}</p>
        </div>
        <p>Price: RM ${item.price * item.quantity}</p>
      `;
      cartItemsContainer.appendChild(cartItem);
      
    });
  }

  // Update total price
  total += shippingCost;
  document.getElementById("total-price").textContent = `Total: RM ${total.toFixed(2)}`;

  // Update trolley count
  updateTrolleyCount(cart.length);
}

// Function to add an item to the cart
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
        const productName = this.dataset.name; // Get product name from data attribute
        const product = getProductByName(productName); // Replace with your method of retrieving a product by its name

        // Check if the product is already in the cart
        const existingItem = cart.find(item => item.name === product.name);

        if (existingItem) {
            existingItem.quantity += 1; // Increase quantity if product already in cart
        } else {
            cart.push({ ...product, quantity: 1 }); // Add new product to cart
        }

        // Save cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`${product.name} has been added to your cart!`);
    });
});

function showCartPage() {
  const cartProductsContainer = document.getElementById("checkout-products");
  cartProductsContainer.innerHTML = ""; // Clear previous cart products

  const cart = JSON.parse(localStorage.getItem("cart")) || []; // Get cart from localStorage
  let total = 0;

  if (cart.length > 0) {
      cart.forEach(product => {
          total += product.price * product.quantity;

          const productCard = document.createElement("div");
          productCard.classList.add("product-card");
          productCard.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>Quantity: ${product.quantity}</p>
              <p>Price: RM ${product.price * product.quantity}</p>
          `;
          cartProductsContainer.appendChild(productCard);
        
      });

      
      // Show total price
      const totalElement = document.createElement("p");
      totalElement.textContent = `Total: RM ${total.toFixed(2)}`;
      cartProductsContainer.appendChild(totalElement);
  } else {
      cartProductsContainer.innerHTML = "<p>Your cart is empty!</p>";
  }


}

// Load the cart when on the checkout page
if (window.location.pathname.includes("checkout.html")) {
  showCartPage();
}

  
// Validate form fields
function validateForm() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const address = document.getElementById("address");
  let isValid = true;

  if (!name.value.trim()) {
    document.getElementById("name-error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("name-error").style.display = "none";
  }

  if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
    document.getElementById("email-error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("email-error").style.display = "none";
  }

  if (!address.value.trim()) {
    document.getElementById("address-error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("address-error").style.display = "none";
  }

  return isValid;
}

// Handle form submission
document.getElementById("checkout-form").addEventListener("submit", event => {
  event.preventDefault(); // Prevent form submission

  if (validateForm()) {
      
      loadCart(); // Ensure the latest cart details are loaded
      localStorage.removeItem("cart"); // Clear cart data from localStorage after checkout
      alert("Your order has been confirmed!");
      document.getElementById("success-message").classList.remove("hidden");
      document.getElementById("checkout-form-section").classList.add("hidden");
      document.getElementById("cart-section").classList.add("hidden");
  } else {
      alert("Please fill out all required fields.");
  }
});

document.querySelector('.back-button').addEventListener('click', function (e) {
  e.preventDefault();
  alert('Going back to the previous page!');
  window.location.href = 'homepage.html';
});
// Load cart on page load
loadCart();


