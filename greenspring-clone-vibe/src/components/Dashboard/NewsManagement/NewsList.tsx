// NewsList.tsx
import { getAllNews } from '@/Services/NewsCrud';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Assume getAllNews and deleteNews are available

const NEWS_CATEGORIES = [
  { id: "companyNews", name: "Company News" },
  { id: "industryNews", name: "Industry News" },
  { id: "companyExhibition", name: "Company Exhibition" },
];

const NewsList = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const result = await getAllNews(selectedCategory); // API call to fetch by category
      setNewsList(result.data.filter(news => news.category.id === selectedCategory)); 
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const handleEdit = (id) => {
    navigate(`/dashboard/news/edit/${id}`);
  };

  const handleAddNews = () => {
    navigate("/dashboard/news/create");
  };

  if (loading) return <p className="p-4">Loading news...</p>;
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          {NEWS_CATEGORIES.find(c => c.id === selectedCategory)?.name} Articles
        </h2>
        <button
          onClick={handleAddNews}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          + Add News
        </button>
      </div>

      <div className="space-y-4">
        {newsList.map((news) => (
          <div key={news.id} className="flex bg-white p-4 rounded-lg shadow-md border border-gray-200">
            {/* Image Placeholder */}
            <div className="w-40 h-24 bg-gray-100 rounded-md flex-shrink-0 mr-4 overflow-hidden">
                <img src={news.image_url || 'placeholder.jpg'} alt={news.title} className="w-full h-full object-cover"/>
            </div>

            <div className="flex-grow">
              <p className="text-xs text-gray-500 mb-1">
                {news.date} | Views: **{news.views}**
              </p>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{news.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {news.short_description}
              </p>
              <button 
                onClick={() => handleEdit(news.id)}
                className="mt-2 text-blue-600 text-sm hover:underline"
              >
                Read more &gt;
              </button>
            </div>
             <div className="flex-shrink-0 ml-4">
                <button 
                    onClick={() => handleEdit(news.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600"
                >
                    Edit
                </button>
            </div>
          </div>
        ))}
      </div>
      {newsList.length === 0 && <p className="text-center py-8 text-gray-500">No news articles found in this category.</p>}
    </div>
  );
};

export default NewsList;