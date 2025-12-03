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
    image: "https://www.greenspringshop.com/Content/uploads/2023389378/2023101109424577a60ed236dd4afcbdfe476b6ddce49b.jpg?size=533x0"
  
  },
  {
    title: "Blending Powder",
    description: [
      "Customised blending",
      "Packed by pouch or tube with custom logo",
      "Specifications: 50g, 100g, 200g, 500g, 1000g…",
      "Provide packaging customization and specialty label design services such as various packaging (bags or bottles)"
    ],
    image: "https://www.greenspringshop.com/Content/uploads/2023389378/20231011111834b9c5269962a243d79ba15ae0b430167b.png?size=600x0"
   
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
    image: "https://www.greenspringshop.com/Content/uploads/2023389378/2023101109424577a60ed236dd4afcbdfe476b6ddce49b.jpg?size=533x0"
  
  },
    {
    title: "Blending Powder",
    description: [
      "Customised blending",
      "Packed by pouch or tube with custom logo",
      "Specifications: 50g, 100g, 200g, 500g, 1000g…",
      "Provide packaging customization and specialty label design services such as various packaging (bags or bottles)"
    ],
    image: "https://www.greenspringshop.com/Content/uploads/2023389378/20231011111834b9c5269962a243d79ba15ae0b430167b.png?size=600x0"
   
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



         <div className="grid md:grid-cols-2 gap-10 items-center">

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
            className="w-full h-[380px] object-cover rounded-md shadow"
          />
        </div>

      </div>
    </div></>
  );
};

export default InfoSection;
