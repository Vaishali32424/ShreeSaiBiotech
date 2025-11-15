
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from 'react';



export default function HotProductsSidebar() {
    const [hotProducts, setHotProducts] = useState([]);
      useEffect(() => {
        fetch("/hotProducts.json")
          .then((res) => res.json())
          .then((data) => setHotProducts(data))
          .catch((err) => console.error("Error loading hotProducts.json:", err));
      }, []);
  return (
    <aside className="w-full text-gray-800 sidebar mt-10">

        <h3 className="text-lg font-semibold mb-4 text-orange-600 border-b pb-2 border-orange-400">
            🔥 Hot Selling Products
        </h3>

        <ul className="space-y-3">
            {hotProducts.slice(0, 4).map((product) => (
                <li key={product.id} className="pb-2 border-b last:border-b-0 border-gray-100">

                    <NavLink
                        to={`/products/product/${product.id}`} 
                        className="flex items-center gap-3 hover:bg-gray-50 transition p-1 rounded"
                    >

                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-[70px] h-[55px] object-cover rounded-sm flex-shrink-0"
                            onError={(e) => { 
                                e.currentTarget.src = "https://via.placeholder.com/70x55.png?text=Product";
                            }}
                        />

                        <div className="flex-1">
                            <p className="text-[14px] font-semibold text-gray-800 leading-tight line-clamp-2">
                                {product.name}
                            </p>
                         
                        </div>

                    </NavLink>
                </li>
            ))}
        </ul>
    </aside>
  );
}