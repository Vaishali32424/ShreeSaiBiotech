import React from "react";

interface Advantage {
  id: number;
  title: string;
  points: string[];
  image: string;
}

const advantages: Advantage[] = [
  {
    id: 1,
    title: "Technical Strength",
    points: [
      "A leading global producer of natural sweeteners with a vertically integrated sustainable agricultural management system",
      "Independent research and development of stevia glycoside, siraitia glycoside, alolose and other core raw materials, and flavor optimization through precise fermentation and compounding technology",
      "Annual production capacity exceeds 8000 tons, with cooperative customers covering more than 30 sub sectors such as food and beverage, dairy products, and pre made meals",
    ],
    image:
      "/assets/scientific01.png",
    // replace with your actual image link
  },
  {
    id: 2,
    title: "Certification And Innovation",
    points: [
      "Obtained international certifications such as FDA, ISO9001, ISO22000, kosher, halal, IFS, BRC, organic, etc., in line with the trend of clean labeling",
      "Innovative compound natural sweetness synergistic enhancement technology, solving problems such as bitterness and delayed sweetness after using a single natural sweetener",
    ],
    image:
      "/assets/scientific02.jpg", // replace with your actual image link
  },
];

const CompanyAdvantage: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 relative inline-block">
          Customized Sweetness Solution - Company Advantages
          <span className="block w-20 h-[2px] bg-green-700 mx-auto mt-2"></span>
        </h2>
        <p className="text-gray-500 mt-3">
          A natural sweetener supplier with over 25 years of experience
        </p>
      </div>

      {/* Advantages */}
      <div className="flex flex-col gap-16">
        {advantages.map((adv, idx) => (
          <div
            key={adv.id}
            className={`grid md:grid-cols-2 gap-8 items-center ${
              idx % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Left Content */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="border-l-4 border-green-700 pr-3 font-bold text-gray-900 ml-1">
                  {adv.title}
                </span>
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                {adv.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Right Image */}
            <div>
              <img
                src={adv.image}
                alt={adv.title}
                className="rounded-md w-full object-cover shadow-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanyAdvantage;
