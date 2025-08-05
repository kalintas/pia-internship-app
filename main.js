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

    searchResult.forEach((product) => {
        let createDiv = (value, id) => {
            let div = document.createElement("div");
            let divText = document.createTextNode(value);
            div.appendChild(divText);
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

        table.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", function (e) {
    search();
});