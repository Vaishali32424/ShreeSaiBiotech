import React from "react";
import {
  FaCapsules,
  FaFlask,
  FaLeaf,
  FaWineGlassAlt,
} from "react-icons/fa";

const marketApplications = [
  {
    title: "Nutraceutical",
    description:
      "Multiple natural active ingredients applied in the nutritional and health product industry to improve human function.",
    icon: <FaFlask className="w-10 h-10 text-white" />,
  },
  {
    title: "Cosmetics",
    description:
      "Botanical active ingredients are among the most popular and are successfully used in skin care, whitening, anti-aging and other fields.",
    icon: <FaLeaf className="w-10 h-10 text-white" />,
  },
  {
    title: "Food Additives",
    description:
      "Natural plant ingredients can enhance the aroma and color of food, improve taste balance and health.",
    icon: <FaWineGlassAlt className="w-10 h-10 text-white" />,
  },
  {
    title: "Pharmaceutical",
    description:
      "The pharmaceutical industry requires active botanical pharmaceutical ingredients to develop plant-based medicines.",
    icon: <FaCapsules className="w-10 h-10 text-white" />,
  },
];

const ProductMarketSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Product Market Application
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {marketApplications.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center relative"
            >
              {/* Green Circle with Icon */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-green-700 flex items-center justify-center shadow-lg">
                  {item.icon}
                </div>

                {/* White Number Badge */}
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-white text-green-700 rounded-full flex items-center justify-center font-bold shadow-md">
                  {index + 1}
                </span>

                {/* Dotted Line */}
                <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
                  <div className="w-[2px] h-12 border-l-2 border-dotted border-gray-300"></div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductMarketSection;
