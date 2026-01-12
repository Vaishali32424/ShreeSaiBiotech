// CardsSection.jsx
import React from "react";

const cardData = [
  {
    title: "People",
    img: "/assets/xyz06.jpeg",
  },
  {
    title: "Pets",
    img: "/assets/xyz07.jpeg",
  },
  {
    title: "Agriculture",
    img: "/assets/xyz08.jpeg",
  },
  {
    title: "Animal Feed",
    img: "/assets/xyz09.jpeg",
  },
];

const CardsSection = () => {
  return (
    <div>
        <p className=" text-primary text-sm font-semibold">Custom Formulated Raw Ingredients Tailored To Your Consumer Needs: </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4 mb-10">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg shadow-md group"
        >
          <img
            src={card.img}
            alt={card.title}
            className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-1">
            <h3 className="text-sm font-semibold">{card.title}</h3>
          </div>
        </div>
      ))}
    </div>
    
        </div>
    

  );
};

export default CardsSection;
