// KnowledgePages/KnowledgeSidebar.tsx

import { NavLink } from "react-router-dom";
import React from 'react';

const mockRecentKnowledge = [
    {
        id: 1,
        title: "The Science Behind Curcumin: Bioavailability...",
        date: "2024-11-15",
        slug: "curcumin-bioavailability",
        image: "/assets/knowledge/curcumin_science.jpg",
    },
    {
        id: 2,
        title: "Nutraceutical Trends 2025: Focus on Mental...",
        date: "2024-11-01",
        slug: "nutraceutical-trends-2025",
        image: "/assets/knowledge/nutra_trends.jpg",
    },
    {
        id: 3,
        title: "The Role of Probiotics in Gut-Brain Axis Health",
        date: "2024-10-20",
        slug: "probiotics-gut-brain",
        image: "/assets/knowledge/probiotics.jpg",
    },
];

export default function KnowledgeSidebar() { 
    return (
        <aside className="w-full text-gray-800 sidebar">

            {/* Heading style with Blue color */}
            <h3 className="text-lg font-semibold mb-4 text-blue-700 border-b pb-2 border-blue-400">
                Industry Knowledge
            </h3>

            <ul className="space-y-3">
                {mockRecentKnowledge.map((article) => (
                    <li key={article.id} className="pb-2 border-b last:border-b-0 border-gray-100">

                        <NavLink
                            to={`/knowledge/detail/${article.slug}`} 
                            className="flex items-center gap-3 hover:bg-gray-50 transition p-1 rounded"
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-[70px] h-[55px] object-cover rounded-sm flex-shrink-0"
                            />
                            <div className="flex-1">
                                <p className="text-[14px] font-semibold text-gray-800 leading-tight line-clamp-2">
                                    {article.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-1 font-medium">
                                    {new Date(article.date).toLocaleDateString("en-US", {
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