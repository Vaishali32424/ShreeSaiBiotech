import React from "react";

const applications = [
  {
    id: "01",
    title: "Food & Beverage",
    image:
      "/assets/fruitsss.jpeg",
    points: [
      "Shree Sai Biotech Our Quality Control Lab is equipped with cutting-edge technology, including HPLC, GC-By UV , Etc,headspace, and spectrophotometry, to guarantee the highest quality standards for our products.",
      "Our expert technicians conduct thorough testing for identity, potency, purity, and microbiological safety, ensuring that each product meets rigorous safety and effectiveness criteria. ",
      "Our advanced R&D center seamlessly integrates state-of-the-art technology and scientific expertise to drive the development of innovative healthcare solutions.",
    ],
  },
  {
    id: "02",
    title: "Health Supplements",
    image:
      "/assets/fruits4.jpeg",
    points: [
      "Shree Sai Biotech has been a trusted provider of standardized herbal extracts in India. Their state-of-the-art manufacturing facility and network of raw material suppliers ensure quality and consistency.",
"Shree Sai Biotech caters to diverse clientele, from major pharmaceutical companies to traditional Ayurvedic practitioners, providing a one-stop shop for all your herbal extract Herbal Powder needs.",
    ],
  },
   {
    id: "03",
    title: "Baby Food",
    image:
      "/assets/fruits3.jpeg",
    points: [
      "Empowering Health with Sustainable Innovation",
      "The company is dedicated to new product development, specializing in liposomal formulations with botanicals, nutraceuticals, vitamins, and minerals.",
    ],
  },
    {
    id: "04",
    title: "Cosmetics",
    image:
      "/assets/fruits2.jpeg",
    points: [
      "Shree Sai Biotech is a reputed manufacturer and exporter of herbal cosmetic products and skin care products. Our range includes Rosehip  ,aloe vera gel,Cucumber gel, Papaya Gel, Orange Gel, Neem Gel, Undereye Gel,Anti Aging Gel, Aloe Turmeric Gel.Ginseng Gel.Sunflower ,Nirgundi,Kalonji ,Avocado ,Almond ,Babchi ,Olive ,Pain Relief Gel ,Etc.",
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
