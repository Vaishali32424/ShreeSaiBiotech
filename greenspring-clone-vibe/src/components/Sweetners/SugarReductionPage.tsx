import React from "react";

const SugarReductionPage: React.FC = () => {
  return (
    <div className="bg-white py-12 px-4 md:px-12 lg:px-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-black">
          Technological Innovation In Reducing Sugar With Natural Sweeteners
        </h2>
        <div className="w-20 h-1 bg-green-500 mx-auto my-4" />
        <p className="text-gray-600">Sugar reduction solution provider</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <img
          src="/assets/plants-and-prowder.webp"
            alt="Biotechnology"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="font-bold text-black mb-2">Biotechnology Empowerment</h3>
          <ul className="list-disc list-inside text-sm text-gray-800">
            <li>
              <span className="text-green-600 font-semibold">Enzymatic modification:</span>
              <p>
                Using enzymatic hydrolysis techniques (such as alpha glucosidase) to modify stevia glycosides, reducing bitter aftertaste and improving sweet purity (such as Reb M-type stevia).
              </p>
            </li>
            <li className="mt-2">
              <span className="text-green-600 font-semibold">Microbial fermentation:</span>
              <p>
                Mogroside V is synthesized by genetically engineered yeast to reduce the extraction cost and realize large-scale production (instead of traditional fruit extraction).
              </p>
            </li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <img
            src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2" // Replace with actual image URL
            alt="Nanocarrier technology"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="font-bold text-black mb-2">Nanocarrier technology</h3>
          <p className="text-sm text-gray-800">
            Encapsulate sweeteners (such as stevia) in nanoliposomes or protein carriers to enhance solubility and stability, reducing unit usage (by 30% at the same sweetness level).
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <img
          src="/assets/Plants.webp"
            alt="Compounding technology"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="font-bold text-black mb-2">Intelligent compounding technology</h3>
          <ul className="list-disc list-inside text-sm text-gray-800">
            <li>
              <span className="text-green-600 font-semibold">Synergistic effect enhancement:</span>
              <p>
                Stevioside+erythritol (1:5 ratio) simulates the taste of sucrose, masking the bitter taste, suitable for beverages and baking.
              </p>
            </li>
            <li className="mt-2">
              <span className="text-green-600 font-semibold">Flavor balance:</span>
              <p>
                Momordica grosvenorii glycoside+gum arabic, neutralizing the metallic taste, suitable for dairy products and functional food.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SugarReductionPage;
