// AdvantageOfSweetner.tsx
import React from "react";

interface Product {
  image: string;
  title: string;
}

const products: Product[] = [
  { image: "assets/sweetners/image-1.webp", title: "Shree Sai Biotech® plus SS Desktop Sweets" },
  { image: "assets/sweetners/image-2.webp", title: "Shree Sai Biotech® plus PBS101 Sparkling Water and other carbonate beverages" },
  { image: "assets/sweetners/image-3.webp", title: "Shree Sai Biotech® plus JB801 Bread,Fermented Products" },
  { image: "assets/sweetners/image-4.webp", title: "Shree Sai Biotech® plus PDM101 Modified Milk" },
  { image: "assets/sweetners/image-5.webp", title: "Shree Sai Biotech® plus PDY101 Yogurt" },
  { image: "assets/sweetners/image-6.webp", title: "Shree Sai Biotech® plus P1101 Ice Cream" },
  { image: "assets/sweetners/image-7.webp", title: "Shree Sai Biotech® plus JB101 Cookies,Cake Pudding" },
  { image: "assets/sweetners/image-8.webp", title: "Shree Sai Biotech® plus JB101 soft sweets" },
];

const AdvantageOfSweetner: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        Shree Sai Biotech®-Compound Sweetener
      </h1>
      <p className="text-gray-700 text-center font-semibold mb-10">
        The series of product is manufactured by mixing a variety of stevia glycosides as raw materials. The product can be customized according to customer requirements, and the proportion of stevia glycosides can be adjusted, so as to meet the application in more food fields; moreover, the product is mainly made of the raw materials of a variety of natural stevia glycosides extracted from stevia leaves in a scientific proportion, with the sweetness about 200-300 times higher than sucrose, and the calories only about 1/125 of sucrose. It will not be absorbed to produce calories after ingestion, so it is a suitable sweetener for diabetes and obesity patients. Easily soluble in water, its solubility is greatly improved compared with other stevia glycoside monomers, and its acid, base and heat characteristics are stable; compared with RebA, the post-bitter taste is significantly improved. The product features pure sweet taste, full and clean, and short residual taste, without obvious sour, mint, metal and other bad aftertaste. In addition, it can also be compounded with a variety of sweeteners according to demands to obtain better characters and flavors.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, idx) => (
          <div key={idx} className="text-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover mb-3 rounded-lg"
            />
            <p className="font-semibold text-sm">{product.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvantageOfSweetner;
