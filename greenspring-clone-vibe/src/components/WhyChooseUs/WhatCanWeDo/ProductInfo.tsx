// ProductInfo.jsx
import React from "react";

const ProductInfo = () => {
  return (
    <div className="text-center mx-auto px-4 py-10 space-y-6">
      {/* Top Heading */}
      <i className="text-sm font-bold text-teal-800">
      SHREE SAI BIOTECH  is a leading manufacturer and supplier of quality STANDARDIZED HERBAL EXTRACTS since 1988. An exclusive manufacturing facility and dedicated raw materials supplier network makes us the one-stop-shop for all your requirements of standardized herbal extracts, herbal raw material and other plant derivatives from India.
      </i>

      {/* Middle Paragraph */}
      <p className="text-sm text-gray-700 leading-relaxed">
      Today, we rank amongst the largest manufacturers of standardized Herbal Extracts in the country catering to the bulk requirements of giant Pharmaceutical Companies, Traditional Ayurvedic Manufacturers & Individual practitioners simultaneously. To ensure continued compliance with the requirements of the international standards, we have designed and implemented comprehensive systems for Quality Assurance (QA), incorporating Good Manufacturing Practice (WHO)WHO GMP refers to the World Health Organization's (WHO) Good Manufacturing -(GMP) and thus Quality Control (QCM).Our quality team and laboratory is your quality team,your laboratory.We are dedicated to providing clients with the highest quality nutritional ingredients to make the best possible products
      </p>
     


      {/* Notice */}
      <div className="space-y-2">
        <p className="font-bold text-green-800 text-sm">-NOTICE-</p>
        <p className="text-green-700 font-semibold text-sm">
          We have more than 5,000+ kinds of products, and not all of them are
          listed on our website. Please{" "}
          <span className="italic underline cursor-pointer">
            contact us
          </span>{" "}
          if you cannot find it on our site.
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
