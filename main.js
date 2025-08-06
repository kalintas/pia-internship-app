
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
    let path;
    // Path might include a query which is a part of the SPA implementation in github pages.
    if (location.search.startsWith('?/')) {
        // So we first remove the query and clean up the url
        path = location.search.slice(2).split('&')[0];
        path = '/' + path.replace(/^\//, ''); // Ensure leading slash
        
        const newUrl = '/pia-internship-app' + path + location.hash;
        history.replaceState(null, '', newUrl);
    } else {
        path = location.pathname.replace('/pia-internship-app', '');
        if (path === "") {
            path = '/';
        }
    }
    let regexMatch = Routes.find(route => route.path.test(path));
    const root = document.getElementById('root');
        if (regexMatch) {
        if (regexMatch.page === 'home') {
            root.innerHTML = HomePage();
            search();
            return;
        } else if (regexMatch.page === 'product') {
            const productId = regexMatch.path.exec(path)[1];
            const product = ProductDatabase.find(product => product.id === productId);
            if (product) {
                root.innerHTML = ProductPage({ product });
                return;
            }
        }
    }

    // Could not find a match.
    root.innerHTML = NotFoundPage();
}

document.addEventListener("DOMContentLoaded", router);
window.addEventListener('popstate', router);