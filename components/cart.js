// Cart state management
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let cartTotal = 0;
let cartVisible = false;

function updateCartTotal() {
    cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function toggleCart() {
    cartVisible = !cartVisible;
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        if (cartVisible) {
            cartSidebar.style.display = 'block';
            setTimeout(() => {
                cartSidebar.style.left = '0';
            }, 10);
        } else {
            cartSidebar.style.left = '-400px';
            setTimeout(() => {
                cartSidebar.style.display = 'none';
            }, 300);
        }
    }
}

function addToCart(productId) {
    const product = ProductDatabase.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imageurl: product.imageurl,
            category: product.category,
            quantity: 1
        });
    }
    updateCartTotal();
    updateCartDisplay();
    updateCartButton();
    
    // Show notification
    showCartNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCartTotal();
    updateCartDisplay();
    updateCartButton();
}

function updateQuantity(productId, newQuantity) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartTotal();
            updateCartDisplay();
            updateCartButton();
        }
    }
}

function clearCart() {
    cartItems = [];
    updateCartTotal();
    updateCartDisplay();
    updateCartButton();
}

function updateCartDisplay() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        cartSidebar.innerHTML = Cart({ items: cartItems, total: cartTotal });
    }
}

function updateCartButton() {
    const cartBtns = document.querySelectorAll('.cart-btn');
    cartBtns.forEach(btn => {
        btn.innerHTML = `🛒 Cart (${cartItems.length})`;
    });
}

function Cart({ items = cartItems, total = cartTotal }) {
    if (items.length === 0) {
        return String.raw`
        <div class="cart-container" id="cart-container">
            <div class="cart-header">
                <h3>Shopping Cart</h3>
                <button class="cart-close-btn" onclick="toggleCart()">×</button>
            </div>
            <div class="cart-empty">
                <p>Your cart is empty</p>
                <button class="cart-continue-shopping" onclick="toggleCart();">Continue Shopping</button>
            </div>
        </div>`;
    }

    const cartItemsHtml = items.map(item => `
        <div class="cart-item">
            <img src="${item.imageurl}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-category">${item.category}</p>
                <p class="cart-item-price">$${item.price}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
            </div>
            <div class="cart-item-total">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">×</button>
        </div>
    `).join('');

    return String.raw`
    <div class="cart-container" id="cart-container">
        <div class="cart-header">
            <h3>Shopping Cart</h3>
            <button class="cart-close-btn" onclick="toggleCart()">×</button>
        </div>
        <div class="cart-items">
            ${cartItemsHtml}
        </div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>Total:</span>
                <span class="cart-total-amount">$${total.toFixed(2)}</span>
            </div>
            <div class="cart-actions">
                <button class="cart-clear-btn" onclick="clearCart()">Clear Cart</button>
                <button class="cart-checkout-btn" onclick="checkout()">Checkout</button>
            </div>
        </div>
    </div>`;
}

function checkout() {
}

function showCartNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Initialize cart display when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCartTotal();
    updateCartButton();
});

// Update cart when router changes pages
function initializeCart() {
    updateCartTotal();
    updateCartButton();
    updateCartDisplay();
}
