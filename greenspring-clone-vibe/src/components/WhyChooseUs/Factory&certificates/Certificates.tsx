const Certificates = () => {
  const certificates = [
    {
      img: "/assets/Certificates/BRC.jpeg",
      src: "/pdfs/BRC.pdf",
      title: "BRC",
    },
    {
      img: "/assets/Certificates/BusinessTrust.jpeg",
      src: "/pdfs/IFS.pdf",
      title: "Business Trust",
    },
    {
      img: "/assets/Certificates/ISO2015-2018.jpeg",
      src: "/pdfs/ISO2015-2018.pdf",
      title: "ISO:2015-2018",
    },
    {
      img: "/assets/Certificates/Exporter.jpeg",
      src: "/pdfs/Exporter.pdf",
      title: "Exporter",
    },
    {
      img: "/assets/Certificates/FASSAI.jpeg",
      src: "/pdfs/FASSAI.pdf",
      title: "FASSAI",
    },
    {
      img: "/assets/Certificates/FSSC-22000.jpeg",
      src: "/pdfs/FSSC-22000.pdf",
      title: "FSSC-22000",
    },
    {
      img: "/assets/Certificates/WHO-GMP.jpeg",
      src: "/pdfs/WHO-GMP.pdf",
      title: "WHO-GMP",
    },

    {
      img: "/assets/Certificates/KOSHER.jpeg",
      src: "/pdfs/KOSHER.pdf",
      title: "KOSHER",
    },
    {
      img: "/assets/Certificates/HALAL.jpeg",
      src: "/pdfs/HALAL.pdf",
      title: "HALAL",
    },
    {
      img: "/assets/Certificates/ORGANIC.jpeg",
      src: "/pdfs/ORGANIC.pdf",
      title: "ORGANIC",
    },
    {
      img: "/assets/Certificates/NON-GMO.jpeg",
      src: "/pdfs/NON-GMO.pdf",
      title: "NON-GMO",
    },
    {
      img: "/assets/Certificates/HACCp.jpeg",
      src: "/pdfs/HACCp.pdf",
      title: "HACCP",
    },
    {
      img: "/assets/Certificates/URC.jpeg",
      src: "/pdfs/URC.pdf",
      title: "URC",
    },
    {
      img: "/assets/Certificates/URC.jpeg",
      src: "/pdfs/URC.pdf",
      title: "URC",
    },
    {
      img: "/assets/Certificates/LD GoMP.jpeg",
      src: "/pdfs/LD GoMP.pdf",
      title: "LD GoMP",
    },
  

    {
      img: "/assets/Certificates/E N P T.jpeg",
      src: "/pdfs/E N P T.pdf",
      title: "E N P T",
    },
      {
      img: "/assets/Certificates/LNumber.jpeg",
      src: "/pdfs/LNumber.pdf",
      title: "L: Number:20B",
    },
    {
      img: "/assets/Certificates/LNumber.jpeg",
      src: "/pdfs/LNumber.pdf",
      title: "L: Number:21B",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-8xl mx-auto">
        <div className="bg-teal-700 text-white text-center py-3 rounded-md font-bold text-lg">
          CERTIFICATES
        </div>

        <p className="text-center text-gray-700 max-w-4xl mx-auto mb-10 mt-5">
          The company always adheres to the corporate mission of creating a
          healthy life, strictly controls product quality, and is certified with
          ISO9001, Halal, and Kosher certificates. We continuously make
          innovations and developments and have been recognized as a high-tech
          enterprise for many consecutive years.
        </p>

        {/* Certificates Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4">
          {certificates.map((cert, index) => (
            <a
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group transition-transform duration-300"
            >
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-md border border-gray-200 group-hover:shadow-lg group-hover:scale-[1.03] transition">
                <img
                  src={cert.img}
                  alt={cert.title}
                  loading="lazy"
                  className="object-cover filter blur-[2px] transition duration-300 "
                />
              </div>
              <p className="mt-2 text-gray-800 bg-black/15 w-full text-center font-semibold text-sm">
                {cert.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
