// ProductInfo.jsx
import React from "react";

const ProductInfo = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-center space-y-6">
      {/* Top Heading */}
      <p className="text-lg text-gray-800 font-bold">
       Get in Touch with Us

      </p>

      {/* Middle Paragraph */}
      <p className="text-sm text-gray-700 leading-relaxed">
Reckoned as a leading Manufacturer and Exporter SHREE SAI BIOTECH  is a Quality ISO,GMP.FDA.STANDARDIZED HERBAL EXTRACTS since 1988. An exclusive manufacturing facility and Dedicated raw Materials supplier Network makes us the one-stop-shop for all your Requirements of standardized herbal extracts, herbal raw material and other plant derivatives from India      </p>

      {/* Notice */}
      <div className="space-y-2">
        <p className="font-bold text-green-800 text-sm">-NOTICE-</p>
        <p className="text-green-700 font-semibold text-sm">
          We have more than 5,000+ kinds of products, and not all of them are
          listed on our website. Please{" "}
          <a href="/contact-us"  className="italic underline cursor-pointer">
            contact us
          </a>{" "}
          if you cannot find it on our site.
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
