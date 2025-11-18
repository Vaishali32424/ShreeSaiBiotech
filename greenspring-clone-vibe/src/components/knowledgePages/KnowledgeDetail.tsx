// KnowledgePages/KnowledgeDetail.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getKnowledgeById } from "@/Services/KnowledgeCrud";
import { toast } from "../ui/use-toast";

export default function KnowledgeDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
        const [currentUrl, setCurrentUrl] = useState("");

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
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
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

      <h1 className="text-3xl font-bold text-blue-700 mb-3">
        {article.knowledge_title}
      </h1>

      <div className="flex items-center gap-4 text-gray-500 text-sm mb-4 border-b pb-3">
        <span>
          📅{" "}
          {new Date(article.date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </span>

        <span>        {article.knowledge_views} Views
</span>
      </div>

      {/* Main Image (if any) */}
      {article.image && (
        <img
          src={article.image_url}
          alt={article.knowledge_title}
          className="w-full max-h-[450px] object-cover rounded-lg mb-6"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/800x450?text=No+Image";
          }}
        />
      )}

  

      <div
        className="prose max-w-full prose-blue"
        dangerouslySetInnerHTML={{ __html: article.long_description }}
      />
          <div className="flex mt-2  flex-wrap ">
                   

                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 cursor-pointer hover:text-blue-700 text-2xl">
                            <i className="fab fa-facebook-square"></i>
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(name)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 cursor-pointer hover:text-blue-500 text-2xl">
                            <i className="fab fa-x-twitter"></i>
                        </a>
                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 cursor-pointer hover:text-blue-800 text-2xl">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${name} - ${currentUrl}`)}`} target="_blank" rel="noopener noreferrer" className="text-green-600 cursor-pointer hover:text-green-700 text-2xl">
                            <i className="fab fa-whatsapp-square"></i>
                        </a>
                        <a onClick={() => { navigator.clipboard.writeText(currentUrl); toast({ title: "Product link copied to clipboard! ✅", description: "You can now paste the link anywhere to share this product!", }); }} className="text-gray-500 cursor-pointer hover:text-gray-700 text-2xl">
                            <i className="fa-solid fa-clipboard"></i> 
                        </a>
                    </div>
    </div>
  );
}
