
const Routes = [
    {
        path: /^\/$/, // Path contains just / character meaning its the root page.
        page: 'home'
    },
    {
        path: /^\/product\/([a-zA-Z0-9]*)$/, // Path contains /product/[product id] so its a product page
        page: 'product'
    }
]

function router() {
    resetHomePageState();
    resetProductPageState();

    let regexMatch = Routes.find(route => route.path.test(location.pathname));
    const root = document.getElementById('root');
    if (regexMatch) {
        if (regexMatch.page === 'home') {
            root.innerHTML = HomePage();
            search();
            return;
        } else if (regexMatch.page === 'product') {
            const productId = regexMatch.path.exec(location.pathname)[1];
            const product = ProductDatabase.find(product => product.id === productId);
            if (product) {
                root.innerHTML = ProductPage({ product });
                return;
            }
        }
    }

    // Could not find a match.
    root.innerHTML = notFoundPage();
}

document.addEventListener("DOMContentLoaded", router);
window.addEventListener('popstate', router);