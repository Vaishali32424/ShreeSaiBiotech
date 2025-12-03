import { Link, useParams } from "react-router-dom";
import React, { useState, useMemo, useEffect } from "react";

const PRODUCTS_PER_PAGE = 12;

export default function ProductGrid({ productsData, categories, isSearchMode, searchTerm }) {
    const { categoryId } = useParams();

    let selectedCategoryName;
    if (isSearchMode && searchTerm) {
        selectedCategoryName = `Search Results for "${searchTerm}"`;
    } else if (categoryId) {
        selectedCategoryName = decodeURIComponent(categoryId);
    } else {
        selectedCategoryName = categories[0] || 'All Products';
    }

    const allProducts = productsData ? productsData[selectedCategoryName] || [] : [];
    
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategoryName]);

    const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
    
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        return allProducts.slice(startIndex, endIndex);
    }, [allProducts, currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    // Function to generate page numbers to display, similar to common pagination UIs
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 3; // Number of page buttons to show around the current page
        
        // Always show the first page if it's not within the maxPagesToShow range
        if (totalPages > 1 && currentPage > maxPagesToShow - 1 && totalPages > maxPagesToShow) {
            pageNumbers.push(1);
            if (currentPage > maxPagesToShow) { // Add ellipsis if there's a gap
                pageNumbers.push('...');
            }
        }

        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, currentPage + Math.floor(maxPagesToShow / 2));

        // Adjust start and end to ensure maxPagesToShow are always visible if possible
        if (endPage - startPage + 1 < maxPagesToShow) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
            } else if (endPage === totalPages) {
                startPage = Math.max(1, endPage - maxPagesToShow + 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        // Always show the last page if it's not within the maxPagesToShow range
        if (totalPages > 1 && currentPage < totalPages - Math.floor(maxPagesToShow / 2) && totalPages > maxPagesToShow) {
            if (currentPage < totalPages - maxPagesToShow + 1) { // Add ellipsis if there's a gap
                pageNumbers.push('...');
            }
            if (!pageNumbers.includes(totalPages)) { // Ensure last page is only added once
                 pageNumbers.push(totalPages);
            }
        }


        return pageNumbers.filter((value, index, self) => 
            self.indexOf(value) === index // Remove duplicates (e.g., from ellipsis logic)
        ).sort((a, b) => {
            if (a === '...') return 1;
            if (b === '...') return -1;
            return a - b;
        });
    };


    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        const src = img.src;
        const placeholder =
            "https://via.placeholder.com/400x300.png?text=No+Image";

        if (src.endsWith(".png")) img.src = src.replace(".png", ".jpg");
        else if (src.endsWith(".jpg")) img.src = src.replace(".jpg", ".jpeg");
        else if (src.endsWith(".jpeg")) img.src = src.replace(".jpeg", ".svg");
        else if (src.endsWith(".avif")) img.src = src.replace(".avif", ".jpg");
        else if (src.endsWith(".webp")) img.src = src.replace(".webp", ".jpg");
        else img.src = placeholder;

        img.onerror = null;
    };


    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">{selectedCategoryName} </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {paginatedProducts.map((p) => (
                    <div key={p.id} className="bg-white rounded-lg border-2 border-gray-200 shadow-xl p-4 flex flex-col">
                        <img
                            src={p.image_url}
                            alt={p.name}
                            className="w-full h-56 object-fit transform group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            onError={handleImageError}
                        />
                        <h2 className="mt-2 text-lg font-semibold flex-grow">{p.name}</h2>
                        <Link
                            to={`/products/product/${p.id}`}
                            className="text-green-700 hover:underline mt-2 self-start"
                        >
                            Read More
                        </Link>
                    </div>
                ))}
            </div>

            {/* NEW PAGINATION CONTROLS */}
            {allProducts.length > PRODUCTS_PER_PAGE && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                    <button
                        onClick={handleFirstPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 border rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                        First
                    </button>

                    {getPageNumbers().map((pageNumber, index) => (
                        pageNumber === '...' ? (
                            <span key={index} className="px-2 py-2 text-gray-700">...</span>
                        ) : (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`px-4 py-2 border rounded-md ${currentPage === pageNumber ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                                {pageNumber}
                            </button>
                        )
                    ))}

                    <button
                        onClick={handleLastPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 border rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                        Last
                    </button>
                </div>
            )}
        </div>
    );
}