import React from "react";

const FruitCards: React.FC = () => {
  return (
    <div className="bg-white py-12 px-4 md:px-12 lg:px-10">
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
          src="https://www.greenspringshop.com/uploads/18070/list/20251112141214f502b.jpg?size=1600x0"
            alt="Biotechnology"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="font-bold text-black mb-2">Case 1: Small-Batch Bakery in Canada</h3>
          <ul className=" text-sm text-gray-800">
            <li>
              <p>
Challenge: A family-owned bakery needed 50kg/month of custom "berry blend powder" (strawberry + raspberry) but struggled with high MOQs from suppliers.              </p>
            </li>
            <li className="mt-2">
              <p>
Solution: We offered flexible production (min 20kg/order) with consistent quality; adjusted the blend ratio to match their sweetness requirements.              </p>
            </li>
              <li className="mt-2">
              <p>
Result: The bakery launched a "Superfruit Muffin" line, boosting sales by 35% in 6 months; now orders 200kg/month.
</p>            </li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <img
            src="https://www.greenspringshop.com/uploads/18070/list/2025111214143325a76.jpg?size=800x0" // Replace with actual image URL
            alt="Nanocarrier technology"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="font-bold text-black mb-2">Case 2: Nutraceutical Brand in Australia</h3>
          <ul className=" text-sm text-gray-800">
            <li>
              <p>
Challenge: Required organic kale powder with 5% moisture (to avoid clumping in capsules) and EU organic certification for export.        
</p>    </li>
            <li className="mt-2">
              <p>
Solution: Used our freeze-drying technology to achieve 3% moisture; provided full certification docs (EU organic, microbiology reports).     </p>
            </li>
              <li className="mt-2">
              <p>
Result: The brand’s "Green Detox Capsules" passed EU import inspections; now accounts for 15% of their revenue.</p>            </li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <img
          src="https://www.greenspringshop.com/uploads/18070/list/202511121413061233a.jpg?size=1600x0"
            alt="Compounding technology"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="font-bold text-black mb-2">Case 3: Beverage Manufacturer in Japan</h3>
          <ul className="text-sm text-gray-800">
            <li>
              <p>
Challenge: Needed a stable, non-oxidizing matcha powder for bottled iced tea (to prevent color fading).
              </p>
            </li>
            <li className="mt-2">
              <p>
Solution: Modified our drying process to reduce oxidation; added a natural anti-caking agent (rice hull powder, FDA-approved).              </p>
            </li>
             <li className="mt-2">
              <p>
Result: The iced tea stayed vibrant for 12 months; became a top-selling product in Japanese convenience stores.            </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FruitCards;
