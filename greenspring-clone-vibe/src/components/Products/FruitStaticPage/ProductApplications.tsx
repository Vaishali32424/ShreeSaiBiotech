import React from "react";

const applications = [
  {
    id: "01",
    title: "Food & Beverage",
    image:
      "https://www.greenspringshop.com/uploads/18070/list/202511121402282e9bd.jpg?size=1600x0",
    points: [
      "Baking: Add spinach powder to bread dough for a nutrient boost; mix strawberry powder into cake batter for natural sweetness and color.",
      "Smoothies & Juices: Blend banana powder with milk for a creamy base; mix beetroot powder into juices for vibrant color and iron.",
      "Snacks: Coat nuts with carrot powder for a savory crunch; incorporate kale powder into chips for a “superfood” label.",
    ],
  },
  {
    id: "02",
    title: "Health Supplements",
    image:
      "https://www.greenspringshop.com/uploads/18070/list/2025111214024458b7d.jpg?size=1600x0",
    points: [
      "Capsules & Tablets: Concentrated broccoli powder (rich in sulforaphane) for immune support; pumpkin seed powder (high in zinc) for wellness products",
"Meal Replacements: Custom fruit and vegetable powder blends (e.g., apple + spinach + spirulina) for protein shakes or meal replacement bars.",
    ],
  },
   {
    id: "03",
    title: "Baby Food",
    image:
      "https://www.greenspringshop.com/uploads/18070/list/20251112140311101a9.jpg?size=1600x0",
    points: [
      "Capsules & Tablets: Concentrated broccoli powder (rich in sulforaphane) for immune support; pumpkin seed powder (high in zinc) for wellness products",
"Meal Replacements: Custom fruit and vegetable powder blends (e.g., apple + spinach + spirulina) for protein shakes or meal replacement bars.",
    ],
  },
    {
    id: "04",
    title: "Cosmetics",
    image:
      "https://www.greenspringshop.com/uploads/18070/list/20251112140339ac4ff.jpg?size=1600x0",
    points: [
      "Skincare: Tomato powder (lycopene) for anti-aging serums; cucumber powder for soothing masks.",
    ],
  },
     {
    id: "05",
    title: "Catering & HoReCa",
    image:
      "https://www.greenspringshop.com/uploads/18070/list/2025111214035868035.jpg?size=1600x0",
    points: [
      "Restaurants: Use matcha powder (green tea, a type of vegetable-derived powder) in desserts; dust dishes with turmeric powder for color and flavor.",
    ],
  },
];

const ProductApplications = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* HEADING */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-semibold mb-4">
          Product Applications
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Our fruit and vegetable powder is a versatile ingredient across
          industries, integrating seamlessly into diverse production lines:
        </p>
      </div>

      {/* CARDS */}
      <div className="space-y-24">
        {applications.map((app, index) => {
          const isOdd = index % 2 !== 0;

          return (
            <div
              key={app.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                isOdd ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* IMAGE */}
              <div className={isOdd ? "lg:order-2" : ""}>
                <img
                  src={app.image}
                  alt={app.title}
                  className="rounded-2xl w-full h-[360px] object-cover"
                />
              </div>

              {/* TEXT */}
              <div className={isOdd ? "lg:order-1" : ""}>
                <span className="text-green-700 text-4xl font-semibold block mb-4">
                  {app.id}
                </span>

                <h3 className="text-2xl font-semibold mb-6">
                  {app.title}
                </h3>

                <ul className="space-y-4 text-gray-700 leading-relaxed">
                  {app.points.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductApplications;
