let MaximumProductPerPage = window.innerWidth <= 600 ? 20 : 60;
let MaxPagesToShow = window.innerWidth <= 600 ? 3 : 10;
let currentPage = 1;
let totalPages = Math.ceil(ProductDatabase.length / MaximumProductPerPage);


// Update the maximum number of products per page based on the screen width.
function updateMaximumProductPerPage() {
    const newValue = window.innerWidth <= 600 ? 20 : 60;
    if (MaximumProductPerPage !== newValue) {
        MaximumProductPerPage = newValue;
        search();
    }
}
function onHomePageResize() {
    if (ActivePage !== "home") {
        return;
    }
    updateMaximumProductPerPage();
    MaxPagesToShow = window.innerWidth <= 1000 ? (window.innerWidth <= 600 ? 3 : 5): 10;
    updatePagination(currentPage, totalPages, "onHomePageChange", MaxPagesToShow);
}

window.addEventListener('resize', onHomePageResize);
window.addEventListener('DOMContentLoaded', onHomePageResize);

function resetHomePageState() {
    currentPage = 1;
}

function onHomePageChange(page) {
    currentPage = page;
    search(true);
    updatePagination(currentPage, totalPages, "onHomePageChange", MaxPagesToShow);
    window.scrollTo(0, 0);
}

function HomePage() {
    const ProductCategories = Array.from(new Set(ProductDatabase.map(p => p.category))).sort();
    // Collect all category values into a string.
    const categoryOptions = ['<option value="">All</option>']
        .concat(ProductCategories.map(cat => `<option value="${cat}">${cat}</option>`)).join('');

        // Add a results count display above the results
    return String.raw`
    <div class="homepage-container homepage-container-relative">
        <button class="cart-btn cart-btn-absolute" onclick="toggleCart()">
            🛒 Cart (${cartItems.length})
        </button>
        <div class="homepage-header">
            <img src="/pia-internship-app/images/favicon.ico" class="homepage-logo" alt="Logo">
            <span class="homepage-brand">Amazon 2</span>
        </div>
        <div class="queryBar">
            <input class="idSearchInput input" id="idInput" onkeyup="search();" placeholder="Product ID">
            <input class="searchInput input" id="nameInput" onkeyup="search();" placeholder="Product Name">
            <select class="searchCategory select" id="categoryInput" name="Category" onclick="search();" style="width: 120px; font-size: 0.9em;">
                ${categoryOptions}
            </select>
            <input id="searchButton" class="search-btn" type="button" onClick="search();" value="Search">
        </div>
        <div id="resultsCount" class="results-count"></div>
        <div id="searchResults" class="homepage-results"></div>
        ${Pagination({ currentPage, totalPages, onPageChange: "onHomePageChange" })}
        <div id="cart-sidebar" class="cart-sidebar">
            ${Cart({ items: cartItems, total: cartTotal })}
        </div>
    </div>`;
}

function Product({ product }) {
    return String.raw `
    <div class="product" onClick="history.pushState(null, null, 'product/${product.id}'); router();">
        <img src="${product.imageurl}" class="productImage" alt="Product image">
        <div class="productName" id="name">${product.name}</div>
        <div class="productCategory" id="category">${product.category}</div>
        <div class="productDescription" id="description">${product.description}</div>
        <div class="productPrice product-detail-price" id="price">$${product.price}</div>
        <div class="product-actions">
            <button class="product-quick-add-btn" onClick="event.stopPropagation(); addToCart('${product.id}')">Add to Cart</button>
        </div>
    </div>`;
}

function search(keepPage) {
    let id = document.getElementById('idInput').value;
    let name = document.getElementById('nameInput').value;
    let categoryInput = document.getElementById('categoryInput').value;

    // Filter all the database based on the search inputs.
    // If the id or name inputs are empty ignore them.
    let searchResult = ProductDatabase.filter((product) => {
        return (id === "" || product.id.includes(id)) && (name === "" || product.name.toLowerCase().includes(name.toLowerCase()))
            && (categoryInput === "" || categoryInput === product.category);
    });
    if (!keepPage) {
        currentPage = 1;
    }
    totalPages = Math.ceil(searchResult.length / MaximumProductPerPage);
    updatePagination(currentPage, totalPages, "onHomePageChange", MaxPagesToShow);

    let table = document.getElementById('searchResults');
    let resultsCountDiv = document.getElementById('resultsCount');

    table.innerHTML = "";

    // Calculate the range of products being shown
    const start = searchResult.length === 0 ? 0 : ((currentPage - 1) * MaximumProductPerPage) + 1;
    const end = Math.min(currentPage * MaximumProductPerPage, searchResult.length);
    const total = searchResult.length;
    resultsCountDiv.innerText = `Showing ${start}-${end} of ${total} results`;

    for (let i = (currentPage - 1) * MaximumProductPerPage; i < (currentPage * MaximumProductPerPage) && i < searchResult.length; i++) {
        table.innerHTML += Product({ product: searchResult[i] });
    }
}