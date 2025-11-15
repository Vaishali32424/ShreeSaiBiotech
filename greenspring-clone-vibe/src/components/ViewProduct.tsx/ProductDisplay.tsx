// src/components/ViewProduct.tsx/ProductDisplay.tsx

import React, { useEffect, useState } from 'react'; // 💡 (1) आवश्यक हुक्स आयात करें
import { useParams } from 'react-router-dom';     // 💡 (2) useParams आयात करें
import { getProductsData } from '@/Services/Productscrud'; // 💡 (3) API सर्विस आयात करें
import ProductCardRenderer from './ProductCardRenderer'; 
import { toast } from '../ui/use-toast';
import { Button } from '../ui/button';


const ProductDisplay = () => {
  const { productId } = useParams(); // URL से ID प्राप्त करें
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);
  useEffect(() => {
    if (productId) {
      const fetchProductData = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await getProductsData(productId); 
          setProductData(result.data);
        } catch (err) {
          console.error("Error fetching product data:", err);
          setError("Failed to load product data. Check the console for details.");
        } finally {
          setLoading(false);
        }
      };
      fetchProductData();
    } else {
      setLoading(false);
      setError("Product ID is missing in the URL.");
    }
  }, [productId]); 
    if (loading) {
    return <div className="text-center p-20 text-xl font-medium">Loading product details...</div>;
  }
  
  if (error) {
    return <div className="text-center p-20 text-red-600 font-bold text-xl">{error}</div>;
  }
  
  if (!productData || !productData.content_sections) {
    return <div className="text-center p-20 text-gray-500 text-xl">Product not found or data is incomplete. (ID: {productId})</div>;
  }
const SectionTitleBar = ({ title }) => (

    <div className="flex items-center w-full my-4">
      <div
        className="text-white font-semibold capitalize text-base px-4 py-2"
        style={{
          backgroundColor: "#006e39",
          clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0% 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {title}{" "}
      </div>
      <div
        className="flex-grow"
        style={{
          borderTop: "2px solid #006e39",
          height: "2px",
          marginLeft: "-2px",
        }}
      ></div>
    </div>
  );
  const { 
    name, 
    image_url, 
    short_details, 
    content_sections,
  } = productData;

  const {
    product_cards_data, 
    customer_reviews,   
    faq_items,
    certificates,
    footer_text,
    dynamic_description, 
  } = content_sections;

  const detailsObject = productData.short_details || {};
  
  const tableHtml = detailsObject.table_description || null;
   

  const quickFacts = Object.entries(detailsObject)
    .filter(([key]) => key !== 'table_description');
  const proseClass = "prose max-w-none text-gray-700 leading-relaxed"; 

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-xl min-h-screen">
      <div className=" p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{name}</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-10">
        <div className="md:col-span-2">
          {image_url && (
            <img 
              src={image_url} 
              alt={name} 
              className="w-full h-auto max-h-40 object-contain rounded-lg shadow-lg border border-gray-200" 
            />
          )}
        </div>
{tableHtml && (
        <><section className=" ">

                      {/* Section Title */}
                      <h2 className="text-xl font-bold text-gray-800  inline-block ">
                          Product Specifications
                      </h2>

                      <div
                          className="overflow-x-auto custom-product-table"
                          dangerouslySetInnerHTML={{ __html: tableHtml }} />

                      <style jsx="true">{`
            .custom-product-table .tbl { 
                width: 70%; 
                border-collapse: collapse; 
                margin-top: 1rem; 
                font-family: Arial, sans-serif;
            }
           
            .custom-product-table .tbl td { 
                padding: 2px 4px; 
                font-size: 12px; 
                text-align: left;
            }
            .custom-product-table .tbl .fw6 { 
                font-weight: 400; 
                width: 50%; 
            }
          `}</style>
   <div className="flex items-center flex-wrap gap-2 mt-2">
    <div className='flex space-x-2'>
  <Button>Buy Now</Button>
  <Button variant="outline">Chat With Us</Button>
</div>
<div>

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
    )}&text=${encodeURIComponent(name)}`}
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
      `${name} - ${currentUrl}`
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
</div></div>
                  </section>
                 </>
      )}
      
      </div>
        
      {/* --- Dynamic Content Sections --- */}
      {dynamic_description && dynamic_description.length > 0 && dynamic_description.map((section, index) => (
        <section key={section.id || index} className="mb-6">
          <SectionTitleBar title={section.title} />  
          <div 
            className={proseClass} 
            dangerouslySetInnerHTML={{ __html: section.content }} 
          />
          <hr className="my-6 border-t-2 border-gray-100" />
        </section>
      ))}

      {/* --- Certificates Section (1x6 Grid) --- */}
      {certificates && certificates.length > 0 && (
        <section className="mb-6 p-6 bg-yellow-50 rounded-lg">
          <SectionTitleBar title="Certifications" />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="flex flex-col items-center p-2 border rounded-md bg-white shadow-sm">
                {cert.image_base64 && (
                  <img
                    src={cert.image_base64}
                    alt={cert.name || "Certificate"}
                    className="w-full h-20 object-contain mb-2"
                  />
                )}
                <p className="text-xs font-semibold text-center text-gray-700">{cert.name}</p>
              </div>
            ))}
          </div>
          <hr className="my-6 border-t-2 border-gray-100" />
        </section>
      )}

      {/* --- Product Cards Grid --- */}
      {product_cards_data && product_cards_data.cards && product_cards_data.cards.length > 0 && (
        <section className="mb-6">
          <SectionTitleBar title="Key Features & Specifications" />
          <ProductCardRenderer cardData={product_cards_data} />
          <hr className="my-6 border-t-2 border-gray-100" />
        </section>
      )}

      {/* --- Customer Reviews --- */}
      {customer_reviews && customer_reviews.length > 0 && (
        <section className="mb-6 p-6 bg-green-50 rounded-lg">
          <SectionTitleBar title="Customer Reviews" />
          <div className="grid md:grid-cols-2 gap-6">
            {customer_reviews.map((review) => (
              <div key={review.id} className="p-4 bg-white rounded-lg shadow-md border-t-4 border-green-600">
                <div className="text-yellow-500 mb-2">
                  {'⭐'.repeat(review.rating)}
                </div>
                <p className="italic text-gray-700 mb-3">"{review.text}"</p>
                <p className="font-semibold text-green-800">{review.name}</p>
                <p className="text-sm text-gray-500">{review.role}</p>
              </div>
            ))}
          </div>
          <hr className="my-6 border-t-2 border-gray-100" />
        </section>
      )}

      {/* --- FAQ Section --- */}
      {faq_items && faq_items.length > 0 && (
        <section className="mb-6">
          <SectionTitleBar title="FAQ" />
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 border-b border-green-600 inline-block pb-1">Everything You Need To Know</h3>
          </div>
          <div className="space-y-0 border-t border-gray-300">
            {faq_items.map((faq) => (
              <details key={faq.id} className="group border-b border-gray-300 py-3">
                <summary className="flex items-center cursor-pointer text-base font-semibold text-gray-800">
                  <span className="text-green-600 mr-2 group-open:rotate-90 transition-transform">▶</span>
                  {faq.question}
                </summary>
                <p className="mt-2 pl-6 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
      
      {/* --- Footer Text --- */}
      {footer_text && (
        <div className="mt-8 p-4  text-left text-sm text-gray-600 italic">
          {footer_text}
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;