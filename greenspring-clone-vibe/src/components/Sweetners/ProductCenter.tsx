import { getProductsByCategory } from "@/Services/Productscrud";
import React, { useEffect, useState } from "react";


const ProductCenter: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            // API कॉल
            const response = await getProductsByCategory(14); 
         
            setProducts(response.data || response); 
            
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to load products. Please check the API status.");
        } finally {
            setLoading(false);
        }
    };

    // 💡 useEffect Hook: कंपोनेंट माउंट होने पर डेटा फ़ेच करें
    useEffect(() => {
        fetchProducts();
    }, []);
  return (
    <div className="bg-white px-4 md:px-16 py-12">
      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="bg-white p-6 shadow border text-sm">
          <h3 className="text-lg font-semibold mb-2">
            Interested in Sweetener?
          </h3>
          <p className="mb-4">
            Shree Sai Biotech® has over 23 years of partner relationships,
            industry expertise, innovation and service that everyone at Shree
            Sai Biotech® brings to our customers each and every day. Contact us
            for your nutraceutical and pharmaceutical solutions:
          </p>
       <ul className="space-y-2 text-sm">
  <li>
    <strong>Our Address</strong>
    <br />
    2nd Floor, Ms-A, Shop A 212, VIP Marg, Mall Godown Road, New Siyaganj,
    Indore - 452007, Madhya Pradesh, India
  </li>
  <li>
    <strong>Whatsapp</strong>
    <br />
    <a
      href="https://wa.me/918989496905"
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
    >
      +91-8989496905
    </a>
  </li>
  <li>
    <strong>E-Mail</strong>
    <br />
    <a
      href="mailto:info@shreesaibiotech.com"
      className="text-primary hover:underline"
    >
      info@shreesaibiotech.com
    </a>
  </li>
</ul>

        </div>
        <img
          src="/assets/steviaplant.webp"
          alt="Stevia Plant"
          className="w-full h-auto object-cover rounded"
        />
      </div>

      <div className="bg-green-800 text-white py-2 px-4 text-center font-semibold text-lg">
        Product Center
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {products?.map((product, index) => (
          <div
            key={product.id}
            className="border rounded shadow hover:shadow-md transition overflow-hidden"
          >
            <div className="bg-green-700 text-white text-xs font-bold py-1 px-2 flex justify-between items-center">
              <span>Shree Sai BioTech</span>
            </div>

            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-40 object-contain bg-white"
            />

            <div className="p-4 text-sm text-gray-800">
              <h4 className="font-semibold mb-1">{product.name}</h4>
              <p className="my-2">{product.description}</p>
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
  );
};

export default ProductCenter;
