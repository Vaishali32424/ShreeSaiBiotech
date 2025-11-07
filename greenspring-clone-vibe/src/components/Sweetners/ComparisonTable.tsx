import React from "react";

const ComparisonTable: React.FC = () => {
  const data = [
    {
      combination: "Stevia + Monk Fruit",
      sweetness: "200–300X",
      ratio: "0.8% Stevia + 1.2% Monk Fruit",
      areas: "Beverages, baking",
      advantages:
        "Zero calories, masks bitterness, synergistic antioxidant",
      basis: "Patented formula improves taste stability",
    },
    {
      combination: "Stevia + Erythritol",
      sweetness: "200X",
      ratio: "0.85% Stevia + 99.15% Erythritol",
      areas: "Yogurt, sauces",
      advantages:
        "1:1 replacement of sucrose, inhibiting ice crystal formation (frozen food)",
      basis: "Erythritol metabolism is not dependent on insulin",
    },
    {
      combination: "Monk Fruit + Erythritol",
      sweetness: "150–200X",
      ratio: "2% Monk Fruit + 98% Erythritol",
      areas: "Energy bars, meal replacements",
      advantages:
        "Low glycemic index, prevents dental caries, and is cost-effective",
      basis: "Clinical trials demonstrate intestinal tolerance",
    },
    {
      combination: "Stevia + Yacon powder",
      sweetness: "200X",
      ratio: "1% Stevia + 15% Yacon powder",
      areas: "Cookies, energy balls",
      advantages:
        "High dietary fiber (30%), regulating intestinal flora",
      basis: "Prebiotic properties of yacon oligofructose",
    },
    {
      combination: "Sucralose + Erythritol",
      sweetness: "600X",
      ratio: "0.5% Sucralose + 99.5% Erythritol",
      areas: "Carbonated drinks, candy",
      advantages:
        "High thermal stability (>200°C), zero aftertaste",
      basis: "FDA GRAS certification",
    },
  ];

  return (
    <div className="min-h- bg-white px-6 py-3 sm:px-12 md:px-24">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
        Comparison table of natural sugar substitutes and compound solutions
      </h1>

      <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm text-gray-800 border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-semibold border-r">
                Combination of ingredients
              </th>
              <th className="px-4 py-3 text-left font-semibold border-r">
                Sweetness (vs sucrose)
              </th>
              <th className="px-4 py-3 text-left font-semibold border-r">
                Recommended ratio
              </th>
              <th className="px-4 py-3 text-left font-semibold border-r">
                Application Areas
              </th>
              <th className="px-4 py-3 text-left font-semibold border-r">
                Core Advantages
              </th>
              <th className="px-4 py-3 text-left font-semibold">
                Scientific basis
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 1 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-4 align-top border-r font-medium">
                  {row.combination}
                </td>
                <td className="px-4 py-4 align-top border-r">{row.sweetness}</td>
                <td className="px-4 py-4 align-top border-r">{row.ratio}</td>
                <td className="px-4 py-4 align-top border-r">{row.areas}</td>
                <td className="px-4 py-4 align-top border-r">{row.advantages}</td>
                <td className="px-4 py-4 align-top">{row.basis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
