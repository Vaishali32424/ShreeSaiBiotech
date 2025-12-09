// CardsSection.jsx
import React from "react";

const cardData = [
  {
    title: "People",
    img: "https://www.greenspringshop.com/Content/uploads/2023389378/20230208154122ada3c1a68fbb40dca0b819614e3d0153.jpg",
  },
  {
    title: "Pets",
    img: "https://www.greenspringshop.com/Content/uploads/2023389378/202302081551380de6c9368d7a49afa2f11b6d0d0f0f3f.jpg",
  },
  {
    title: "Agriculture",
    img: "https://www.greenspringshop.com/Content/uploads/2023389378/20230208155207f4335fff1c06451cb898672f78c6f61c.jpg",
  },
  {
    title: "Animal Feed",
    img: "https://www.greenspringshop.com/Content/uploads/2023389378/202302081552288c819190ae4b4f47b1ad8ef5eaf670e2.jpg",
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
