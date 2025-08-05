

function Pagination({ currentPage, totalPages, onPageChange }) {

    let pageNumbers = "";
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers += `<button class="pagination-btn${i === currentPage ? ' active' : ''}" onclick=\"${onPageChange}(${i})\">${i}</button>`;
    }

    return String.raw`
    <div class="pagination" id="pagination">
        <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick=\"${onPageChange}(1)\"><<</button>
        <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick=\"${onPageChange}(${currentPage - 1})\"><</button>
        ${pageNumbers}
        <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick=\"${onPageChange}(${currentPage + 1})\">></button>
        <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick=\"${onPageChange}(${totalPages})\">>></button>
    </div>`;
}

function updatePagination(currentPage, totalPages, onPageChange) {
    const pagination = document.getElementById('pagination');
    pagination.outerHTML = Pagination({ currentPage, totalPages, onPageChange });
}