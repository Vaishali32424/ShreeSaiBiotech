import React from "react";
import { CheckCircle } from "lucide-react";

const labTests = [
  "Physical test",
  "Herbal active ingredients test",
  "Pesticides residue test",
  "Heavy metals test",
  "Solvents residue test",
  "Microbiological test",
  "Conventional indicators analysis",
  "Nutrition labels testing",
  "Plasticizer GC-MS",
  "Polycyclic aromatic hydrocarbons testing GC-MS",
];

const documents = [
  "Certificate of Analysis",
  "Technical Data Sheets (TDS)",
  "MSDS",
  "Allergen test charts & statements",
];

const QualityAssurance = () => {
  return (
    <div className="max-w-7xl mx-auto my-12  ">
      {/* Title */}
      <h2 className="text-center text-xl font-bold mb-6 flex items-center">
        <span className="flex-grow border-t border-gray-300"></span>
        <span className="px-4">Quality Assurance</span>
        <span className="flex-grow border-t border-gray-300"></span>
      </h2>

      {/* Top Row */}
      <div className="grid md:grid-cols-2 gap-8 items-start mb-10 bg-gray-50  p-4">
        {/* Left Image */}
        <img
          src="https://www.greenspringshop.com/Content/uploads/2023389378/2023101908541404603d2d94ad4ac4bcdd0d0796fd5e17.png?size=600x0"
          alt="Lab"
          className="w-full h-[300px] object-cover rounded"
        />

        {/* Right List */}
        <div>
          <h3 className="font-bold mb-4">
            How to ensure quality in Laboratory
          </h3>
          <ul className="space-y-2 text-gray-700">
            {labTests.map((test, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                <span>{test}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">
            According to BP,CP,EP,USP,JP
          </p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid md:grid-cols-2 gap-8  bg-gray-50 items-start p-4">
        {/* Left Docs */}
        <div>
          <h3 className="font-bold mb-4">
            Available Documents and Information
          </h3>
          <ul className="space-y-2 text-gray-700">
            {documents.map((doc, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                <span className=" cursor-pointer">
                  {doc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Image */}
        <img
        src="https://www.greenspringshop.com/Content/uploads/2023389378/20231019092656c89bf1d296544997a6d19c60fc959508.jpg?size=594x0"
          alt="Equipment"
          className="w-full h-[300px] object-cover rounded"
        />
      </div>
    </div>
  );
};

export default QualityAssurance;
