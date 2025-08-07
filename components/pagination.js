

function Pagination({ currentPage, totalPages, onPageChange, maxPagesToShow = 10 }) {
    let pageNumbers = "";
    let startPage, endPage;
    console.log(maxPagesToShow)
    if (totalPages <= maxPagesToShow) {
        // We can simply put every page number to the component.
        startPage = 1;
        endPage = totalPages;
    } else {
        const numMiddle = maxPagesToShow - 2; // slots between first and last
        let left = Math.max(2, currentPage - Math.floor(numMiddle / 2));
        let right = left + numMiddle - 1;
        if (right >= totalPages) {
            right = totalPages - 1;
            left = right - numMiddle + 1;
        }
        startPage = left;
        endPage = right;
    }

    // First page
    if (startPage > 1) {
        pageNumbers += `<button class="pagination-btn${currentPage === 1 ? ' active' : ''}" onclick="${onPageChange}(1)">1</button>`;
    }

    // Ellipsis before window
    if (startPage > 2) {
        pageNumbers += `<span class="pagination-ellipsis">...</span>`;
    }

    // Put the page numbers in the middle
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers += `<button class="pagination-btn${i === currentPage ? ' active' : ''}" onclick="${onPageChange}(${i})">${i}</button>`;
    }

    // Ellipsis after window
    if (endPage < totalPages - 1) {
        pageNumbers += `<span class="pagination-ellipsis">...</span>`;
    }

    // Last page
    if (endPage < totalPages) {
        pageNumbers += `<button class="pagination-btn${currentPage === totalPages ? ' active' : ''}" onclick="${onPageChange}(${totalPages})">${totalPages}</button>`;
    }

    return String.raw`
<div class="pagination" id="pagination">
    <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="${onPageChange}(1)"><<</button>
    <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="${onPageChange}(${currentPage - 1})"><</button>
    ${pageNumbers}
    <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="${onPageChange}(${currentPage + 1})">></button>
    <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="${onPageChange}(${totalPages})">>></button>
</div>`;

}

function updatePagination(currentPage, totalPages, onPageChange, maxPagesToShow = 10) {
    const pagination = document.getElementById('pagination');
    pagination.outerHTML = Pagination({ currentPage, totalPages, onPageChange, maxPagesToShow });
}