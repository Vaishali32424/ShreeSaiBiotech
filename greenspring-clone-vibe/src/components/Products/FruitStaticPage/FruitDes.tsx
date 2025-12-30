import React from "react";

const FruitDescription = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* LEFT IMAGE */}
        <div className="relative">
          
          {/* PEACH SHADOW RECTANGLE */}
          <div
            className="
              absolute 
              -right-12 
              top-20 
              w-[200px] 
              h-[340px] 
              bg-[#fde7db] 
              rounded-[70px] 
              blur-[1px]
              opacity-90
              z-0
            "
          ></div>

          {/* IMAGE */}
          <img
            src="/assets/fruit-des.jpeg"
            alt="Fruit and Vegetable Powders"
            className="relative z-10 w-full h-[480px] object-fit rounded-2xl shadow-sm"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="pt-6">
          <h2 className="text-3xl font-semibold text-black mb-6">
            Description
          </h2>

          <p className="text-gray-600 leading-[1.9] text-base">
           Shree Sai Biotech Indore. was established in 1988,we have more than 37+ years of experience,specializing in the extraction,concentration,purification of plant active substances and the development of 100% natural standardized  extracts,Herbal Powder .
<br/>

Shree Sai Biotech We are an integrated manufacturer and supplier specializing in the exploration, development and production of standardized plant extracts and natural organic powders.

<br/>
With our state-of-the-art manufacturing facilities, extensive R&D capabilities,and exceptional quality, Shree Sai Biotech  is committed to being a trusted partner for your phytochemical needs.
          </p>
        </div>

      </div>
    </section>
  );
};

export default FruitDescription;
