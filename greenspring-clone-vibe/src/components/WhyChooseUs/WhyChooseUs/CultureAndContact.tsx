import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import React from "react";

const CultureAndContact = ({ showCards = false,  }) => {
  const cultureItems = [
    {
      img: "https://www.greenspringshop.com/Content/uploads/2023389378/20231129102124d6fb0b51d6754fee816ef1cc6d1fcc43.jpg?size=554x0",
      title: "Corporate Objective",
      text: "Based on scientific research interated R&D; production and sales in one high-tech enterprises.",
    },
    {
      img: "https://www.greenspringshop.com/Content/uploads/2023389378/20231129102943189818d77c214b8bb390be7c63217d63.jpg?size=504x0",
      title: "Corporate Mission",
      text: `Believe in "quality create the healthy life" and contribute to the community and public health.`,
    },
    {
      img: "https://www.greenspringshop.com/Content/uploads/2023389378/20231129103122cb08ffd9146b4c60918ca82c6ad710ff.jpg?size=504x0",
      title: "Our Value",
      text: "Faithfulness\nResponsibility\nConcentration\nHarmony",
    },
    {
      img: "https://www.greenspringshop.com/Content/uploads/2023389378/20231129103527e75d0d83bad3426c88d92802a6f524cd.jpg?size=504x0",
      title: "Business Philosophy",
      text: "Work by conscience, be faithful to customers, be persistent and honest to careers.",
    },
  ];

const contactItems = [
  {
    icon: <Mail size={28} />,
    title: "Write to us",
    desc: "Our email address: info@shreesaibiotech.com",
    link: "mailto:info@shreesaibiotech.com"
  },
  {
    icon: <MapPin size={28} />,
    title: "Visiting us",
      desc: "2nd Floor, Ms-A, Shop A 212, VIP Marg, Mall Godown Road, New Siyaganj, Indore - 452007, Madhya Pradesh, India.",
    link: "https://maps.google.com/?q=ShreeSaiBiotech,Indore"
  },
  {
    icon: <MessageCircle size={28} />,
    title: "Whatsapp & Telephone",
    desc: "Whatsapp : +91-8989496905 & Telephone: 0731-4022477",
    link: "https://wa.me/918989496905"
  },
  {
    icon: <Phone size={28} />,
    title: "Contact directly at our Office",
      desc: "Mfg: Facilty Address : Plot No. 368-369 Dharmat Road,sanwer,Indore , 452001-madhya Pradesh, India",
    link: "tel:+917314022477"
  },
];


  return (
    <>
      {/* ✅ Only show Culture cards when showCards is true */}
      {showCards && (
        <div className="w-full py-12">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-2">
            Our Culture
          </h2>
          <div className="w-12 h-1 bg-green-700 mx-auto mb-10"></div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-10">
            {cultureItems.map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-md transform transition duration-300 hover:scale-105"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent text-black p-4 flex flex-col justify-end">
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm whitespace-pre-line">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Only show Contact boxes when showButtons is true */}
        <div className="w-full py-12 bg-gray-50">
          {/* Title */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-12 h-1 bg-green-700 mb-2"></div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              We Are Here For You
            </h2>
            <p className="text-gray-600">Natural Health Creates Better Life</p>
          </div>

          {/* Contact Boxes */}
   <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-10">
  {contactItems.map((item, index) => (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      key={index}
      className="group cursor-pointer border border-green-700 rounded-lg p-6 text-center shadow-sm hover:shadow-md transform transition duration-300 ease-in-out hover:scale-90"
    >
      <div className="text-green-700 mb-3 flex justify-center transform transition duration-500 group-hover:-scale-x-100">
        {item.icon}
      </div>

      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>

      <p className="text-sm text-gray-700">{item.desc}</p>
    </a>
  ))}
</div>

        </div>
    </>
  );
};

export default CultureAndContact;
