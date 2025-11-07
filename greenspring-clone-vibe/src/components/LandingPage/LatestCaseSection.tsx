import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const cases = [
  {
    title: "Blending Powder",
        image: "assets/granular.jpeg",

    description: `*Customised blending
*Packed by pouch or tube with custom logo
*Specifications: 50g, 100g, 200g, 500g, 1000g….
*Provide packaging customization and specialty label design services such as various packaging (bags or bottles)`,
  },
  {
    title: "Granular",
    description: `*Wet and dry granulation
*Custom blend
*Provide packaging customization and specialty label design services such as various packaging (bags or bottles)
*Service can be customized according to customer needs`,
    image: "assets/OEM-service.jpeg",
  },
  {
    title: "Tablet & Effervescent Tablet",
    description: `*Tablets: Coated, available in a variety of shapes and colors
*Specification selection: 250mg, 500mg, 1000mg/tablet
*Provide a variety of effervescent tablets: VC effervescent tablets, multivitamin effervescent tablets, zinc/iron/calcium effervescent tablets, slimming effervescent tablets, etc.
*Flavors: Orange, Lemon, Peach, Strawberry, Blueberry, Apple, Grape or your recipe
*Packing: 4g/tablet or any other weight you want, 10 or 20 pieces/tube , 100 tubes/carton
*Provide packaging customization and specialty label design services such as various packaging (bags or bottles)`,
    image: "assets/Raw-material.jpeg",
  },
];

const LatestCaseSection: React.FC = () => {
  return (
    <section
      className="py-16 bg-cover h-[400px] bg-center"
      style={{
        backgroundImage:
         "url('https://www.greenspringshop.com/uploads/202318070/ImgScroll/ba4250654d-0e66-4183-8ccf-85bc6c58b815.jpg')",
      }}
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <p className="text-white font-semibold text-center mb-2">
          FEATURES CASE
        </p>
        <h4 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">
          Latest Case
        </h4>

        {/* Swiper */}
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="case-swiper"
        >
          {cases.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative group overflow-hidden">
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[350px] object-fit transition duration-300 transform group-hover:scale-105"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-green-900 bg-opacity-75 flex flex-col items-center justify-center p-4 text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm whitespace-pre-line leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LatestCaseSection;