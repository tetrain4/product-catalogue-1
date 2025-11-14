const getValue = (obj, path) =>
    path.split(".").reduce((acc, key) => acc?.[key], obj) || "-";

export default function ProductTable({ products, onSort, sortConfig }) {
    if (!products || products.length === 0) return <p>No products available</p>;

    const columns = [
        { header: "SKU", accessor: "sku" },
        { header: "Vendor", accessor: "vendor.name" },
        { header: "Category", accessor: "category" },
        { header: "Price", accessor: "price" },
        { header: "Width", accessor: "width" },
        { header: "Length", accessor: "length" },
        { header: "Description", accessor: "description" }
    ];

    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) return "";
        return sortConfig.direction === "asc" ? " ▲" : " ▼";
    };

    return (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%", marginBottom: "10px" }}>
            <thead>
            <tr>
                {columns.map(col => (
                    <th
                        key={col.accessor}
                        onClick={() => onSort(col.accessor)}
                        style={{ cursor: "pointer" }}
                    >
                        {col.header}{getSortIndicator(col.accessor)}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {products.map((product, idx) => (
                <tr key={idx}>
                    {columns.map(col => (
                        <td key={col.accessor}>{getValue(product, col.accessor)}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}
