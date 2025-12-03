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
    We provide various dosage forms and neutral packaging including mixed powders, granules, soft capsules, hard capsules, tablets, soft candies, etc. to meet the different needs of customers. Green Spring has been committed to supplying customers with natural, safe and organic plant extracts. All the products we supply, carry out the highest standards in the international industry, complying with EU EC396, EU 2023/915 standards and the highest solvent residue standards.
      </p>

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
