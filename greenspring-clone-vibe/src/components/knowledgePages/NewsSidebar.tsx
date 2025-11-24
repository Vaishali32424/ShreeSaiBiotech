// KnowledgePages/KnowledgeSidebar.tsx

import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { getAllKnowledge } from "@/Services/KnowledgeCrud";


export default function KnowledgeSidebar() { 
    const [knowledgeList, setKnowledgeList] = useState([]);

  useEffect(() => {
    const fetchKnowledge = async () => {
      try {
        const response = await getAllKnowledge();  
        const data = response?.data || response || [];

        const sorted = data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 3);

        setKnowledgeList(sorted);

      } catch (error) {
        console.error("Error fetching knowledge articles:", error);
      }
    };

    fetchKnowledge();
  }, []);

    return (
        <aside className="w-full text-gray-800 sidebar">

            {/* Heading style with Blue color */}
            <h3 className="text-lg font-semibold mb-4 text-blue-700 border-b pb-2 border-blue-400">
                Industry Knowledge
            </h3>

            <ul className="space-y-3">
                {knowledgeList.map((article) => (
                    <li key={article.id} className="pb-2 border-b last:border-b-0 border-gray-100">

                        <NavLink
                            to={`/knowledge/detail/${article.id}`} 
                            className="flex items-center gap-3 hover:bg-gray-50 transition p-1 rounded"
                        >
                            <img
                                src={article.image_url}
                                alt={article.knowledge_title}
                                className="w-[70px] h-[55px] object-cover rounded-sm flex-shrink-0"
                            />
                            <div className="flex-1">
                                <p className="text-[14px] font-semibold text-gray-800 leading-tight line-clamp-2">
                                    {article.knowledge_title}
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