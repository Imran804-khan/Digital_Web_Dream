// ===== Products Data =====
const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 79.99,
        description: 'High-quality sound with noise cancellation',
        emoji: '🎧',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        description: 'Track your fitness and stay connected',
        emoji: '⌚',
        rating: '⭐⭐⭐⭐'
    },
    {
        id: 3,
        name: 'USB-C Cable',
        price: 12.99,
        description: 'Fast charging and data transfer',
        emoji: '🔌',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        id: 4,
        name: 'Portable Charger',
        price: 34.99,
        description: '20000mAh capacity, dual USB ports',
        emoji: '🔋',
        rating: '⭐⭐⭐⭐'
    },
    {
        id: 5,
        name: 'Webcam HD',
        price: 59.99,
        description: '1080p video with built-in microphone',
        emoji: '📹',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        id: 6,
        name: 'Bluetooth Speaker',
        price: 45.99,
        description: 'Waterproof with 12-hour battery life',
        emoji: '🔊',
        rating: '⭐⭐⭐⭐'
    },
    {
        id: 7,
        name: 'Phone Stand',
        price: 15.99,
        description: 'Adjustable, compatible with all phones',
        emoji: '📱',
        rating: '⭐⭐⭐⭐'
    },
    {
        id: 8,
        name: 'LED Desk Lamp',
        price: 39.99,
        description: 'Adjustable brightness and color temperature',
        emoji: '💡',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        id: 9,
        name: 'Mechanical Keyboard',
        price: 129.99,
        description: 'RGB backlit with tactile switches',
        emoji: '⌨️',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        id: 10,
        name: 'Gaming Mouse',
        price: 59.99,
        description: 'High precision with programmable buttons',
        emoji: '🖱️',
        rating: '⭐⭐⭐⭐'
    },
    {
        id: 11,
        name: 'External SSD',
        price: 89.99,
        description: '1TB ultra-fast storage with USB-C',
        emoji: '💾',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        id: 12,
        name: 'USB Hub',
        price: 29.99,
        description: '7-port hub with charging capability',
        emoji: '🔗',
        rating: '⭐⭐⭐⭐'
    },
    {
        id: 13,
        name: 'Screen Protector',
        price: 9.99,
        description: 'Tempered glass for smartphones',
        emoji: '🛡️',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        id: 14,
        name: 'Wireless Charger',
        price: 34.99,
        description: 'Fast charging pad for all devices',
        emoji: '⚡',
        rating: '⭐⭐⭐⭐'
    },
    {
        id: 15,
        name: 'Phone Case',
        price: 19.99,
        description: 'Durable protective case with shock absorption',
        emoji: '📦',
        rating: '⭐⭐⭐⭐'
    },
    {
        id: 16,
        name: 'HDMI Cable',
        price: 14.99,
        description: '4K 60fps support, gold-plated connectors',
        emoji: '🎬',
        rating: '⭐⭐⭐⭐⭐'
    }
];

// ===== Cart Management =====
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const cartContent = document.getElementById('cartContent');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const cartSummary = document.getElementById('cartSummary');
const grandTotal = document.getElementById('grandTotal');
const cartToggle = document.getElementById('cartToggle');
const cartCount = document.querySelector('.cart-count');
const clearCartBtn = document.getElementById('clearCartBtn');

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    displayProducts();
    updateCart();
});

// ===== Display Products =====
function displayProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">${product.emoji}</div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <p class="product-description">${product.description}</p>
            <div class="product-rating">${product.rating}</div>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;
    return card;
}

// ===== Add to Cart =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    saveCartToStorage();
    showNotification(`${product.name} added to cart!`);
}

