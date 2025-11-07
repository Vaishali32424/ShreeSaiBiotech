import React from "react";

const SweetenerPage: React.FC = () => {
  return (
    <div className="w-full bg-white text-[#1a1a1a] font-[Inter]">
      {/* Title */}
      <h2 className="text-[22px] font-semibold text-center mt-8 mb-6">
        Innovative Application Scenarios for Natural Sweetener Sugar Reduction Solutions
      </h2>

      {/* 3 Feature Cards */}
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-stretch px-4 lg:px-12">
        {/* Card 1 */}
        <div className="flex-1 border rounded-lg shadow-sm">
          <div className="border-t-4 border-green-800 rounded-t-lg"></div>
          <div className="p-6">
            <h3 className="font-semibold text-center mb-4">
              Precise sugar reduction formula
            </h3>
            <ul className="list-disc list-inside space-y-2 text-[15px] leading-relaxed">
              <li>
                <span className="font-semibold text-[#1f7a1f]">Beverage industry:</span>
                <br />
                Use the gel characteristics of stevia+pectin to simulate the texture of syrup in
                low sugar tea drinks (sugar content reduced by 50%, heat reduced by 70%).
              </li>
              <li>
                <span className="font-semibold text-[#1f7a1f]">Dairy products:</span>
                <br />
                A combination of xylitol and inulin (prebiotics) achieves a dual function of
                "reducing sugar and promoting intestinal health" in yogurt.
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex-1 border rounded-lg shadow-sm">
          <div className="border-t-4 border-green-800 rounded-t-lg"></div>
          <div className="p-6">
            <h3 className="font-semibold text-center mb-4">Cleaning label trend</h3>
            <ul className="list-disc list-inside space-y-2 text-[15px] leading-relaxed">
              <li>
                <span className="font-semibold text-[#1f7a1f]">All natural source:</span>
                <br />
                Coconut flower sugar (low GI) combined with citrus fiber, replacing traditional
                sucrose, in line with the "no added sugar" claim.
              </li>
              <li>
                <span className="font-semibold text-[#1f7a1f]">
                  Fermentation derived sweeteners:
                </span>
                <br />
                Allulose is extracted from grains through lactic acid bacteria fermentation (naturally
                occurring, with only 10% of the calories as sucrose).
              </li>
            </ul>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex-1 border rounded-lg shadow-sm">
          <div className="border-t-4 border-green-800 rounded-t-lg"></div>
          <div className="p-6">
            <h3 className="font-semibold text-center mb-4">Additional Features</h3>
            <ul className="list-disc list-inside space-y-2 text-[15px] leading-relaxed">
              <li>
                <span className="font-semibold text-[#1f7a1f]">Antioxidant synergy:</span>
                <br />
                Honey+polyphenol extract (such as green tea extract) enhances antioxidant function in
                low candy sauce.
              </li>
              <li>
                <span className="font-semibold text-[#1f7a1f]">Emotion regulation:</span>
                <br />
                Adding South African eggplant extract, in conjunction with sweeteners, can alleviate
                the anxiety of "sweetness energy mismatch" that may be caused by sugar substitutes.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Core Products Section */}
      <div className="mt-10 bg-green-900 text-white text-center py-2 text-xl font-semibold">
        Core Products
      </div>

      <div className="overflow-x-auto px-4 lg:px-12 mb-12">
        <table className="w-full border border-gray-300 text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                Sweetener type
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                Sweetness (sucrose ratio)
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                Applicable scenarios
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                Advantage
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-3 font-semibold text-center">
                steviol glycoside
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                200-450 times
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                Beverages, baking, seasonings
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                Zero calorie, combined with erythritol to reduce overall costs
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 px-4 py-3 font-semibold text-center">
                mogroside
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                150-250 times
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                Dairy products, coffee, sauces
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                Natural sweetness curve, inhibits fat oxidation
              </td>
            </tr>

            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-3 font-semibold text-center">
                D-Allose
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                0.7 times (sweet like sucrose)
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                Candy, functional food
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                Participate in the Maillard reaction, suitable for baking and caramelization
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 px-4 py-3 font-semibold text-center">
                compositional formulation
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                Customized sweetness
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                Full category coverage
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                Multi component collaboration to achieve a balance between taste and cost
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SweetenerPage;
