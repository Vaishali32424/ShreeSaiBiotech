import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast } from "../ui/use-toast";

export default function ProductDetail({ productsData }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // Flatten all products with their categories
  const allProducts = productsData
    ? Object.entries(productsData).flatMap(([category, items]) =>
        items.map((item) => ({ ...item, category }))
      )
    : [];

  const product = allProducts.find((p) => p.id === productId);
  const category = product?.category || "Unknown";

  // Get product image
  const getProductImage = (name) => {
    if (!name) {
      return "https://via.placeholder.com/400x300.png?text=No+Image";
    }
    const cleanName = name.replace(/<\/?[^>]+(>|$)/g, "").trim();
    return `/assets/All_product_images/${encodeURIComponent(
      category
    )}/${encodeURIComponent(cleanName)}.png`;
  };

  // Handle multiple extension fallbacks
  const handleImageError = (e) => {
    const img = e.currentTarget;
    const src = img.src;
    const placeholder =
      "https://via.placeholder.com/400x300.png?text=No+Image";

    if (src.endsWith(".png")) img.src = src.replace(".png", ".jpg");
    else if (src.endsWith(".jpg")) img.src = src.replace(".jpg", ".jpeg");
    else if (src.endsWith(".jpeg")) img.src = src.replace(".jpeg", ".webp");
    else if (src.endsWith(".webp")) img.src = src.replace(".webp", ".avif");
    else img.src = placeholder;

    img.onerror = null;
  };

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      {/* --- Back Button --- */}
      <button
        onClick={() =>
          navigate(`/products/category/${encodeURIComponent(category)}`)
        }
        className="text-sm text-gray-600 font-semibold hover:underline mb-3"
      >
        ← Back to {category}
      </button>

      {/* --- Product Header Section --- */}
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={getProductImage(product.name)}
          alt={product.name}
          className="w-64 h-64 object-cover rounded"
          loading="lazy"
          onError={handleImageError}
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-3">{product.name}</h1>

          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: product.TableDescription }}
          />

          <p className="text-gray-700 leading-relaxed mt-4">
            {product.ParagraphDescription}
          </p>

          {/* --- Buy Now / Chat Buttons --- */}
    <div className="flex items-center flex-wrap gap-2 mt-2">
  <Button>Buy Now</Button>
  <Button variant="outline">Chat With Us</Button>

  <span className="font-medium text-gray-700 ml-4">Share:</span>

  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 cursor-pointer hover:text-blue-700 text-2xl"
  >
    <i className="fab fa-facebook-square"></i>
  </a>

  <a
    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentUrl
    )}&text=${encodeURIComponent(product.name)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400 cursor-pointer hover:text-blue-500 text-2xl"
  >
    <i className="fab fa-x-twitter"></i>
  </a>

  <a
    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-700 cursor-pointer hover:text-blue-800 text-2xl" 
  >
    <i className="fab fa-linkedin"></i>
  </a>

  <a
    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${product.name} - ${currentUrl}`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-green-600 cursor-pointer hover:text-green-700 text-2xl"
  >
    <i className="fab fa-whatsapp-square"></i>
  </a>
   <a
   onClick={() => {
      navigator.clipboard.writeText(currentUrl);
        toast({
                  title: "Product link copied to clipboard! ✅",
                  description: "You can now paste the link anywhere to share this product!",
                });
    }}
  
    className="text-gray-500 cursor-pointer hover:text-gray-700 text-2xl"
  >
<i className="fa-solid fa-clipboard"></i> </a>
</div>

        </div>
      </div>

  {/* --- Product Description Section --- */}
{/* --- Product Description Section --- */}
<div className="mt-10">
  {/* Green angled banner with underline */}
  <div className="flex items-center w-full">
    {/* Left angled title block */}
    <div
      className="text-white font-semibold text-base px-4 py-2"
      style={{
        backgroundColor: "#006e39",
        // clipPath: "polygon(0 0, 94% 0, 100% 100%, 0% 100%)",
clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0% 100%)",

        fontFamily: "Arial, sans-serif",
      }}
    >
      Products Description
    </div>

    {/* Line extending to right */}
    <div
      className="flex-grow"
      style={{
        borderTop: "2px solid #006e39",
        height: "2px",
        marginLeft: "-2px",
      }}
    ></div>
  </div>

  {/* Product Description content */}
  <div
    className="prose mt-4"
    dangerouslySetInnerHTML={{ __html: product.Description }}
  />
</div>


    </div>
  );
}
