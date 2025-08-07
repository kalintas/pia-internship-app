const MaxSuggestionsPerPage = 10;
let currentSuggestionsPage = 1;
let totalSuggestionsPages = 0;
let currentProduct = null;
let suggestionSwipeTimeout = null;
const ProductPageMaxPagesToShow = 4;

function resetProductPageState() {
    currentSuggestionsPage = 1;
    totalSuggestionsPages = 0;
    currentProduct = null;
    if (suggestionSwipeTimeout) {
        clearInterval(suggestionSwipeTimeout);
        suggestionSwipeTimeout = null;
    }
}

function onSuggestionsPageChange(page) {
    if (!currentProduct) {
        return;
    }
    currentSuggestionsPage = page;
    updatePagination(currentSuggestionsPage, totalSuggestionsPages, "onSuggestionsPageChange", ProductPageMaxPagesToShow);
    let suggestionsBox = document.getElementById("suggestions-box");
    suggestionsBox.outerHTML = Suggestions({ product: currentProduct });

    if (suggestionSwipeTimeout) {
        clearTimeout(suggestionSwipeTimeout);
    }
    setSuggestionSwipeTimeout();
}

function setSuggestionSwipeTimeout() {
    suggestionSwipeTimeout = setTimeout(() => {
        onSuggestionsPageChange(currentSuggestionsPage < totalSuggestionsPages ? currentSuggestionsPage + 1 : 1);
        setSuggestionSwipeTimeout();
    }, 10000);
}

function Suggestions({ product }) {

    const currentId = product.id;
    const currentCategory = product.category;
    const similar = ProductDatabase.filter(p => p.category === currentCategory && p.id !== currentId);
    const totalPages = Math.ceil(similar.length / MaxSuggestionsPerPage) || 1;
    const startIdx = (currentSuggestionsPage - 1) * MaxSuggestionsPerPage;
    const endIdx = startIdx + MaxSuggestionsPerPage;
    const pageItems = similar.slice(startIdx, endIdx);

    totalSuggestionsPages = Math.ceil(similar.length / MaxSuggestionsPerPage) || 1;

    const list = pageItems.map(p => `
        <div class="suggestion-item">
            <img src='${p.imageurl}' class="suggestion-img" />
            <div class="suggestion-info">
                <div class="suggestion-name">${p.name}</div>
                <div class="suggestion-price">$${p.price}</div>
            </div>
            <button class="suggestion-view-btn" onclick="history.pushState(null, null, '/product/${p.id}'); router();">View</button>
        </div>
    `).join('');
    const pagination = Pagination({ currentPage: currentSuggestionsPage, totalPages, onPageChange: "onSuggestionsPageChange", maxPagesToShow: ProductPageMaxPagesToShow });
    return String.raw`
    <div id="suggestions-box" class="suggestions-box">
        <div class="suggestions-title">Similar Products</div>
        <div id="suggestions-list" class="suggestions-list">
            ${list || '<div class="suggestions-empty">No similar products found.</div>'}
        </div>
        ${pagination}
    </div>
    `;
}

function ProductPage({ product }) {
    setSuggestionSwipeTimeout();
    currentProduct = product;
    return String.raw`
    <div class="product-detail-page product-detail-page-relative">
        <button class="cart-btn cart-btn-absolute" onclick="toggleCart()">🛒 Cart (${cartItems.length})</button>
        <img src="${product.imageurl}" class="product-detail-image">
        <div class="product-detail-name">${product.name}</div>
        <div class="product-detail-id">ID: ${product.id}</div>
        <div class="product-detail-category">${product.category}</div>
        <div class="product-detail-description">${product.description}</div>
        <div class="product-detail-price">$${product.price}</div>
        <button class="product-detail-add-to-cart" onclick="addToCart('${product.id}')">Add to Cart</button>
        <button class="product-detail-back" onclick="history.pushState(null, null, '../'); router();">Back to Home</button>
        <div id="cart-sidebar" class="cart-sidebar">
            ${Cart({ items: cartItems, total: cartTotal })}
        </div>
    </div>
        ${Suggestions({ product })}
    `;
}