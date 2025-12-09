// InfoSection.jsx
import React from "react";

const sectionData = [
  {
    title: "BULK BOTANICAL EXTRACT OIL AND POWDER SUPPLIER",
    description:
      "Shree Sai BioTech is the leading bulk botanical extract oil and powder supplier in the India, contributing to company growth in a variety of competitive, global industries. We understand our customers require the flexibility to order small and large quantities of raw ingredients and may need help developing a final product with white labeling to get on the market faster. We provide the volume of products you need and the manufacturing capabilities to get you both in bulk on a weekly, monthly, or bi-annual basis.",
    image:
      "https://www.greenspringshop.com/Content/uploads/2023389378/202302081455289c3063eeecdf47f5850ecdcdec312d90.jpg",
  },
  {
    title: "CUSTOM OIL & OIL POWDER MANUFACTURER SERVICING GLOBALLY",
    description: "Reckoned as a leading manufacturer and exporter, SHREE SAI BIOTECH Care was successfully established in the year 1988 and since then serving the needs of our clients. Under the stern leadership of our CEO, Mr.Navin Deveda, our ISO 9001 certified company has become an  worth organization, dealing with offering herbal products to the clients. At our esteemed firm, we follow cGMP standards that help us in maintaining the quality control norms and also by doing constant research; we are able to improve the quality of the existing product range.",
    image:
      "https://www.greenspringshop.com/uploads/18070/page/20250609090723fae16.jpg?size=1536x0",
  },
  {
    title: "DEVELOPMENT OF CUSTOMIZED FORMULA IN NATURAL PRODUCTS",
    description:
      "As a custom formulator we provide turn-key solutions helping customers develop customized formulations from a wide range of natural products. Our clients often choose Green Spring for our ability to develop ingredients of higher potency, made possible by our cutting-edge technology - from capsules, softgels, pills, dry mixes, emulsions and more.",
    image: "https://www.greenspringshop.com/Content/uploads/2023389378/20230208160220605569e4b8ce47b681e6efaf43f82997.jpg",
  },
  {
    title: "PRIVATE LABELING & PACKAGINGFOR CUSTOM OIL/POWDER PRODUCTS",
    description:
      "We custom formulate raw ingredients that can be manufactured into finished products for bottle labeling and packaging for direct-to-customer sales. Green Spring  innovative formulation technology delivers the exact product you're looking for while maintaining the integrity of our natural ingredients, helping you meet your desired label claims (like Non-GMO, Vegan, and more).We're leading the oil & oil powder industry through innovative technology and advanced business acumen: from high oil load oil powders and bioactive microencapsulated powders with improved absorption uptake to bottling, labeling and shrink sleeve-ing your finished product.",
    image:
      "https://www.greenspringshop.com/Content/uploads/2023389378/20230208150926a3595a257bb64e8bae8e685bb2d9ecaa.jpg",
  },
];

const InfoSection = () => {
  return (
    <><div className="space-y-12 my-10 bg-gray-100">
      {sectionData.map((section, index) => (
        <div
          key={index}
          className="grid md:grid-cols-2 gap-2 items-center"
        >
          {/* Image */}
          <div
            className={`${index % 2 === 1 ? "md:order-2" : "md:order-1"}`}
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-[300px] object-cover" />
          </div>

          {/* Text */}
          <div
            className={`p-8 ${index % 2 === 1 ? "md:order-1" : "md:order-2"}`}
          >
            <h2 className="text-sm font-bold text-green-800 ">
              {section.title}
            </h2>
            <p className="text-gray-700 text-xs leading-relaxed">
              {section.description}
            </p>
          </div>
        </div>
      ))}
    </div><div className="grid md:grid-cols-2 my-10 gap-10 items-center">

        {/* Left Text Section */}
        <div>
          <h2 className="text-xl font-bold text-teal-800 leading-snug">
            We Manufacture Raw Ingredients For Businesses In Any Industry, Including:
          </h2>

          <ul className="mt-6 space-y-3 text-[15px] text-gray-800">
            <li className="list-disc ml-5">Food</li>
            <li className="list-disc ml-5">Drink</li>
            <li className="list-disc ml-5">Supplement</li>
            <li className="list-disc ml-5">Nutraceuticals</li>
            <li className="list-disc ml-5">Pet Nutrition</li>
            <li className="list-disc ml-5">Beauty Products</li>
            <li className="list-disc ml-5">Essential Oils</li>
            <li className="list-disc ml-5">Homeopathic Ingredients</li>
            <li className="list-disc ml-5">Sports Nutrition</li>
          </ul>
        </div>

        {/* Right Image */}
        <div>
          <img
            src="assets/abcdd.webp"
            alt="Manufacturing Image"
            className="w-full h-[380px] object-cover rounded-md shadow" />
        </div>

      </div></>
  );
};

export default InfoSection;
