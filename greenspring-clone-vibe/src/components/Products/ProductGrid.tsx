import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PhoneNumberModal from "./PhoneNumberModal";

const PRODUCTS_PER_PAGE = 16;

export default function ProductGrid({
  productsData,
  categories,
  categoryMeta,
  isSearchMode,
  searchTerm,
}) {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ---------------- CATEGORY NAME ----------------
  let selectedCategoryName;
  if (isSearchMode && searchTerm) {
    selectedCategoryName = `Search Results for "${searchTerm}"`;
  } else if (categoryId) {
    selectedCategoryName = decodeURIComponent(categoryId);
  } else {
    selectedCategoryName = categories?.[0];
  }

  const allProducts = productsData?.[selectedCategoryName] || [];

  const categoryDescription =
    !isSearchMode && selectedCategoryName
      ? categoryMeta?.[selectedCategoryName]?.description
      : "";

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategoryName]);

  // ---------------- PAGINATION ----------------
  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return allProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [allProducts, currentPage]);

 
  // ---------------- READ MORE HANDLER ----------------
  const handleReadMoreClick = (product) => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (hasVisited === "true") {
      navigate(`/products/product/${product.id}`);
    } else {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  // ---------------- MODAL SUBMIT ----------------
  const handleModalSubmit = () => {
    localStorage.setItem("hasVisited", "true");
    setIsModalOpen(false);

    if (selectedProduct) {
      navigate(`/products/product/${selectedProduct.id}`);
    }
  };

  // ---------------- PAGE NUMBERS ----------------
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  };

  // ---------------- RENDER ----------------
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{selectedCategoryName}</h1>

      {categoryDescription && (
        <div className="mb-6 p-4 bg-gray-50 border rounded-lg">
          <div
            className="prose max-w-none prose-green"
            dangerouslySetInnerHTML={{ __html: categoryDescription }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white border rounded-lg shadow p-4 flex flex-col"
          >
            <img
              src={p.image_url}
              alt={p.name}
              className="h-56 object-contain"
                            loading="lazy"

            />
            <h2 className="mt-2 font-semibold">{p.name}</h2>
            <button
              onClick={() => handleReadMoreClick(p)}
              className="text-green-700 hover:underline mt-2 self-start"
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {getPageNumbers().map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-4 py-2 border rounded ${
                currentPage === num
                  ? "bg-green-600 text-white"
                  : "bg-white"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}

      {/* PHONE MODAL */}
      <PhoneNumberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        productName={selectedProduct?.name || ""}
      />
    </div>
  );
}
