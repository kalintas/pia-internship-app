

function HomePage() {
    const ProductCategories = Array.from(new Set(ProductDatabase.map(p => p.category))).sort();
    // Collect all category values into a string.
    const categoryOptions = ['<option value="">All</option>']
        .concat(ProductCategories.map(cat => `<option value="${cat}">${cat}</option>`)).join('');
    
    return String.raw`
    <div class="homepage-container">
        <div class="homepage-header">
            <img src="/images/favicon.ico" class="homepage-logo" alt="Logo">
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
        <div id="searchResults" class="homepage-results"></div>
    </div>`;
}

function Product(product) {
    return String.raw `
    <div class="product">
        <img src="${product.imageurl}" class="productImage" onClick="history.pushState(null, null, '/product/${product.id}'); router();">
        <div class="productName" id="name">${product.name}</div>
        <div class="productCategory" id="category">${product.category}</div>
        <div class="productDescription" id="description">${product.description}</div>
        <div class="productPrice product-detail-price" id="price">$${product.price}</div>
    </div>`;
}

function search() {
    let id = document.getElementById('idInput').value;
    let name = document.getElementById('nameInput').value;
    let categoryInput = document.getElementById('categoryInput').value;

    // Filter all the database based on the search inputs.
    // If the id or name inputs are empty ignore them.
    let searchResult = ProductDatabase.filter((product) => {
        return (id === "" || product.id === id) && (name === "" || product.name.toLowerCase().includes(name.toLowerCase()))
            && (categoryInput === "" || categoryInput === product.category);
    });

    let table = document.getElementById('searchResults');

    table.innerHTML = "";

    // Iterate all the found products and create a div for each one of them.
    searchResult.forEach((product) => {
        table.innerHTML += Product(product);
    });
}