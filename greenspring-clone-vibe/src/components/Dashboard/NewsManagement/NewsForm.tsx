// NewsForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '../../ui/use-toast';
import RichTextEditor from '../../CreateProduct/RichTextEditor';
import { createNews, getNewsData, updateNews } from '@/Services/NewsCrud';
// Assume these API services exist

const NEWS_CATEGORIES = [
  { id: "companyNews", name: "Company News" },
  { id: "industryNews", name: "Industry News" },
  { id: "companyExhibition", name: "Company Exhibition" },
];

const generateSlug = (text) => text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');

const NewsForm = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(newsId);

  // States
  const [category, setCategory] = useState(NEWS_CATEGORIES[0].id);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [views, setViews] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10)); 
  const [longDescription, setLongDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Fetch Data for Edit Mode ---
  useEffect(() => {
    if (isEditMode && newsId) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const result = await getNewsData(newsId);
          const news = result.data;
          
          setTitle(news.title || "");
          setCategory(news.category.id || NEWS_CATEGORIES[0].id); // Category ID
          setShortDescription(news.short_description || "");
          setViews(news.views || 0);
          setDate(news.date || new Date().toISOString().substring(0, 10)); 
          
          // RichTextEditor content
          setLongDescription(news.long_description || ""); 
        } catch (error) {
          console.error("Error fetching news data:", error);
          toast({ title: "Error", description: "Failed to load news data." });
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [newsId, isEditMode]);
  
  // --- Form Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      id: isEditMode ? newsId : generateSlug(title),
      category: { id: category, name: NEWS_CATEGORIES.find(c => c.id === category)?.name || category },
      title,
      short_description: shortDescription,
      date,
      views: parseInt(views), // Ensure views is a number
      long_description: longDescription, // RichTextEditor content
      // image_url: imageBase64, // If you implement image upload
    };

    try {
      if (isEditMode) {
        await updateNews(newsId, payload);
        toast({ title: "Success✅", description: "News updated successfully!" });
      } else {
        await createNews(payload);
        toast({ title: "Success✅", description: `News "${title}" created successfully!` });
      }
      navigate("/dashboard/news"); // Navigate back to news list
    } catch (error) {
      console.error("❌ Error submitting news data:", error);
      toast({ title: "Error", description: `Submission failed. ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">
        {isEditMode ? "Edit News Article" : "Create New News Article"}
      </h1>

      {loading && isEditMode ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          
          {/* 1. Category and Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
                required
              >
                {NEWS_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* 2. Date, Views, Short Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Initial Views</label>
              <input
                type="number"
                value={views}
                onChange={e => setViews(e.target.value)}
                className={inputClass}
                min="0"
                required
              />
            </div>
             <div className="md:col-span-1">
              <label className={labelClass}>Short Description (Snippet)</label>
              <textarea
                value={shortDescription}
                onChange={e => setShortDescription(e.target.value)}
                className={inputClass}
                rows="3"
                required
              />
            </div>
          </div>


          {/* 3. Long Description (RichTextEditor) */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Long Description (Content)</h3>
            <RichTextEditor
              // **CRITICAL FIX for Edit Mode:**
              // Changing the key forces the RichTextEditor to fully re-initialize 
              // with the new 'longDescription' content from the API.
              key={newsId || 'new'} 
              initialContent={longDescription}
              onChange={(content) => setLongDescription(content)}
            />
          </div>

          {/* 4. Main Image Uploader (Optional, based on your component) */}
          {/*
          <ImageUploader onUpload={handleImageUpload} preview={imageBase64} />
          */}

          {/* 5. Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white text-lg font-bold rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
            disabled={loading}
          >
            {isEditMode ? (loading ? "Updating..." : "Update News") : (loading ? "Creating..." : "Create News")}
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsForm;