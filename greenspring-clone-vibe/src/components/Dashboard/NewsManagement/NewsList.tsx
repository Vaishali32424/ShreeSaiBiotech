// NewsList.tsx
import { toast } from '@/components/ui/use-toast';
import { deleteNews, getAllNews, getNewsByCategory } from '@/Services/NewsCrud';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Assume getAllNews and deleteNews are available

import { NEWS_CATEGORIES } from './NewsType';



const NewsList = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
const [productToDelete, setProductToDelete] = useState<string | null>(null);
const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


const fetchNews = async () => {
  setLoading(true);
  
  const shouldFetchAll = !selectedCategory || selectedCategory === "" || selectedCategory === "All";

  try {
    let result;

    if (shouldFetchAll) {
      console.log("Fetching all news...");
      result = await getAllNews();
    } else {
      console.log(`Fetching news for category: ${selectedCategory}`);
      result = await getNewsByCategory(selectedCategory);
    }
    setNewsList(result.data); 
  } catch (error) {
    console.error("Error fetching news:", error);
  } finally {
    setLoading(false);
  }
};
  const handleDeleteClick = (productId: string) => {
    console.log(productId)
    setProductToDelete(productId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteNews(productToDelete);
        setNewsList(newsList?.filter((p) => p.id !== productToDelete));
        setShowDeleteConfirm(false);
        setProductToDelete(null);
        toast({ title: "Success✅", description: "Product deleted successfully!" });
      } catch (error) {
        console.error('Error deleting product:', error);
        toast({ title: "Error❌", description: "Error deleting product. Please check console for details." });
      }
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
const getSnippet = (htmlString: string, wordLimit: number = 50) => {
  if (!htmlString) return '';
  const plainText = htmlString.replace(/<[^>]*>/g, '');
  const words = plainText.trim().split(/\s+/);
  if (words?.length > wordLimit) {
    return words?.slice(0, wordLimit)?.join(' ') + '...';
  }

  return plainText;
};
  if (loading) return <p className="p-4">Loading news...</p>;
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
                <a href='/dashboard' className="text-sm text-gray-500 font-mono">Go to dashboard</a>

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
              <h3 className="text-lg font-bold text-gray-800 mb-1">{news.news_title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
  {getSnippet(news.long_description, 50)}
</p>
              <button 
                onClick={() => handleEdit(news.id)}
                className="mt-2 text-blue-600 text-sm hover:underline"
              >
                Read more &gt;
              </button>
            </div>
             <div className="flex-shrink-0  space-x-2 ml-4">
                <button 
                    onClick={() => handleEdit(news.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600"
                >
                    Edit
                </button>
                   <button 
                    onClick={() => handleDeleteClick(news.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
          </div>
        ))}
      </div>
      {newsList.length === 0 && <p className="text-center py-8 text-gray-500">No news articles found in this category.</p>}
         {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this news article?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsList;