// LatestNews.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowBigLeft, ArrowLeft, ArrowRight } from "lucide-react";

const newsItems = [
  {
    title:
      "Company Organizes Employees To Watch The Parade Marking The 80th Anniversary ...",
    date: "Sep 03, 2025",
    description:
      "On September 3rd, the grand ceremony commemorating the 80th anniversary of the ...",
    imgSrc: "/uploads/18070/news/n202509031405004e743.jpg?size=376x0",
    href: "https://www.greenspringshop.com/news/company-organizes-employees-to-watch-the-parad-85208989.html",
  },
  {
    title:
      "Work Happily, Live Healthily – Xi'an GreenSpring Tech Successfully Holds 2025...",
    date: "Aug 05, 2025",
    description:
      "In appreciation of all employees' diligent efforts during the first half of 202...",
    imgSrc: "/uploads/18070/news/n202508051132237bb0c.jpg?size=376x0",
    href: "https://www.greenspringshop.com/news/work-happily-live-healthily-xi-an-greenspri-85171634.html",
  },
  {
    title:
      "Unlock Nature's Power At CPHI China 2025: Premium Plant Actives & Sweeteners ...",
    date: "Jun 11, 2025",
    description:
      "As a leading ​global plant active ingredients supplier, we will showcase cuttin...",
    imgSrc: "/uploads/18070/news/n20250611152728fdfab.jpg?size=376x0",
    href: "https://www.greenspringshop.com/news/unlock-natures-power-at-cphi-china-85109157.html",
  },
  {
    title:
      "GREEN SPRING To Showcase Innovative Health Ingredients At Vitafoods Europe 20...",
    date: "Apr 08, 2025",
    description:
      "GREEN SPRING, a leading innovator in functional health ingredients, is excited ...",
    imgSrc: "/uploads/18070/news/n2025040815031062682.jpg?size=376x0",
    href: "https://www.greenspringshop.com/news/vitafoods-europe-greenspringbio-84981151.html",
  },
  {
    title:
      "Notice On The Brand LOGO Upgrade Of Xi'an Green Spring Technology Co., Ltd.",
    date: "Mar 17, 2025",
    description:
      "In order to adapt to the company's strategic development needs and further enha...",
    imgSrc: "/uploads/18070/news/n20250317142054202d2.jpg?size=376x0",
    href: "https://www.greenspringshop.com/news/notice-on-the-brand-logo-upgrade-84956391.html",
  },
];

const LatestNews = () => {
  return (
    <section className="py-16 bg-white" id="latest-news">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Latest News</h2>
        </div>

        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {newsItems.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 h-full flex flex-col">
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                </a>
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-sm text-gray-500 mb-1">{item.date}</p>
                  <a
                    href={item.href}
                    className="block font-semibold text-gray-800 hover:text-green-600 mb-2 line-clamp-2"
                  >
                    {item.title}
                  </a>
                  <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                    {item.description}
                  </p>
                  <div>
                  <button
                    className="text-green-600   hover:bg-green-700 hover:text-white px-2 py-1 rounded-lg text-md  font-medium mt-3 inline-block "
           >       
                    read more &gt;
</button></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev-custom absolute -left-10 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-green-600 text-green-600 cursor-pointer hover:bg-green-600 hover:text-white transition">
          <ArrowLeft />
        </div>
        <div className="swiper-button-next-custom absolute -right-10  top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-green-600 text-green-600 cursor-pointer hover:bg-green-600 hover:text-white transition">
          
        <ArrowRight/>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
