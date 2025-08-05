const MaxSuggestionsPerPage = 10;
let currentSuggestionsPage = 1;
let totalSuggestionsPages = 0;
let currentProduct = null;
let suggestionSwipeTimeout = null;

function resetProductPageState() {
    currentSuggestionsPage = 1;
    totalSuggestionsPages = 0;
    currentProduct = null;
    suggestionSwipeTimeout = null;
}

function onSuggestionsPageChange(page) {
    currentSuggestionsPage = page;
    updatePagination(currentSuggestionsPage, totalSuggestionsPages, "onSuggestionsPageChange");
    let suggestionsBox = document.getElementById("suggestions-box");
    suggestionsBox.outerHTML = Suggestions({ product: currentProduct });

    if (suggestionSwipeTimeout) {
        clearTimeout(suggestionSwipeTimeout);
    }
    setSuggestionSwipeTimeout();
}

function setSuggestionSwipeTimeout() {
    suggestionSwipeTimeout = setTimeout(() => {
        if (currentSuggestionsPage < totalSuggestionsPages) {
            onSuggestionsPageChange(currentSuggestionsPage + 1);
        }
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
        <div style='display: flex; align-items: center; margin-bottom: 10px;'>
            <img src='${p.imageurl}' style='width: 48px; height: 48px; object-fit: cover; border-radius: 6px; margin-right: 10px;' />
            <div style='flex: 1;'>
                <div style='font-weight: 500;'>${p.name}</div>
                <div style='font-size: 0.95em; color: #888;'>$${p.price}</div>
            </div>
            <button style='margin-left: 8px; padding: 4px 10px; font-size: 0.95em;' onclick="history.pushState(null, null, '/product/${p.id}'); router();">View</button>
        </div>
    `).join('');
    const pagination = Pagination({ currentPage: currentSuggestionsPage, totalPages, onPageChange: "onSuggestionsPageChange" });
    return String.raw`
    <div id="suggestions-box" style="position: fixed; bottom: 24px; right: 24px; width: 400px; background: white; border: 1px solid #ddd; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.12); padding: 28px 28px 20px 28px; z-index: 1000;">
        <div style="font-weight: bold; font-size: 1.25em; margin-bottom: 16px;">Similar Products</div>
        <div id="suggestions-list" style="font-size: 1.08em;">
            ${list || '<div style=\"color: #888;\">No similar products found.</div>'}
        </div>
        ${pagination}
    </div>
    `;
}

function ProductPage({ product }) {
    setSuggestionSwipeTimeout();
    currentProduct = product;
    return String.raw`
    <div class="product-detail-page">
        <img src="${product.imageurl}" class="product-detail-image">
        <div class="product-detail-name">${product.name}</div>
        <div class="product-detail-id">ID: ${product.id}</div>
        <div class="product-detail-category">${product.category}</div>
        <div class="product-detail-description">${product.description}</div>
        <div class="product-detail-price">$${product.price}</div>
        <button class="product-detail-add-to-cart" onclick="addToCart('${product.id}')">Add to Cart</button>
        <button class="product-detail-back" style="margin-top: 12px; font-weight: bold; padding: 10px 28px;" onclick="history.pushState(null, null, '/'); router();">Back to Home</button>
    </div>
        ${Suggestions({ product })}
    `;
}
