// KnowledgeForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '../../ui/use-toast';
import RichTextEditor from '../../CreateProduct/RichTextEditor';
import { createKnowledge, updateKnowledge } from '@/Services/KnowledgeCrud';
// Assume these API services exist

const generateSlug = (text) => text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');

const KnowledgeForm = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(pageId);

  // States
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10)); // YYYY-MM-DD
  const [longContent, setLongContent] = useState(""); // RichTextEditor Content
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState(null); // File object (Optional)
  const [imageBase64, setImageBase64] = useState(""); // Image preview/API data (Optional)

  // --- Fetch Data for Edit Mode ---
  useEffect(() => {
    if (isEditMode && pageId) {
      const fetchData = async () => {
        setLoading(true);
        try {
          // ⚠️ Assuming getKnowledgePageData(pageId) fetches the data
          const result = await getKnowledgePageData(pageId);
          const page = result.data;
          
          setTitle(page.title || "");
          setShortDescription(page.short_description || "");
          setDate(page.date || new Date().toISOString().substring(0, 10)); 
          setLongContent(page.long_content || ""); // Load RichTextEditor content
          setImageBase64(page.image_url || ""); // Load image URL for preview (if implemented)
        } catch (error) {
          console.error("Error fetching knowledge page data:", error);
          toast({ title: "Error", description: "Failed to load knowledge page data." });
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [pageId, isEditMode]);
  
  // --- Form Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      id: isEditMode ? pageId : generateSlug(title),
      title,
      short_description: shortDescription,
      date,
      long_content: longContent, // RichTextEditor content
      image_url: imageBase64, // If you implement image upload
    };

    try {
      if (isEditMode) {
        await updateKnowledge(pageId, payload);
        toast({ title: "Success✅", description: "Knowledge page updated successfully!" });
      } else {
        await createKnowledge(payload);
        toast({ title: "Success✅", description: `Knowledge page "${title}" created successfully!` });
      }
      navigate("/dashboard/knowledge"); // Navigate back to knowledge list
    } catch (error) {
      console.error("❌ Error submitting knowledge page data:", error);
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
        {isEditMode ? "Edit Knowledge Page" : "Create New Knowledge Page"}
      </h1>

      {loading && isEditMode ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          
          {/* 1. Title and Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={inputClass}
                required
              />
            </div>
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
          </div>

          {/* 2. Short Description */}
          <div>
            <label className={labelClass}>Short Description (Snippet/Teaser)</label>
            <textarea
              value={shortDescription}
              onChange={e => setShortDescription(e.target.value)}
              className={inputClass}
              rows="3"
              required
            />
          </div>

          {/* 3. Main Image Uploader (Optional) */}
          {/*
          <label className={labelClass}>Main Image</label>
          <ImageUploader onUpload={handleImageUpload} preview={imageBase64} /> 
          */}

          {/* 4. Long Content (RichTextEditor) */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Detailed Content (Long Description)</h3>
            <RichTextEditor
              // 💡 FIX for Edit Mode: Use key to force re-initialization
              key={pageId || 'new'} 
              initialContent={longContent}
              onChange={(content) => setLongContent(content)}
            />
          </div>

          {/* 5. Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white text-lg font-bold rounded-md hover:bg-green-700 disabled:bg-green-400"
            disabled={loading}
          >
            {isEditMode ? (loading ? "Updating..." : "Update Knowledge Page") : (loading ? "Creating..." : "Create Knowledge Page")}
          </button>
        </form>
      )}
    </div>
  );
};

export default KnowledgeForm;