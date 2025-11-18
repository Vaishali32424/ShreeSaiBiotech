// KnowledgeForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '../../ui/use-toast';
import RichTextEditor from '../../CreateProduct/RichTextEditor';
import { createKnowledge, getKnowledgePageData, updateKnowledge } from '@/Services/KnowledgeCrud';

const generateSlug = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');

const KnowledgeForm = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(pageId);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [shortDescription, setShortDescription] = useState("");
  const [longContent, setLongContent] = useState("");
  const [views, setViews] = useState(0);

  const [imageFile, setImageFile] = useState(null);  
  const [imageBase64, setImageBase64] = useState(""); 
  const [loading, setLoading] = useState(false);

  // ---------- Load data when editing ----------
  useEffect(() => {
    if (isEditMode && pageId) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const result = await getKnowledgePageData(pageId);
          const page = result.data;

          setTitle(page.knowledge_title || "");
          setDate(page.date || new Date().toISOString().substring(0, 10));
          setShortDescription(page.short_description || "");
          setLongContent(page.long_description || "");
          setViews(page.initial_views || 0);
          setImageBase64(page.imageURL || "");

        } catch (error) {
          toast({ title: "Error", description: "Failed to load page data." });
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [pageId, isEditMode]);

  // ---------- IMAGE UPLOAD ----------
  const handleImageUpload = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result); 
    };
    reader.readAsDataURL(file);
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      knowledge_title: title,
      date,
      initial_views: Number(views),
      imageURL: imageBase64,   // base64 string
      short_description: shortDescription,
      long_description: longContent,
    };

    try {
      if (isEditMode) {
        await updateKnowledge(pageId, payload);
        toast({ title: "Success", description: "Knowledge page updated successfully!" });
      } else {
        await createKnowledge(payload);
        toast({ title: "Success", description: "Knowledge page created successfully!" });
      }

      navigate("/dashboard/knowledge");
    } catch (error) {
      toast({ title: "Error", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="p-6 w-60% bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">
        {isEditMode ? "Edit Knowledge Page" : "Create Knowledge Page"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">

        {/* Title + Date */}
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
  <div>
          <label className={labelClass}>Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className={inputClass}
          />
          
          {imageBase64 && (
            <div className="mt-3">
              <p className="font-medium">Preview:</p>
              <img src={imageBase64} className="w-48 h-32 object-cover rounded border" />
            </div>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label className={labelClass}>Short Description</label>
          <textarea
            value={shortDescription}
            onChange={e => setShortDescription(e.target.value)}
            className={inputClass}
            rows="3"
            required
          />
        </div>

        {/* Views */}
        <div>
          <label className={labelClass}>Initial Views</label>
          <input
            type="number"
            value={views}
            onChange={e => setViews(e.target.value)}
            className={inputClass}
            min="0"
          />
        </div>

        {/* Image Upload */}
      
        {/* Long Content */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Long Description</h3>
          <RichTextEditor
            key={pageId || 'new'}
            initialContent={longContent}
            onChange={setLongContent}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white text-lg font-bold rounded-md hover:bg-green-700 disabled:bg-green-400"
          disabled={loading}
        >
          {isEditMode ? (loading ? "Updating..." : "Update Page") : (loading ? "Creating..." : "Create Page")}
        </button>
      </form>
    </div>
  );
};

export default KnowledgeForm;
