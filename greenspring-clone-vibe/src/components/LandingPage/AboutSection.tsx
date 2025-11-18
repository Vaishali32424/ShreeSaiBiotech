import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AboutSection() {
    const navigate = useNavigate();
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 items-center">
        {/* Left Side - YouTube Video with Badge */}
        <div className="relative">
          {/* YouTube Video */}
          <div className="overflow-hidden shadow-md relative">
        <iframe width="800" height="315" src="https://www.youtube.com/embed/QYVlrpmn-_4?si=RABjntomWQtIqis1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            {/* Top Right Square Box */}
            <div className="absolute -top-1  z-10 -right-1 w-12 h-12 p-1.5 bg-white rounded-md shadow-md">
              <div className="h-full w-full rounded-md  bg-green-700"></div>
            </div>
          </div>

          {/* Years of Experience Badge */}
          <div className="absolute -bottom-6 -left-14 bg-[#F7F9FD] rounded-lg shadow p-6 text-center">
            <div className="p-3 bg-[#EBF0FB] rounded-lg">
              <p className="text-3xl font-bold text-green-700">37</p>
              <p className="text-gray-600 text-sm">
                Years of <br /> Experience
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Shree Sai Biotech
          </h2>
          <p className="text-gray-600 mb-6">
Shree sai Biotech® offer a range of botanical extract products with
            proven health benefits to meet the demands of our customers in the
            food, cosmetic, healthcare and natural color industries.
          </p>

          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-6">
            {[
              "Natural raw material Manufacturer",
              "Strict quality assurance",
              "Professional Natural Botanical Extracts ",
              "Over 37 years of export experience",
              "OEM and ODM service",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600 text-lg" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>

          {/* Button */}
         <button
      onClick={() => navigate("/why-choose-us")}
      className="bg-green-700 text-white font-medium px-6 py-2 rounded-md shadow hover:bg-green-800 transition"
    >
      Read more
    </button>
        </div>
      </div>
    </section>
  );
}
