import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
// IoChevronDown, IoChevronForward आयात रहने दें, भले ही वे उपयोग में न हों।

// --- Mock Recent News Data (Image URL जोड़ी गई है) ---
const mockRecentNews = [
    {
        id: 1,
        title: "ShreeSaiBiotech A 9001 Certification...",
        date: "2024-10-25",
        slug: "iso-9001-certification",
        image: "/assets/farming.jpg", 
    },
    {
        id: 2,
        title: "Innovations in Nutraceuticals Trends",
        date: "2024-09-15",
        slug: "innovations-nutraceuticals",
        image: "https://via.placeholder.com/60x60.png?text=Nutra",
    },
    {
        id: 3,
        title: "Participation in Vitafoods Asia 2024",
        date: "2024-09-01",
        slug: "vitafoods-asia-2024",
        image: "https://via.placeholder.com/60x60.png?text=Exibition",
    },
    {
        id: 4,
        title: "Sustainable Sourcing Practices",
        date: "2024-08-20",
        slug: "sustainable-sourcing",
        image: "https://via.placeholder.com/60x60.png?text=Source",
    },
];

export default function NewsSidebar({ categories }) {
  return (
    <aside className="w-full text-gray-800 sidebar">

      {/* Heading style same as screenshot */}
      <h3 className="text-lg font-semibold mb-4 text-green-700 border-b pb-2">
        Recent News
      </h3>

      <ul className="space-y-3">
        {mockRecentNews.slice(0, 4).map((news) => (
          <li key={news.id} className="pb-2 border-b last:border-b-0">

            {/* Entire row clickable */}
            <NavLink
              to={`/news/${news.slug}`}
              className="flex items-center gap-3 hover:bg-gray-50 transition p-1 rounded"
            >

              {/* IMAGE – same size as screenshot */}
              <img
                src={news.image}
                alt={news.title}
                className="w-[70px] h-[55px] object-cover rounded-sm flex-shrink-0"
              />

              {/* TEXT Section */}
              <div className="flex-1">
                <p className="text-[14px] font-semibold text-gray-800 leading-tight line-clamp-2">
                  {news.title}
                </p>

                <p className="text-xs text-gray-500 mt-1 font-medium">
                  {new Date(news.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>

            </NavLink>
          </li>
        ))}
      </ul>

    </aside>
  );
}
