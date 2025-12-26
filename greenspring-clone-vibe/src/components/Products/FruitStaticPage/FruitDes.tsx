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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp92koYznWhe7JG90_91PnUJLUm4RfLQucEA&s"
            alt="Fruit and Vegetable Powders"
            className="relative z-10 w-full h-[420px] object-cover rounded-2xl shadow-sm"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="pt-6">
          <h2 className="text-3xl font-semibold text-black mb-6">
            Description
          </h2>

          <p className="text-gray-600 leading-[1.9] text-base">
            Our fruit and vegetable powder is derived from 100% fresh, non-GMO
            fruits and vegetables, processed through advanced low-temperature
            vacuum drying technology. This gentle method retains over 98% of the
            original nutrients—including vitamins, minerals, dietary fiber, and
            natural pigments—while eliminating moisture to ensure long-term
            stability. We offer a diverse range of options, from single-ingredient
            powders (e.g., spinach powder, strawberry powder, carrot powder) to
            custom blended fruit and vegetable powders, all free from additives,
            preservatives, or artificial colors. Suitable for food, beverage,
            health supplement, and cosmetic industries, our fruit and vegetable
            powder delivers authentic flavor, vibrant color, and concentrated
            nutrition in a convenient, easy-to-store form.
          </p>
        </div>

      </div>
    </section>
  );
};

export default FruitDescription;
