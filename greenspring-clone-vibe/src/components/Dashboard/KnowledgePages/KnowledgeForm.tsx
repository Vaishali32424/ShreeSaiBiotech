// KnowledgeForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '../../ui/use-toast';
import RichTextEditor from '../../CreateProduct/RichTextEditor';
import { createKnowledgeMultipart, getKnowledgeById, updateKnowledge, updateKnowledgeMultipart } from '@/Services/KnowledgeCrud';

const generateSlug = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');

const KnowledgeForm = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(pageId);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [shortDescription, setShortDescription] = useState("qws");
  const [longDescription, setLongDescription] = useState("");
  const [views, setViews] = useState(0);

  const [imageFile, setImageFile] = useState(null);  
  const [imageBase64, setImageBase64] = useState(""); 
const [loading, setLoading] = useState(isEditMode);
  // ---------- Load data when editing ----------
useEffect(() => {
    if (isEditMode && pageId) {
      const fetchData = async () => {
        try {
          const result = await getKnowledgeById(pageId);
          const page = result.data;

          setTitle(page.knowledge_title || "");
          setDate(page.date || new Date().toISOString().substring(0, 10));
          setShortDescription(page.short_description || "");
          setLongDescription(page.long_description || "");
          setViews(page.initial_views || 0);
       setImageBase64(page.image_url || "");
        } catch (error) {
          toast({ title: "Error", description: "Failed to load page data." });
        } finally {
          setLoading(false); 
        }
      };
      fetchData();
    }
    if (!isEditMode) {
        setLoading(false);
    }
  }, [pageId, isEditMode]);
  const handleImageUpload = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result); 
    };
    reader.readAsDataURL(file);
  };

  // ---------- SUBMIT ----------
 // ... (inside KnowledgeForm component)

  // ---------- SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
  
    formData.append("knowledge_title", title);
    formData.append("date", date);
    formData.append("initial_views", views); 
    formData.append("short_description", shortDescription);
    formData.append("long_description", longDescription);
 
    // --- START OF CORRECTION ---
    // 1. Check if an image is *required* for creation (isEditMode is false).
    // If it's a new page and no file has been selected, show an error.
    if (!isEditMode && !imageFile) {
      toast({ title: "Error", description: "Please select an image." });
      setLoading(false);
      return;
    }
    
    // 2. Only append the image to FormData if a new file has been selected (imageFile is not null).
    // The imageFile state is a File/Blob object when a file is selected.
    if (imageFile) {
      // Append the actual File object for multipart upload
      formData.append("image", imageFile); 
    } 
    // If we are in edit mode and imageFile is null, we do NOT append 'image' to FormData.
    // This correctly signals to the backend that the existing image should be preserved.
    // --- END OF CORRECTION ---
  
    try {
      if (isEditMode) {
        await updateKnowledgeMultipart(pageId, formData);
        toast({ title: "Success", description: "Knowledge page updated successfully!" });
      } else {
        await createKnowledgeMultipart(formData);
        toast({ title: "Success", description: "Knowledge page created successfully!" });
      }

      navigate("/dashboard/knowledge");
    } catch (error) {
      toast({ title: "Error", description: error.message });
    } finally {
      setLoading(false);
    }
  };
// ... rest of the component

  const inputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700";
if (isEditMode && loading) {
    return (
      <div className="p-6 flex justify-center items-center h-full">
        <p className="text-xl text-gray-500">Loading knowledge page data...</p>
      </div>
    );
  }
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
              key={pageId || "new"}
              initialContent={longDescription}
              onChange={(content) => setLongDescription(content)}
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
