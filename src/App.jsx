import "./App.css";
import { useEffect, useState, useMemo } from "react";
import ProductTable from "./components/ProductTable.jsx";
import Pagination from "./components/Pagination.jsx";

export default function App() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    useEffect(() => {
        fetch("/output.json")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    const parseNumeric = (key, value) => {
        if (!value) return 0;
        const numericFields = ["price", "width", "length", "depth"];
        if (numericFields.includes(key)) {
            return parseFloat(String(value).replace(/[$,]/g, "")) || 0;
        }
        return value;
    };

    const getNested = (obj, path) =>
        path.split(".").reduce((acc, k) => acc?.[k], obj) || "";

    const flattenValues = (obj) => {
        let result = "";

        const recurse = (value) => {
            if (value == null) return;

            if (typeof value === "object") {
                Object.values(value).forEach(v => recurse(v));
            } else {
                result += " " + String(value).toLowerCase();
            }
        };

        recurse(obj);
        return result;
    };

    const processedProducts = useMemo(() => {
        let filtered = products;

        if (search) {
            const lowerSearch = search.toLowerCase();
            filtered = filtered.filter(p => flattenValues(p).includes(lowerSearch));
        }

        if (sortConfig.key) {
            filtered = [...filtered].sort((a, b) => {
                let valA = parseNumeric(sortConfig.key, getNested(a, sortConfig.key));
                let valB = parseNumeric(sortConfig.key, getNested(b, sortConfig.key));

                if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
                if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [products, search, sortConfig]);

    const totalPages = Math.ceil(processedProducts.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedProducts = processedProducts.slice(startIndex, startIndex + rowsPerPage);

    const handleSort = (key) => {
        setSortConfig(prev => {
            const direction =
                prev.key === key && prev.direction === "asc" ? "desc" : "asc";
            return { key, direction };
        });

        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Product Catalog</h1>

            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearch}
                style={{ marginBottom: "10px", padding: "5px", width: "300px" }}
            />

            <ProductTable
                products={paginatedProducts}
                onSort={handleSort}
                sortConfig={sortConfig}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
