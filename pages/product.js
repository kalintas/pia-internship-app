function ProductPage(product) {
    return String.raw`
    <div class="product-detail-page">
        <img src="${product.imageurl}" class="product-detail-image">
        <div class="product-detail-name">${product.name}</div>
        <div class="product-detail-id">ID: ${product.id}</div>
        <div class="product-detail-category">${product.category}</div>
        <div class="product-detail-description">${product.description}</div>
        <div class="product-detail-price">$${product.price}</div>
        <button class="product-detail-add-to-cart" onclick="addToCart('${product.id}')">Add to Cart</button>
        <button class="product-detail-back" onclick="history.pushState(null, null, '/'); router();">Back to Home</button>
    </div>`;
}
// Add a stub for addToCart for now
function addToCart(productId) {
    alert('Added product ' + productId + ' to cart!');
}