import { FaShieldAlt, FaRegHeart, FaTools, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import heroPlant from "/assets/hero-plant.jpg";
import secondImage from "/assets/hero-plant-03.jpg";

const slides = [
  {
    image: heroPlant,
    title: "Botanical Extract Supplier",
    description: (
      <>
        <p className="mb-2 sm:mb-3">
          <strong>Shree sai Bio tech</strong> is a leading manufacturer and supplier
        </p>
        <p>
          of high-quality botanical extracts for<br className="hidden sm:block" />
          Supplements, Food/Beverage, Cosmetic and Personal Care industries.
        </p>
      </>
    ),
  },
  {
    image: secondImage,
    title: "Natural Ingredients, Pure Quality",
    description: (
      <>
        <p className="mb-2 sm:mb-3">
          Sourcing nature’s finest elements for your products.
        </p>
        <p>Trusted by global brands in nutrition, skincare, and health.</p>
      </>
    ),
  },
];

const cardData = [
  {
    icon: <FaShieldAlt className="text-3xl text-green-600 mb-3 mx-auto" />,
    title: "QUALITY ASSURANCE",
    text: "Strict quality assurance system from raw material, production and finished...",
  },
  {
    icon: <FaRegHeart className="text-3xl text-green-600 mb-3 mx-auto" />,
    title: "PROFESSIONAL",
    text: "Professional explanation of pre-sales products and after-sale perfect service system.",
  },
  {
    icon: <FaTools className="text-3xl text-green-600 mb-3 mx-auto" />,
    title: "OEM SERVICE",
    text: "OEM service with customized formulation and packing.",
  },
  {
    icon: <FaStar className="text-3xl text-green-600 mb-3 mx-auto" />,
    title: "WELL-EXPERIENCED",
    text: "More than 37 Years of experience in exporting to more than 80 Countries.",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative">
      {/* Hero Section */}
      <div className="relative h-[500px] sm:h-[550px] lg:h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${currentSlide.image})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 h-full flex justify-center items-center text-center">
          <div className="w-full max-w-3xl text-white">
            {/* Certifications */}
            <div className="flex justify-center flex-wrap gap-2 mb-4 sm:mb-6">
              {["ISO", "BRC", "CA", "BRCS", "IFS", "K", "HALAL"].map((label) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-6 leading-tight">
              {currentSlide.title}
            </h1>

            {/* Description */}
            <div className="text-white/90 text-base sm:text-lg leading-relaxed px-2 sm:px-0">
              {currentSlide.description}
            </div>

            {/* Dots */}
            <div className="flex justify-center space-x-2 mt-6 sm:mt-8">
              {slides.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-colors ${
                    currentIndex === index
                      ? "bg-primary"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-colors"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-colors"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Cards Section */}
      <div className="relative -mt-16 sm:-mt-20 lg:-mt-24 z-20 px-4 sm:px-10 lg:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 max-w-6xl mx-auto">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md border-b-green-700 border-b-2 p-4 sm:p-2 flex sm:flex-row items-center gap-4 transition-transform duration-300 group hover:translate-y-2 hover:shadow-xl"
            >
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-green-100 transition">
                <span className="text-green-600">{card.icon}</span>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-base sm:text-lg mb-1">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
