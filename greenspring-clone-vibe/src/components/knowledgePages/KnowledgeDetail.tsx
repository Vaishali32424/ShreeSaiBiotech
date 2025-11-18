// KnowledgePages/KnowledgeDetail.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getKnowledgeById } from "@/Services/KnowledgeCrud";

export default function KnowledgeDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await getKnowledgeById(id);
        const data = response?.data || response;

        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    if (id) fetchArticle();
  }, [id]);

  if (!article) {
    return (
      <div className="p-8 text-center text-gray-600">
        Loading article...
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-white rounded-xl shadow-lg">

      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-700 mb-3">
        {article.knowledge_title}
      </h1>

      {/* Date & Views */}
      <div className="flex items-center gap-4 text-gray-500 text-sm mb-4 border-b pb-3">
        <span>
          📅{" "}
          {new Date(article.date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </span>

        {/* Static views for now — can be dynamic later */}
        <span>        {article.knowledge_views} Views
</span>
      </div>

      {/* Main Image (if any) */}
      {article.image && (
        <img
          src={article.image}
          alt={article.knowledge_title}
          className="w-full max-h-[450px] object-cover rounded-lg mb-6"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/800x450?text=No+Image";
          }}
        />
      )}

      {/* Short Description */}
      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        {article.short_description}
      </p>

      {/* Long Description (HTML) */}
      <div
        className="prose max-w-full prose-blue"
        dangerouslySetInnerHTML={{ __html: article.long_description }}
      />
    </div>
  );
}
