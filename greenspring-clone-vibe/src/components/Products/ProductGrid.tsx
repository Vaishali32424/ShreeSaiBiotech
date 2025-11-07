import { Link, useParams } from "react-router-dom";

export default function ProductGrid({ productsData, categories }) {
  const { categoryId } = useParams();

  const selectedCategoryName = categoryId ? decodeURIComponent(categoryId) : categories[0];

  const products = productsData ? productsData[selectedCategoryName] || [] : [];
 /** Dynamically try multiple image extensions */
  const getProductImage = (name: string, category: string) => {
    if (!name) {
      return "https://via.placeholder.com/400x300.png?text=No+Image";
    }
    const cleanName = name.replace(/<\/?[^>]+(>|$)/g, "").trim();
  const imagePath = `/assets/All_product_images/${category}/${encodeURIComponent(cleanName)}.png`; // Assuming .png, adjust if needed
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
    <div>
      <h1 className="text-2xl font-bold mb-6">{selectedCategoryName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-lg border border-gray-200 shadow p-4 flex flex-col">
            <img
                  src={getProductImage(p.name, selectedCategoryName)}
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
    </div>
  );
}