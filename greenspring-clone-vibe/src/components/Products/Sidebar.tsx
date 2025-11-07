import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";

export default function Sidebar({ categories }) {
  const [openCategory, setOpenCategory] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ added to fix use of location.pathname

  // Toggle open/close only when clicking the icon
  const toggleCategory = (category, e) => {
    e.stopPropagation(); // prevent NavLink navigation
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  // ✅ moved function below location hook
  const isCategoryActive = (category) => {
    const encoded = encodeURIComponent(category);
    return location.pathname.includes(`/products/category/${encoded}`);
  };

  return (
<aside className="text-white h-[calc(100vh-8rem)] overflow-y-auto pr-2 sidebar">

      <h3 className="text-2xl font-semibold mb-5 text-white pb-2">
        Categories
      </h3>

      <ul className="space-y-3 ">
{Object.entries(categories || {})?.map(([category, products]) => {
          const isActive = isCategoryActive(category);
          const isOpen = openCategory === category;

          return (
            <li key={category}>
              <div className="flex items-center justify-between">
                {/* Category Name → navigates on click */}
                <button
                  onClick={() =>
                    navigate(
                      `/products/category/${encodeURIComponent(category)}`
                    )
                  }
                  className={`text-left font-medium transition-colors duration-200 ${
                    isActive || isOpen
                      ? "text-white font-semibold"
                      : "text-black hover:text-white"
                  }`}
                >
                  {category}
                </button>

                {/* Drop Icon → toggles list */}
                <button
                  onClick={(e) => toggleCategory(category, e)}
                  className="p-1"
                >
                  {openCategory === category ? (
                    <IoChevronDown className="text-black text-lg transition-transform duration-200" />
                  ) : (
                    <IoChevronForward className="text-white text-lg transition-transform duration-200" />
                  )}
                </button>
              </div>

              {/* Nested Products (collapsible) */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openCategory === category ? "max-h-96 mt-2" : "max-h-0"
                }`}
              >
                <ul className="ml-4 space-y-1 border-l border-slate-300 pl-4">
                  {products?.map((product) => (
                    <li key={product.id}>
                      <NavLink
                        to={`/products/product/${product.id}`}
                        className={({ isActive }) =>
                          `block text-sm py-1 transition-colors duration-200 ${
                            isActive
                              ? "text-white font-semibold"
                              : "text-black hover:text-white"
                          }`
                        }
                      >
                        {product.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
    
  );
}
