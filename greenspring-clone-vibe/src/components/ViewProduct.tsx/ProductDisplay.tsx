// src/components/ProductDisplay.jsx (Updated for Conditional HRs)

import React from 'react';
import ProductCardRenderer from './ProductCardRenderer'; 

const ProductDisplay = ({ productData }) => {
  if (!productData) {
    return null;
  }
  
  const { 
    name, 
    image_url, 
    short_details, 
    content_sections,
    product_cards_data, 
    customer_reviews,   
    faq_items,
    certificates, // Data from the updated payload
  } = productData;

  const detailsArray = short_details ? Object.entries(short_details) : [];
  const sectionsArray = content_sections ? Object.entries(content_sections) : [];

  // --- UI Styling Constants ---
  const proseClass = "prose max-w-none text-gray-700 leading-relaxed"; 
  
  // Custom title bar for sections
  const SectionTitleBar = ({ title }) => (
    <div className="flex items-center w-full my-2">
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

  return (
    <div className="max-w-4xl mx-auto p-0 bg-white">
      
      {/* 1. PRODUCT HEADER & IMAGE/DETAILS GRID */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        
        {/* Left Side: Product Image (Approx. 40% width on desktop) */}
        <div className="w-full md:w-2/5 flex-shrink-0">
          <img 
            src={image_url} 
            alt={name} 
            className="w-full h-auto object-cover rounded-md shadow-md border border-gray-200" 
          />
        </div>

        {/* Right Side: Product Name and Short Details (Approx. 60% width on desktop) */}
        <div className="w-full md:w-3/5">
          <h1 className="text-3xl font-extrabold mb-4 text-gray-900 leading-snug">{name}</h1>
          
          {detailsArray.length > 0 && (
            <ol className="list-none space-y-2 text-base text-gray-700">
              {detailsArray.map(([key, value], index) => (
                <li key={key} className="text-sm">
                 
                  <span className="font-bold mr-1"></span> 
                  <strong className="text-gray-900">{key}:</strong> {value}
                </li>
              ))}
            </ol>
          )}

          {/* Inquiry/Chat Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-2 border border-green-600 text-green-600 rounded-md font-semibold hover:bg-green-50 transition duration-150">
              Send Inquiry
            </button>
            <button className="px-6 py-2 border border-green-600 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition duration-150">
              Chat Now
            </button>
          </div>
        </div>
      </div>
      
      {/* HR 1: Always keep after header */}
      <hr className="mb-10 border-t border-gray-200" /> 
      
      {/* --- Content Sections (RTE) and its HR (Conditional) --- */}
      {sectionsArray.length > 0 && (
        <>
            <div className="space-y-10">
                {sectionsArray.map(([title, htmlContent]) => (
                <section key={title}>
                    <SectionTitleBar title={title.replace(/_/g, " ")} />
                    <div
                    className={proseClass}
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </section>
                ))}
            </div>
            {/* HR 2: Only show if Content Sections are present */}
            <hr className="my-10 border-t border-gray-200" /> 
        </>
      )}

      
      {/* 2. CERTIFICATES SECTION (1x6 Grid) and its HR (Conditional) */}
      {certificates && certificates.length > 0 && (
          <>
            <section className="mb-10">
                <SectionTitleBar title="Certifications" />
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
                    {certificates.map((cert, index) => (
                        <div 
                            key={cert.id || index} 
                            className="flex flex-col items-center "
                        >
                            {/* FIX: Use cert.image_base64 from the payload */}
                            <div className="w-full h-60 flex items-center justify-center bg-gray-50 border-b border-gray-100 mb-2">
                                {cert.image_base64 ? (
                                    <img 
                                        src={cert.image_base64} 
                                        alt={cert.name} 
                                        className="h-full w-full max-w-full object-contain p-1"
                                    />
                                ) : (
                                    // Fallback for missing image
                                    <span className="text-sm text-gray-400">No Image</span>
                                )}
                            </div>
                            {/* Certificate Name */}
                            <p className="text-xs font-semibold text-gray-700 text-center truncate w-full px-1">
                                {cert.name || `Certificate ${index + 1}`}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            {/* HR 3: Only show if Certificates are present */}
            <hr className="my-10 border-t border-gray-200" /> 
          </>
      )}
      

      {/* 3. Product Cards / Grid Section and its HR (Conditional) */}
      {product_cards_data && product_cards_data.cards.length > 0 && (
        <>
            <section className="mb-8">
                <SectionTitleBar title="Quality Control & Key Features" />

                <ProductCardRenderer cardData={product_cards_data} />
            </section>
            {/* HR 4: Only show if Product Cards are present */}
            <hr className="my-10 border-t border-gray-200" /> 
        </>
      )}

      {/* 4. Customer Reviews Section and its HR (Conditional) */}
      {customer_reviews && customer_reviews.length > 0 && (
        <>
            <section className="mb-10">
            
                <SectionTitleBar title="User Evaluation" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {customer_reviews.map((review) => (
                        <div key={review.id} className="bg-white p-5 rounded-lg border border-gray-200 text-center shadow-lg">
                            <div className="text-xl text-green-600 mb-4 font-mono">
                                {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                            </div>
                            <blockquote className="text-gray-700 mb-4 text-sm leading-relaxed">
                                "{review.text}"
                            </blockquote>
                            <div className="flex flex-col items-center">
                                {/* Placeholder for avatar/image (as seen in screenshot) */}
                                <div className="w-10 h-10 rounded-full bg-pink-100 mb-2 border border-pink-300"></div>
                                <p className="text-base font-semibold text-green-700">
                                    {review.name}
                                </p>
                                <span className="text-xs font-normal text-gray-500">{review.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* HR 5: Only show if Customer Reviews are present */}
            <hr className="my-10 border-t border-gray-200" />
        </>
      )}

      {/* 5. FAQ Section (No HR after this section) */}
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
                  <span className="text-green-600 text-xl mr-3 transform transition-transform duration-200 group-open:rotate-90">
                    ›
                  </span>
                  {faq.question}
                </summary>
                <p className="mt-2 text-gray-700 text-sm ml-6">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}
      
      {/* Footer Text */}
      {productData.footer_text && (
  <div className="mt-6 bg-gray-100 border-t-4 border-green-600 p-4 rounded-md">
    <div
      className="text-gray-800 text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: productData.footer_text }}
    />
  </div>
)}
    </div>
  );
};

export default ProductDisplay;