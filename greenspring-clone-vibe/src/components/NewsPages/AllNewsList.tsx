import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";

const PRODUCTS_PER_PAGE = 5;

const AllNewsList = ({ newsList = [] }) => {

  const [currentPage, setCurrentPage] = useState<number>(1);

  if (!newsList || newsList.length === 0) {
    return (
      <div className="p-8 text-center text-xl text-gray-500">
        No news articles found in this category.
      </div>
    );
  }

  const totalPages = Math.ceil(newsList.length / PRODUCTS_PER_PAGE);

  // Pagination Slice Logic
  const pageData = newsList.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const getSnippet = (htmlString: string, wordLimit: number = 50) => {
    if (!htmlString) return '';
    const plainText = htmlString.replace(/<[^>]*>/g, '');
    const words = plainText.trim().split(/\s+/);
    if (words?.length > wordLimit) {
      return words?.slice(0, wordLimit)?.join(' ') + '...';
    }
    return plainText;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxToShow = 5;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxToShow - 1);

    if (end - start < maxToShow - 1) {
      start = Math.max(1, end - maxToShow + 1);
    }

    if (start > 1) pages.push(1, "...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) pages.push("...", totalPages);

    return pages;
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 border-b border-green-600 pb-2">
        Latest News & Updates
      </h1>

      {/* Article Listing */}
      <div className="space-y-6">
        {pageData?.map((article: any) => (
          <div
            key={article.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group flex flex-col md:flex-row"
          >
            <div className='md:w-1/4 w-full h-48 md:h-auto overflow-hidden flex-shrink-0'>
              <Link to={`/news/${article.id}`}>
                <img
                  src={article.image_url}
                  alt={article.news_title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </Link>
            </div>

            <div className="p-4 md:p-6 flex-1 flex flex-col justify-start text-left">
              {/* Date */}
              <div className="mb-2">
                <span className="text-sm text-gray-500 flex items-center mb-1">
                  <i className="far fa-calendar-alt mr-2 text-green-600"></i>
                  {article.date}
                </span>
              </div>

              {/* Title */}
              <Link to={`/news/${article.id}`}>
                <h2 className="text-xl font-bold text-gray-800 mt-2 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
                  {article.news_title}
                </h2>
              </Link>

              {/* Short Description */}
              <p className="text-sm text-gray-600 my-2 line-clamp-2">
                {getSnippet(article.long_description, 50)}
              </p>

              {/* Read More */}
              <div className="mt-auto">
                <Link
                  to={`detail/${article.id}`}
                  className="inline-flex items-center text-green-700 font-semibold hover:text-green-800 transition-colors"
                >
                  Read More <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {newsList.length > PRODUCTS_PER_PAGE && (
        <div className="flex justify-center items-center space-x-2 mt-8">

          {/* First Page */}
          <button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-md ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            First
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((pageNumber, index) =>
            pageNumber === '...' ? (
              <span key={index} className="px-2 py-2 text-gray-700">...</span>
            ) : (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber as number)}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === pageNumber
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {pageNumber}
              </button>
            )
          )}

          {/* Last Page */}
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
};

export default AllNewsList;