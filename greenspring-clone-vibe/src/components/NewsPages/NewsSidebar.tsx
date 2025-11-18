import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";


export default function NewsSidebar({ newsList }) {
  return (
    <aside className="w-full text-gray-800 sidebar">

      {/* Heading style same as screenshot */}
      <h3 className="text-lg font-semibold mb-4 text-green-700 border-b pb-2">
        Recent News
      </h3>

      <ul className="space-y-3">
        {newsList?.slice(0, 4).map((news) => (
          <li key={news.id} className="pb-2 border-b last:border-b-0">

            <NavLink
              to={`/news/detail/${news.id}`}
              className="flex items-center gap-3 hover:bg-gray-50 transition p-1 rounded"
            >

              {/* IMAGE – same size as screenshot */}
              <img
                src={news.image_url}
                alt={news.news_title}
                className="w-[70px] h-[55px] object-cover rounded-sm flex-shrink-0"
              />

              {/* TEXT Section */}
              <div className="flex-1">
                <p className="text-[14px] font-semibold text-gray-800 leading-tight line-clamp-2">
                  {news.news_title}
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
