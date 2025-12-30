import React from "react";
import {
  FaLeaf,
  FaInfinity,
  FaGlobe,
  FaBuilding,
  FaStar,
} from "react-icons/fa";

const ProductAdvantages = () => {
  const items = [
    {
      icon: <FaLeaf />,
      title: "100% Natural & Pure",
      text:
        "No additives, sugars, or fillers—made solely from fresh fruits and vegetables.",
      number: "01",
    },
     {
      icon: <FaBuilding />,
      title: "Certified Quality",
      text:
        "Compliant with |FDA | EU organic| and ISO 22000 standards; tested for pesticides, heavy metals, and microbiology.",
      number: "04",
    },
    {
      icon: <FaInfinity />,
      title: "Maximized Nutrient Retention",
      text:
        "Low-temperature drying preserves vitamins (A, C, E), antioxidants, and fiber better than high-heat methods.",
      number: "02",
    },
    {
      icon: <FaGlobe />,
      title: "Extensive Variety",
      text:
        "200+ single powders (e.g., kale, mango, beetroot) and customizable blends to meet unique needs etc.",
      number: "03",
    },
   
    {
      icon: <FaStar />,
      title: "Versatile & Convenient",
      text:
        "Soluble in water, easy to store (24-month shelf life), and ideal for bulk production or small-batch use.",
      number: "05",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold text-center mb-12">
        Product Advantages
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="
              relative group
              bg-white
              rounded-2xl
              shadow-sm border
              px-6 pt-10 pb-16
              text-center
              transition-all
              duration-500
              hover:shadow-md
              hover:scale-[1.01]
            "
          >
            {/* ICON */}
            <div
              className="
                text-green-700
                text-3xl
                mb-6
                inline-block
                transition-transform
                duration-700
                group-hover:rotate-[360deg]
              "
            >
              {item.icon}
            </div>

            {/* TITLE */}
            <h3 className="font-semibold text-lg mb-4">
              {item.title}
            </h3>

            {/* TEXT */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.text}
            </p>

            {/* BIG NUMBER */}
            <div
              className="
                absolute bottom-4 left-1/2 -translate-x-1/2
                text-6xl font-bold
                text-green-100
                transition-colors
                duration-500
                group-hover:text-green-700
              "
            >
              {item.number}
            </div>

            {/* MIRROR EFFECT LAYER */}
            <div
              className="
                absolute inset-0
                rounded-2xl
                transition-transform
                duration-500
                pointer-events-none
                group-hover:scale-x-[-1]
                opacity-[0.02]
                bg-green-700
              "
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductAdvantages;
