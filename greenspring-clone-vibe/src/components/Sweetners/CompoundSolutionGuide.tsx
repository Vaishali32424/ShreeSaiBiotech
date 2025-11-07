import React from "react";

const CompoundingSolutionGuide: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto font-sans text-gray-800">
      {/* Table Section */}
      <h2 className="text-2xl font-semibold mb-4">
        Compounding Solution Selection Guide
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100 font-semibold">
            <tr>
              <th className="border border-gray-300 px-4 py-2">
                Demand scenario
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Recommended Solution
              </th>
              <th className="border border-gray-300 px-4 py-2">Daily limit</th>
              <th className="border border-gray-300 px-4 py-2">Precautions</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                scenario: "Diabetes-friendly beverages",
                solution: "Stevia + Monk Fruit",
                limit: "≤4mg/kg weight",
                precaution: "Avoid mixing with aspartame",
              },
              {
                scenario: "Texture optimization of baked goods",
                solution: "Stevia + Erythritol",
                limit: "≤50g Erythritol",
                precaution: "Excessive intake may cause bloating",
              },
              {
                scenario: "Anti-crystallization of frozen desserts",
                solution: "Monk Fruit + Erythritol",
                limit: "No restrictions",
                precaution:
                  "Xanthan gum needs to be added to maintain viscosity",
              },
              {
                scenario: "Functional foods (prebiotics)",
                solution: "Stevia + Yacon Powder",
                limit: "≤20g Yacon Powder",
                precaution:
                  "The plant flavor is strong and needs to be paired with vanilla spices",
              },
              {
                scenario: "High temperature processed food",
                solution: "Sucralose + Erythritol",
                limit: "≤5mg/kg weight",
                precaution: `"Artificial sweeteners" must be labeled`,
              },
            ].map((row, idx) => (
              <tr key={idx} className="border-t border-gray-200">
                <td className="border px-4 py-2">{row.scenario}</td>
                <td className="border px-4 py-2">{row.solution}</td>
                <td className="border px-4 py-2">{row.limit}</td>
                <td className="border px-4 py-2">{row.precaution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Development Process */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-center mb-2">
          Customized Development Process
        </h2>
        <p className="text-center mb-10 text-gray-600">
          Customized Sweetness Solution
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-10 h-10 mx-auto rounded-full border-2 border-green-600 flex items-center justify-center text-green-600 font-bold mb-4">
              1
            </div>
            <h3 className="font-semibold mb-2">Requirement Analysis</h3>
            <p>
              <span className="font-semibold text-green-700">Customer goals:</span> sugar
              reduction ratio, cost budget, regulatory compliance (such as
              FDA/EFSA standards).
            </p>
            <p className="mt-2">
              <span className="font-semibold text-green-700">Product types:</span>{" "}
              Beverages, dairy products, baking, etc. Different categories have
              different requirements for sweetness curves (such as carbonated
              beverages that require quick sweetness).
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-10 h-10 mx-auto rounded-full border-2 border-green-600 flex items-center justify-center text-green-600 font-bold mb-4">
              2
            </div>
            <h3 className="font-semibold mb-2">Formula Design</h3>
            <p>
              <span className="font-semibold text-green-700">Compound technology:</span>{" "}
              Combining the synergistic effect of sweeteners (such as reducing
              bitterness with stevia and allulose).
            </p>
            <p className="mt-2">
              <span className="font-semibold text-green-700">Flavor optimization:</span>{" "}
              add organic acids (malic acid, citric acid) to mask the odor, or
              match with essence to enhance the sense of hierarchy.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-10 h-10 mx-auto rounded-full border-2 border-green-600 flex items-center justify-center text-green-600 font-bold mb-4">
              3
            </div>
            <h3 className="font-semibold mb-2">Production And Testing</h3>
            <p>
              <span className="font-semibold text-green-700">Stability verification:</span>{" "}
              pH value and temperature tolerance testing (such as the
              application of stevia in high-temperature sterilized dairy
              products).
            </p>
            <p className="mt-2">
              <span className="font-semibold text-green-700">Sensory evaluation:</span>{" "}
              Consumers conduct blind testing to ensure that the sweetness and
              taste are consistent with the benchmark product.
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-10 h-10 mx-auto rounded-full border-2 border-green-600 flex items-center justify-center text-green-600 font-bold mb-4">
              4
            </div>
            <h3 className="font-semibold mb-2">Mass Production Support</h3>
            <p>
              Provide guidance on production process parameters (such as
              optimizing fermentation processes for mass production of sweet
              protein)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundingSolutionGuide;
