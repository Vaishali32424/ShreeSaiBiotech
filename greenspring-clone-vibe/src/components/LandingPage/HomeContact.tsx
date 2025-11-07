import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

const HomeContact = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center py-12"
      style={{
        backgroundImage:
         "url('https://www.greenspringshop.com/uploads/202318070/ImgScroll/ba4250654d-0e66-4183-8ccf-85bc6c58b815.jpg')",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10 px-6">
        {/* Left Side */}
        <div className="w-full md:w-1/2 flex flex-col">
          {/* Image */}
          <div className="relative w-full">
            <img
            src="https://www.shutterstock.com/image-photo/female-scientist-working-modern-laboratory-600nw-2460081623.jpg"
              alt="relation"
              className="w-full h-auto rounded-md object-cover"
            />
          </div>

          {/* Counters */}
          <div className="flex justify-between mt-6 text-center text-white">
            <div>
              <p className="text-3xl font-bold">2000+</p>
              <p className="text-sm">Product Variety</p>
            </div>
            <div>
              <p className="text-3xl font-bold">100+</p>
              <p className="text-sm">Country and Region</p>
            </div>
            <div>
              <p className="text-3xl font-bold">2450+</p>
              <p className="text-sm">Satisfied Clients</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 bg-white/0 flex flex-col">
          {/* Phone Icon */}
          <div className="mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white text-lg shadow-md">
              <FaPhoneAlt />
            </div>
          </div>

          {/* Email */}
          <p className="text-lg md:text-xl font-semibold text-green-700 mb-4">
            <a href="mailto:info@shreesaibiotech.com">
              info@shreesaibiotech.com
            </a>
          </p>

          {/* Description */}
          <p className="text-white mb-6 leading-relaxed">
            <span className="font-semibold">Innovation And Service</span>
            <br />
            We provide various dosage forms and neutral packaging including
            mixed powders, granules, soft capsules, hard capsules, tablets, soft
            candies, etc. to meet the different needs of customers. Green Spring
            has been committed to supplying customers with natural, safe and
            organic plant extracts.
          </p>

          {/* Contact button */}
          <a
            href="/contact-us"
            className="bg-green-600 text-white px-6 py-2 rounded-md font-medium w-fit hover:bg-green-700 transition mb-6"
          >
            Contact us
          </a>

          {/* Bottom Box */}
          <div className="bg-white shadow-md rounded-md p-6">
            <p className="font-semibold text-lg mb-2">
              How to ensure product quality?
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Our products comply with the standards of Regulation (EC) No
              396/2005 and Pollutant Regulation No 2023/915, and have been
              certified by BRC, IFS, Halal, Kosher, and ISO9001.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
