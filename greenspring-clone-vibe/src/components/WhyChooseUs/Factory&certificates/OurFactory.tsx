const OurFactory = () =>  {
  
  
  const images = [
    "/assets/laboratory.jpeg",
    "/assets/factory.jpeg",
     "/assets/shreesaioffice.jpeg",
     "/assets/factory3.jpeg",
     "/assets/factory4.jpeg",
     "/assets/factory6.jpeg",
          "/assets/factory7.jpeg",

    "https://www.greenspringshop.com/Content/uploads/2021389378/20210520090157d55f282d68044b27bd0b703d071a585e.jpg",
  
  ];

  return (
    <section className="py-12  ">
      {/* Title */}
      <div className="bg-teal-700 text-white text-center py-3 rounded-md font-bold">
        OUR FACTORY
      </div>

      {/* Description */}
      <p className="text-center text-gray-700 mt-4 max-w-5xl mx-auto">
      The company has a Plant factory covering an area of more than 480 mu(60 acres), with advanced extraction equipment and mature extraction technology, and continuous cooperates with university research units to ensure product research and development, and strengthen product quality.
      </p>

      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {images.map((src, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg shadow-md transform transition duration-300 hover:scale-105"
          >
            <img
              src={src}
              alt={`Factory ${i + 1}`}
              className="w-full h-48 md:h-56 object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default OurFactory;