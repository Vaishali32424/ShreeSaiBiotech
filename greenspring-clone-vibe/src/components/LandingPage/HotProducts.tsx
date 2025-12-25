import { getHotProducts } from "@/Services/Productscrud";
import React, { useEffect, useState } from "react";

type Product = {
  id: string | number;
  name: string;
  ParagraphDescription?: string;
  TableDescription?: string;
  Description?: string;
};

const HotProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hotProducts, setHotProducts] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  useEffect(() => {
    const fetchHotProducts = async () => {
      try {
        const data = await getHotProducts(); 
        setHotProducts(data?.data || []);
      } catch (err) {
        console.error("Error fetching hot products:", err);
      }
    };

    fetchHotProducts();
  }, []);

 
  /** Handle multiple file extension fallbacks */
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

    // Prevent infinite loops
    img.onerror = null;
  };

  return (
    <section className="pb-20  bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mt-4 mb-14">
          <p className="text-green-600 font-semibold uppercase tracking-widest">
            Hot Sell
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-2">
            Trending Hot Products
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Discover our best-selling products, hand-picked for quality and
            performance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {hotProducts?.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-green-700 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                {/* <p className="text-sm text-gray-600 mt-1 flex-grow line-clamp-3">
                  {product.ParagraphDescription}
                </p> */}
                <button
                  onClick={() => window.location.href = `/products/product/${product.id}`}
                  className="mt-2 inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  Read  More
                  <svg
                    className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

   
    </section>
  );
};

export default HotProducts;
