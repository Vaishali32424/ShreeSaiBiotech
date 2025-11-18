// NewsForm.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "../../ui/use-toast";
import RichTextEditor from "../../CreateProduct/RichTextEditor";
import {
  createNews,
  getNewsByNewsId,
  updateNews,
} from "@/Services/NewsCrud";

const NEWS_CATEGORIES = [
  { id: "Company News", name: "Company News" },
  { id: "Industry News", name: "Industry News" },
  { id: "Company Exhibition", name: "Company Exhibition" },
];

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
  const [mainImage, setMainImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ============= FETCH DATA FOR EDIT MODE =============
  useEffect(() => {
    if (!isEditMode || !newsId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getNewsByNewsId(newsId);
        const news = result.data;

        setCategory(news.news_category || NEWS_CATEGORIES[0].id);
        setTitle(news.news_title || "");
        setShortDescription(news.short_description || "");
        setLongDescription(news.long_description || "");
        setViews(news.initial_view || 0);
        setDate(
          news.date
            ? news.date.substring(0, 10)
            : new Date().toISOString().substring(0, 10)
        );

        // Show existing image preview
        if (news.main_image_url) {
          setPreviewImage(news.main_image_url);
        }
      } catch (error) {
        console.error("Error fetching:", error);
        toast({ title: "Error", description: "Failed to load news data." });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isEditMode, newsId]);

  // IMAGE CHANGE HANDLER
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMainImage(file);

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // ============= SUBMIT =============
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("news_category", category);
      formData.append("news_title", title);
      formData.append("date", date);
      formData.append("initial_view", views);
      formData.append("short_description", shortDescription);
      formData.append("long_description", longDescription);

      if (mainImage) {
        formData.append("main_image", mainImage);
      }

      if (isEditMode) {
        await updateNews(newsId, formData);
        toast({ title: "Success", description: "News updated successfully!" });
      } else {
        await createNews(formData);
        toast({ title: "Success", description: "News created successfully!" });
      }

      navigate("/dashboard/news");
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Error",
        description: error?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Input CSS
  const inputClass =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">
        {isEditMode ? "Edit News Article" : "Create News Article"}
      </h1>

      {loading && isEditMode ? (
        <p>Loading...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md"
        >
          {/* CATEGORY + TITLE */}
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
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className={labelClass}>Main Image</label>
            <input
              type="file"
              accept="image/*"
              className={inputClass}
              onChange={handleImageChange}
              required={!isEditMode}
            />

            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-3 w-48 h-32 object-cover rounded"
              />
            )}
          </div>

          {/* DATE + VIEWS + SHORT DESCRIPTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Initial Views</label>
              <input
                type="number"
                min="0"
                value={views}
                onChange={(e) => setViews(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Short Description</label>
              <textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className={inputClass}
                rows={3}
                required
              />
            </div>
          </div>

          {/* LONG DESCRIPTION */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Long Description (Content)
            </h3>
            <RichTextEditor
              key={newsId || "new"}
              initialContent={longDescription}
              onChange={(content) => setLongDescription(content)}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white text-lg font-bold rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
              ? "Update News"
              : "Create News"}
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsForm;
