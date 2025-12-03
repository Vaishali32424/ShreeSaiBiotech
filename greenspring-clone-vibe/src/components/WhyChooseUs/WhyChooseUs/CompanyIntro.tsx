import React from "react";

const statsData = [
  { value: "37Y", label: "Industry Experience" },
  { value: "5000+", label: "Product Variety" },
  { value: "90+", label: "Country and Region" },
  { value: "1790+", label: "Satisfied Clients" },
];

const CompanyIntro = () => {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto  py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 leading-snug">
              <span className="text-primary text-[50px] pt-6">37+</span > More Than 37 Years
              Botanical Extract Supplier
            </h2>

            <p className="mt-4 text-gray-700 leading-relaxed text-justify">
              <span className="text-green-700 font-bold">
Ayurvedic Herbal Powder Manufacturers  Botanical Extract 37 More Than 37 Years Botanical Extract Supplier<sup></sup>
              </span>{" "}
           SHREE SAI ®Indore Shree sai biotech Technology . was established in 1988, We are an excellent supplier specializing in plant extracts for 37 years. For more than decade, we has been committing to the innovation and development of modernization technology of traditional India Ayurvedic Herbal Powder Manufacturers  medicine, as well as the research and development and extraction of plant active ingredients. The company's main products are saw palmetto extract, stevia, natural ferulic acid, berberine HCL (berberine hydrochloride) and other products, Which are widely used in food, pharmaceuticals, health supplements, cosmetics and other fields.
            </p>
          </div>

          {/* Right Image */}
           <div className="w-full h-full">
    <img
      src="/assets/factory7.jpeg"
      alt="Company Factory"
      className="rounded-lg shadow-lg w-full h-full object-contain"
    />
  </div>
        </div>

        {/* Bottom Stats Section */}
<div className="relative mt-12">
  {/* Stats Content with background image */}
  <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8 rounded-lg shadow overflow-hidden">
    {/* Background Image */}
    <img
      src="https://www.greenspringshop.com/images/modular/134/modular-2.webp"
      alt="Background Map"
      className="absolute inset-0 w-full h-full object-cover -z-10 opacity-100" // 👈 only inside bg
    />

    {/* White overlay (optional for readability) */}
    <div className="absolute inset-0 bg-white bg-opacity-70 -z-10"></div>

    {/* Stats */}
    {statsData.map((item, index) => (
      <div key={index} className="flex flex-col items-center text-center">
        <div className="text-3xl font-bold text-green-600">{item.value}</div>
        <div className="mt-2 text-gray-800 font-medium">{item.label}</div>
      </div>
    ))}
  </div>
</div>


      </div>
    </div>
  );
};

export default CompanyIntro;