// ===== Update Cart Display =====
function updateCart() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartSummary.style.display = 'none';
        cartCount.textContent = '0';
        return;
    }

    emptyCartMessage.style.display = 'none';
    cartSummary.style.display = 'block';

    let grandTotalAmount = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        grandTotalAmount += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">−</button>
                <input type="number" class="quantity-input" value="${item.quantity}" 
                       onchange="updateQuantity(${item.id}, this.value)" min="1">
                <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
            </div>
            <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
            <button class="cart-remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    grandTotal.textContent = `$${grandTotalAmount.toFixed(2)}`;
    cartCount.textContent = cart.length;
}

// ===== Quantity Management =====
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        updateCart();
        saveCartToStorage();
    }
}

function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
        saveCartToStorage();
    }
}

function updateQuantity(productId, newQuantity) {
    const quantity = parseInt(newQuantity);
    const item = cart.find(item => item.id === productId);

    if (item) {
        if (quantity < 1) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            updateCart();
            saveCartToStorage();
        }
    }
}

// ===== Remove from Cart =====
function removeFromCart(productId) {
    const product = cart.find(item => item.id === productId);
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCartToStorage();
    showNotification(`${product.name} removed from cart!`);
}

// ===== Clear Cart =====
clearCartBtn.addEventListener('click', () => {
    if (cart.length === 0) return;

    if (confirm('Are you sure you want to clear your cart? This action cannot be undone.')) {
        cart = [];
        updateCart();
        saveCartToStorage();
        showNotification('Cart cleared!', 'success');
    }
});

// ===== Local Storage =====
function saveCartToStorage() {
    localStorage.setItem('ecommerceCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('ecommerceCart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            console.error('Error loading cart from storage:', e);
            cart = [];
        }
    }
}

// ===== Notifications =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Mobile Menu Toggle =====
cartToggle.addEventListener('click', () => {
    const cartSection = document.getElementById('cart-section');
    cartSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// ===== Search Functionality (Bonus Feature) =====
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search products...';
searchInput.style.cssText = `
    width: 300px;
    padding: 0.75rem;
    margin: 1rem auto;
    display: block;
    border: 2px solid #3498db;
    border-radius: 5px;
    font-size: 1rem;
`;

document.querySelector('.products-section').insertBefore(searchInput, productsGrid);

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = query === '' 
        ? products 
        : products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query)
        );
    
    productsGrid.innerHTML = '';
    if (filtered.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #95a5a6;">No products found</p>';
    } else {
        filtered.forEach(product => {
            productsGrid.appendChild(createProductCard(product));
        });
    }
});

// ===== Dark Mode Toggle (Bonus Feature) =====
const darkModeBtn = document.createElement('button');
darkModeBtn.innerHTML = '🌙 Dark Mode';
darkModeBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 0.75rem 1.5rem;
    background-color: #2c3e50;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 600;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(darkModeBtn);

let isDarkMode = localStorage.getItem('darkMode') === 'true';

function initDarkMode() {
    if (isDarkMode) {
        enableDarkMode();
    }
}

function enableDarkMode() {
    isDarkMode = true;
    document.body.style.backgroundColor = '#1a1a1a';
    document.body.style.color = '#ecf0f1';
    
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.backgroundColor = '#2c3e50';
        card.style.color = '#ecf0f1';
    });
    
    document.querySelectorAll('.cart-section').forEach(section => {
        section.style.backgroundColor = '#2c3e50';
        section.style.color = '#ecf0f1';
    });
    
    darkModeBtn.innerHTML = '☀️ Light Mode';
    localStorage.setItem('darkMode', 'true');
}

function disableDarkMode() {
    isDarkMode = false;
    document.body.style.backgroundColor = '#f8f9fa';
    document.body.style.color = '#2c3e50';
    
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.backgroundColor = 'white';
        card.style.color = '#2c3e50';
    });
    
    document.querySelectorAll('.cart-section').forEach(section => {
        section.style.backgroundColor = 'white';
        section.style.color = '#2c3e50';
    });
    
    darkModeBtn.innerHTML = '🌙 Dark Mode';
    localStorage.setItem('darkMode', 'false');
}

darkModeBtn.addEventListener('click', () => {
    if (isDarkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

initDarkMode();
