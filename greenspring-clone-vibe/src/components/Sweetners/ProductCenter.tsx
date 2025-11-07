import React from "react";

type Product = {
  name: string;
  description: string;
  image: string;
  label: string;
  readMoreLink?: string;
};

const products: Product[] = [
  {
    name: "Stevia Extract Powder",
    description:
      "Stevia glycosides 80%–95%, RA40%–99%, RA95%, RM95%. Glucose based stevia glycosides 80%–95%.",
    image: "/images/stevia.png", // Replace with real image paths
    label: "STEVIA EXTRACT",
    readMoreLink: "#",
  },
  {
    name: "Erythritol Powder",
    description: "ASSAY: ≥99.0%. Appearance: white crystalline powder.",
    image: "/images/erythritol.png",
    label: "Erythritol",
    readMoreLink: "#",
  },
  {
    name: "D-Allose Powder",
    description: "ASSAY: ≥99.0%. Appearance: white crystalline powder.",
    image: "/images/d-allose.png",
    label: "D-Allose",
    readMoreLink: "#",
  },
  {
    name: "Monk Fruit Extract",
    description:
      "Active ingredients: Mogroside V / Mogrosides. Specification: 20%-50% Mogroside V.",
    image: "/images/monk-fruit.png",
    label: "Monk Fruit Extract",
    readMoreLink: "#",
  },
  {
    name: "D-Mannitol Powder",
    description: "Specification: 98%. Appearance: white powder",
    image: "/images/d-mannitol.png",
    label: "D-Mannitol Powder",
    readMoreLink: "#",
  },
  {
    name: "D-Tagatose Powder",
    description:
      "Assay (HPLC) ≥ 99.0%. Appearance: White or almost white crystalline",
    image: "/images/d-tagatose.png",
    label: "D-TAGATOSE POWDER",
    readMoreLink: "#",
  },
  {
    name: "Inulin Powder",
    description:
      "Specification: 90% inulin. Appearance: White to yellowish powder",
    image: "/images/inulin.png",
    label: "Inulin Powder",
    readMoreLink: "#",
  },
  {
    name: "L-Arabinose Powder",
    description:
      "Active substance content: 99%. Appearance: White or almost white crystalline",
    image: "/images/l-arabinose.png",
    label: "L-ARABINOSE POWDER",
    readMoreLink: "#",
  },
  {
    name: "Stevia Glycosides Rebaudioside D",
    description:
      "Specification: Rebaudioside D 95%. Appearance: fine white powder",
    image: "/images/reb-d.png",
    label: "Rebaudioside D",
    readMoreLink: "#",
  },
  {
    name: "Fructo Oligosaccharides Powder",
    description: "Specification: 95% HPLC. Appearance: White powder",
    image: "/images/fructo-oligosaccharides.png",
    label: "GREEN SPRING",
    readMoreLink: "#",
  },
  {
    name: "Stevia Glycosides Rebaudioside A",
    description:
      "Specification: Rebaudioside A 20%-90%. Appearance: fine white powder",
    image: "/images/reb-a.png",
    label: "Rebaudioside A",
    readMoreLink: "#",
  },
  {
    name: "Stevia Glycosides Rebaudioside M",
    description:
      "Specification: Rebaudioside M 95%. Appearance: fine white powder",
    image: "/images/reb-m.png",
    label: "Rebaudioside M",
    readMoreLink: "#",
  },
];

const ProductCenter: React.FC = () => {
  return (
    <div className="bg-white px-4 md:px-16 py-12">
      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="bg-white p-6 shadow border text-sm">
          <h3 className="text-lg font-semibold mb-2">
            Interested in Sweetener?
          </h3>
          <p className="mb-4">
            Shree Sai Biotech® has over 23 years of partner relationships,
            industry expertise, innovation and service that everyone at Shree
            Sai Biotech® brings to our customers each and every day. Contact us
            for your nutraceutical and pharmaceutical solutions:
          </p>
       <ul className="space-y-2 text-sm">
  <li>
    <strong>Our Address</strong>
    <br />
    2nd Floor, Ms-A, Shop A 212, VIP Marg, Mall Godown Road, New Siyaganj,
    Indore - 452007, Madhya Pradesh, India
  </li>
  <li>
    <strong>Whatsapp</strong>
    <br />
    <a
      href="https://wa.me/918989496905"
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
    >
      +91-8989496905
    </a>
  </li>
  <li>
    <strong>E-Mail</strong>
    <br />
    <a
      href="mailto:info@shreesaibiotech.com"
      className="text-primary hover:underline"
    >
      info@shreesaibiotech.com
    </a>
  </li>
</ul>

        </div>
        <img
          src="/assets/steviaplant.webp"
          alt="Stevia Plant"
          className="w-full h-auto object-cover rounded"
        />
      </div>

      {/* Product Center */}
      <div className="bg-green-800 text-white py-2 px-4 text-center font-semibold text-lg">
        Product Center
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="border rounded shadow hover:shadow-md transition overflow-hidden"
          >
            {/* Top label */}
            <div className="bg-green-700 text-white text-xs font-bold py-1 px-2 flex justify-between items-center">
              <span>{product.label}</span>
              {/* Optional: Add certification icons here */}
            </div>

            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain bg-white"
            />

            {/* Info */}
            <div className="p-4 text-sm text-gray-800">
              <h4 className="font-semibold mb-1">{product.name}</h4>
              <p className="my-2">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCenter;
