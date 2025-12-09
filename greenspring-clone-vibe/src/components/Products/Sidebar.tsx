import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";

export default function Sidebar({ categories }) {
  const [openCategory, setOpenCategory] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Toggle open/close only when clicking the icon
  const toggleCategory = (category, e) => {
    e.stopPropagation(); // prevent NavLink navigation (if NavLink were the parent)
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  const isCategoryActive = (category) => {
    const encoded = encodeURIComponent(category);
    // Uses absolute path check, which is fine if your base route is /products
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
                {/* 💡 FIX: Replaced <button> with NavLink for proper routing and active state */}
                <NavLink
                  to={`/products/category/${encodeURIComponent(category)}`}
                  className={({ isActive: isCurrentActive }) =>
                    `flex-1 text-left font-medium transition-colors duration-200 ${
                      isCurrentActive || isOpen
                        ? "text-white font-semibold"
                        : "text-black hover:text-white"
                    }`
                  }
                >
                  {category}
                </NavLink>

                {/* Drop Icon → toggles list */}
                <button
                  onClick={(e) => toggleCategory(category, e)}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
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
                  openCategory === category ? " mt-2" : "max-h-0"
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