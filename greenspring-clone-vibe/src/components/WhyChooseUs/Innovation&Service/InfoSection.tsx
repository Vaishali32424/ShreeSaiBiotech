// InfoSection.jsx
import React from "react";

const sectionData = [
  {
    title: "Gummy",
    description: [
      "Sugar-free, low-sugar, vegetarian, etc.",
      "Allergen-Free, Non-GMO, Gluten-Free, Tapioca Coating, Non-Tacky",
      "Processing and production according to customer’s formula",
      "Provide customized service of fondant in different shapes and colors",
      "Provide packaging customization and specialty label design services such as various packaging (bags or bottles)"
    ],
    image:"assets/abc01.jpeg"
  
  },
  {
    title: "Blending Powder",
    description: [
      "Customised blending",
      "Packed by pouch or tube with custom logo",
      "Specifications: 50g, 100g, 200g, 500g, 1000g…",
      "Provide packaging customization and specialty label design services such as various packaging (bags or bottles)"
    ],
    image:"assets/abc02.jpeg"
   
  },
    {
    title: "Gummy",
    description: [
      "Sugar-free, low-sugar, vegetarian, etc.",
      "Allergen-Free, Non-GMO, Gluten-Free, Tapioca Coating, Non-Tacky",
      "Processing and production according to customer’s formula",
      "Provide customized service of fondant in different shapes and colors",
      "Provide packaging customization and specialty label design services such as various packaging (bags or bottles)"
    ],
    image:"assets/abc03.jpeg"
  
  },
    {
    title: "Blending Powder",
    description: [
      "Customised blending",
      "Packed by pouch or tube with custom logo",
      "Specifications: 50g, 100g, 200g, 500g, 1000g…",
      "Provide packaging customization and specialty label design services such as various packaging (bags or bottles)"
    ],
    image:"assets/abc04.jpeg"
   
  },
];

const InfoSection = () => {
  return (
    <><div className="text-center text-lg font-bold text-green-800 my-4 py-2">SHREE SAI BIOTECH envisions to become a Global Leader in the Healthcare Industry, driving Sustainable Growth through Innovation, Strategic Partnerships and relentless focus on Customer Satisfaction</div><div className="space-y-12 my-10 bg-gray-100 p-6">
      {sectionData.map((section, index) => (
        <div
          key={index}
          className="grid md:grid-cols-2 gap-6 items-center"
        >
          {/* Image */}
          <div className={`${index % 2 === 1 ? "md:order-2" : "md:order-1"}`}>
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-[300px] object-cover " />
          </div>

          {/* Text */}
          <div
            className={`p-6 ${index % 2 === 1 ? "md:order-1" : "md:order-2"}`}
          >
            <h2 className="text-lg font-bold text-green-800 mb-4">
              {section.title}
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
              {section.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}



       
    </div></>
  );
};

export default InfoSection;
