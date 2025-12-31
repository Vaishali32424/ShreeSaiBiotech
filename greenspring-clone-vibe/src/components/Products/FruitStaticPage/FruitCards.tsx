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
          src="/assets/abcd.jpeg"
            alt="Biotechnology"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          {/* <h3 className="font-bold text-black mb-2">Case 1: Small-Batch Bakery in Canada</h3> */}
          <ul className=" text-md text-gray-800">
            <li>
              <p>
Herbal or say herb powders made at ssb Ayurveda vitals are multipurpose in nature as these powders can be used for multiple purposes as food, flavour, skin care, supplement etc. For example herb powders like khus, peppermint, lavender, chamomile, rose, marigold etc. can be used in food as well as skin care.       </p>     </li>
  
          </ul>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <img
          src="/assets/pills.jpeg"
            alt="Nanocarrier technology"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <ul className=" text-md text-gray-800">
            <li>
              <p>
All our products are 99.99% pure and 100% organic in nature. We are from among India’s leading companies operating in certified organic products industry.</p>    </li>
            <li className="mt-2">
              <p>
Ours is still bit different from other companies in respect that not all companies have direct contracts with the farmers involved in organic farming. This is quite important because it gives us assurance of our products being 100% organic and in turn we can assure our esteemed customers for the nature of products we offer. Our company has come a long way to establish itself as one of the leading supplier of the Indian organic spices and various agro products to national/international market.  </p>
            </li>

          </ul>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <img
          src="/assets/bottles.jpeg"
            alt="Compounding technology"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <ul className="text-md text-gray-800">
            <li>
              <p>
Shree Sai Biotech are foremost Importer, Trader, Exporter and Manufacturer of a variety of Extract Powder, Natural Extracts, Natural Nutraceuticals, Packed Horse Chestnut and many more. Offered variety is accessible in numerous forms according to the exact wants and requirements of our respected customers. Provided products are extensively recognized owing to its attributes.              </p>
            </li>
          
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FruitCards;
