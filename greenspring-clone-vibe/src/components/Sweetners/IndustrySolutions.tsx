import React from "react";

const IndustrySolutions: React.FC = () => {
  const cards = [
    {
      img: "assets/beverage.webp",
      title: "Beverage industry",
      points: [
        {
          label: "Sugar free beverage",
          text: "Provides a stevia complex solution, suitable for carbonated water, tea drinks, and functional beverages, balancing sweetness and refreshing taste.",
        },
        {
          label: "Dairy products",
          text: "Arhat fruit glycoside+dietary fiber program, to enhance the natural sweetness of yogurt and milk drinks, while strengthening the prebiotic function.",
        },
      ],
    },
    {
      img: "https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=900&q=80",
      title: "Baking and snack food",
      points: [
        {
          label: "Low sugar baking",
          text: "A combination of stevia and maltitol to reduce the sugar content of bread and cookies, while maintaining a fluffy texture and sweetness.",
        },
        {
          label: "Healthy snacks",
          text: "The application of Alolouse in chocolate and energy bars reduces calories and delays fat oxidation.",
        },
      ],
    },
    {
      img: "assets/seasoning.webp",
      title: "Seasoning and pre made dishes",
      points: [
        {
          label: "Sauce and pickled food",
          text: "Natural sweetener replaces sucrose to improve the stability of shelf life (such as the application of Arhat fruit glycoside in stew).",
        },
      ],
    },
  ];

  return (
    <div className="w-full bg-white text-[#1a1a1a] font-[Inter] px-4 lg:px-16 ">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold mb-2">Industry Solutions</h2>
        <div className="w-16 h-[3px] bg-green-700 mx-auto mb-3 rounded"></div>
        <p className="text-gray-700">Customized Sweetness Solution</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md transition-all duration-200"
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-5">
              <h3 className="font-semibold text-[16px] mb-3">
                {card.title}
              </h3>
              <div className="space-y-2 text-[15px] leading-relaxed">
                {card.points.map((point, i) => (
                  <p key={i}>
                    <span className="text-green-700 font-medium underline underline-offset-2">
                      {point.label}:
                    </span>{" "}
                    {point.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustrySolutions;
