// InfoSection.jsx
import React from "react";

const sectionData = [
  {
    title: "BULK BOTANICAL EXTRACT OIL AND POWDER SUPPLIER",
    description:
      "Green Spring is the leading bulk botanical extract oil and powder supplier in the China, contributing to company growth in a variety of competitive, global industries. We understand our customers require the flexibility to order small and large quantities of raw ingredients and may need help developing a final product with white labeling to get on the market faster. We provide the volume of products you need and the manufacturing capabilities to get you both in bulk on a weekly, monthly, or bi-annual basis.",
    image:
      "https://www.greenspringshop.com/Content/uploads/2023389378/202302081455289c3063eeecdf47f5850ecdcdec312d90.jpg",
  },
  {
    title: "CUSTOM OIL & OIL POWDER MANUFACTURER SERVICING GLOBALLY",
    description:
      "Green Spring is an more than 22 years botanical extract supplier. As a global manufacturer of plant active ingredient bulk oil and powder, we’re experienced in providing turnkey solutions to businesses looking to step into any industry with the best products on the market.",
    image:
      "https://www.greenspringshop.com/uploads/18070/page/20250609090723fae16.jpg?size=1536x0",
  },
  {
    title: "HERBAL OIL BLENDS FOR GLOBAL INDUSTRIES",
    description:
      "We create customized blends of herbal oils and powders for diverse industries, ensuring high quality, purity, and global compliance to meet the demands of every market segment.",
    image:
      "https://www.greenspringshop.com/Content/uploads/2023389378/202302081455289c3063eeecdf47f5850ecdcdec312d90.jpg",
  },
  {
    title: "TURNKEY BOTANICAL SOLUTIONS",
    description:
      "With decades of experience, Green Spring provides end-to-end solutions for businesses – from bulk raw materials to white-label finished products ready for market launch.",
    image:
      "https://www.greenspringshop.com/uploads/18070/page/20250609090723fae16.jpg?size=1536x0",
  },
];

const InfoSection = () => {
  return (
    <div className="space-y-12 my-10 bg-gray-100">
      {sectionData.map((section, index) => (
        <div
          key={index}
          className="grid md:grid-cols-2 gap-2 items-center"
        >
          {/* Image */}
          <div
            className={`${
              index % 2 === 1 ? "md:order-2" : "md:order-1"
            }`}
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-[300px] object-cover"
            />
          </div>

          {/* Text */}
          <div
            className={`p-8 ${
              index % 2 === 1 ? "md:order-1" : "md:order-2"
            }`}
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
    </div>
  );
};

export default InfoSection;
