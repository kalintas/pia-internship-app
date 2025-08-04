
function createProductDiv(product) {
    let createDiv = (value, id) => {
        let div = document.createElement("div");
        let divText = document.createTextNode(value);
        div.appendChild(divText);
        div.className = "product" + id.charAt(0).toUpperCase() + id.slice(1);
        div.id = id; 
        return div;
    };
    
    let div = document.createElement("div");
    div.className = "product";

    let image = document.createElement("img");
    image.src = product.imageurl;
    image.className = "productImage";
    div.appendChild(image);

    div.appendChild(createDiv(product.name, "name"));
    div.appendChild(createDiv(product.category, "category"));
    div.appendChild(createDiv(product.description, "description"));
    div.appendChild(createDiv(product.price, "price"));

    return div;
}

function search() {

    let name = document.getElementById('nameInput').value;
    let categoryInput = document.getElementById('categoryInput').value;

    let searchResult = ProductDatabase.filter((product) => {
        return (name === "" || product.name.toLowerCase().includes(name.toLowerCase())) && (categoryInput === "" || categoryInput === product.category);
    });

    let table = document.getElementById('searchResults');
    
    table.innerHTML = "";
   
    searchResult.forEach((product) => {
        let div = createProductDiv(product);

        div.onclick = (event) => {
            let popupBackground = document.getElementById('popupBackground');
            popupBackground.innerHTML = "";
            popupBackground.style.pointerEvents = "all";

            let productDiv = createProductDiv(product);
            productDiv.id = "popupBackgroundProduct";
            productDiv.className = "productBig";
           
            popupBackground.appendChild(productDiv);
            event.stopPropagation();
        }

        table.appendChild(div);
    });    
}

document.addEventListener("DOMContentLoaded", function(e) {
    search();
});

window.addEventListener('click', (event) => {   
    let product = document.getElementById('popupBackgroundProduct');
    if (!product) {
        return;
    }
    if (!product.contains(event.target)) {
        popupBackground.innerHTML = "";
        popupBackground.style.pointerEvents = "none";
    }
});