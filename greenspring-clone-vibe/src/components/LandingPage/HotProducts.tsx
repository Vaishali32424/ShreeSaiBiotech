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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch("/hotProducts.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading hotProducts.json:", err));
  }, []);

  /** Dynamically try multiple image extensions */
  const getProductImage = (name: string, category: string) => {
    if (!name) {
      return "https://via.placeholder.com/400x300.png?text=No+Image";
    }
    const cleanName = name.replace(/<\/?[^>]+(>|$)/g, "").trim();
  const imagePath = `/assets/Hot-products-images/${encodeURIComponent(cleanName)}.png`; // Assuming .png, adjust if needed
    return imagePath;
  };

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
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
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
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-green-700 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={getProductImage(product.name)}
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
                <p className="text-sm text-gray-600 mt-1 flex-grow line-clamp-3">
                  {product.ParagraphDescription}
                </p>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="mt-2 inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  View More
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

      {/* Dialog Modal */}
      {selectedProduct && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl relative overflow-hidden animate-fadeIn flex flex-col max-h-[90vh]">
    <button
      onClick={() => setSelectedProduct(null)}
      className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition bg-slate-50 p-2 rounded-full font-extrabold" 
    >
      ✕
    </button>

    {/* Scrollable section */}
    <div className="overflow-y-auto p-8 flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Product Image */}
        <div className="w-full">
          <img
            src={getProductImage(selectedProduct.name)}
            alt={selectedProduct.name}
            className="w-full h-80 object-cover rounded-lg shadow-md"
            loading="lazy"
            onError={handleImageError}
          />
        </div>

        {/* Right: Product Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {selectedProduct.name}
          </h2>

          <div className="space-y-4 text-gray-700">
            {selectedProduct.TableDescription && (
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: selectedProduct.TableDescription,
                }}
              />
            )}

            {selectedProduct.ParagraphDescription && (
              <p className="text-gray-700 leading-relaxed">
                {selectedProduct.ParagraphDescription}
              </p>
            )}

            {selectedProduct.Description && (
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: selectedProduct.Description,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Sticky footer */}
    <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end">
      <a
        href={`https://wa.me/+918989496905?text=I%20want%20to%20buy%20${encodeURIComponent(
          selectedProduct.name
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
      >
        Buy Now
      </a>
    </div>
  </div>
</div>


      )}
    </section>
  );
};

export default HotProducts;
