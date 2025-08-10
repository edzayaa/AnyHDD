import './index.css'
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const getPageNumbers = (current: number, total: number) => {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    pages.push(1);

    if (current > 4) {
        pages.push('...');
    }

    const start = Math.max(2, current - 2);
    const end = Math.min(total - 1, current + 3);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < total - 1) {
        pages.push('...');
    }

    pages.push(total);

    return pages;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = getPageNumbers(currentPage, totalPages);

    return (
        <div className="pagination">
            <button className="prev-button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                <img src="/img/prev-arrow.svg" alt="Previous" />
            </button>
            {pageNumbers.map((page, idx) =>
                typeof page === 'number' ? (
                    <button
                        key={page}
                        className={`page-button ${currentPage === page ? 'active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page < 10 ? `0${page}` : page}
                    </button>
                ) : (
                    <span key={`ellipsis-${idx}`} className="ellipsis">...</span>
                )
            )}
            <button className="next-button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                <img src="/img/next-arrow.svg" alt="Next" />
            </button>
        </div>
    );
};

export default Pagination;
