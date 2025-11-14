export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="pagination-container">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>

            <span style={{ margin: "0 10px" }}>
                Page {currentPage} of {totalPages}
            </span>

            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
}
