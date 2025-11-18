// KnowledgeList.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Assume getAllKnowledgePages and deleteKnowledgePage are available
import { toast } from '../../ui/use-toast';
import { getAllKnowledge, deleteKnowledge } from '@/Services/KnowledgeCrud';


const KnowledgeList = () => {
  const navigate = useNavigate();
  const [pageList, setPageList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    setLoading(true);
    try {
      // ⚠️ Assuming your API returns a list of all knowledge pages
      const result = await getAllKnowledge(); 
      setPageList(result.data || []); 
    } catch (error) {
      console.error("Error fetching knowledge pages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleEdit = (id) => {
    navigate(`/dashboard/knowledge/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this page?")) return;
    try {
        await deleteKnowledge(id);
        toast({ title: "Success", description: "Page deleted successfully." });
        fetchPages(); // Refresh the list
    } catch (error) {
        toast({ title: "Error", description: "Failed to delete page." });
    }
  };

  const handleAddPage = () => {
    navigate("/dashboard/knowledge/create");
  };
  // Helper function to clean and limit the content
const getSnippet = (htmlString: string, wordLimit: number = 50) => {
  if (!htmlString) return '';

  // 1. Remove all HTML tags (e.g., <p>, <strong>, etc.)
  const plainText = htmlString.replace(/<[^>]*>/g, '');

  // 2. Remove extra whitespace and split into words
  const words = plainText.trim().split(/\s+/);

  // 3. Truncate if necessary and append "..."
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  // 4. Return the plain text (if 50 words or less)
  return plainText;
};



  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">📚 All Knowledge Pages</h2>
        <button
          onClick={handleAddPage}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold"
        >
          + Add Knowledge Page
        </button>
      </div>

      {loading ? (
          <p className="py-8 text-center">Loading knowledge pages...</p>
      ) : (
          <div className="space-y-4">
              {pageList?.map((page) => (
                  <div key={page.id} className="flex bg-white p-2 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                      {/* Image Placeholder */}
                      <div className="w-32 h-20 bg-gray-100 rounded-lg flex-shrink-0 mr-4 overflow-hidden">
                          <img 
                              src={page.image_url || 'https://via.placeholder.com/150'} 
                              alt={page.knowledge_title} 
                              className="w-full h-full object-cover"
                          />
                      </div>

                      <div className="flex-grow">
                          <p className="text-xs text-gray-500 mb-1 font-mono">
                              {page.date}
                          </p>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{page.knowledge_title}</h3>
<p className="text-sm text-gray-600 line-clamp-2">
  {getSnippet(page?.long_description, 30)}
</p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex-shrink-0 ml-6 flex flex-col justify-center space-y-2">
                          <button 
                              onClick={() => handleEdit(page.id)}
                              className="px-3 py-1 bg-indigo-500 text-white rounded-md text-sm hover:bg-indigo-600"
                          >
                              Edit
                          </button>
                          <button 
                              onClick={() => handleDelete(page.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                          >
                              Delete
                          </button>
                      </div>
                  </div>
              ))}
              {pageList.length === 0 && <p className="text-center py-12 text-gray-500">No knowledge pages found. Start by adding one!</p>}
          </div>
      )}
    </div>
  );
};

export default KnowledgeList;