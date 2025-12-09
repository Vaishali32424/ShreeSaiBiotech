import { UploadCardsImage } from '@/Services/Productscrud';
import React, { useState } from 'react';

const ProductCardEditor = ({ card, index, onUpdate, onRemove }) => {
  const [uploadingIds, setUploadingIds] = useState<Record<string | number, boolean>>({});
  
  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700 mt-3";

  const handleImageUpload = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Mark as uploading
  setUploadingIds(prev => ({ ...prev, [card.id]: true }));

  try {
    const fd = new FormData();
    fd.append("images", file);

    // Axios API call
    const res = await UploadCardsImage(fd);

    // Correct axios response handling
    const uploaded = res.data?.uploaded_images?.[0];

    if (uploaded?.image_url) {
      onUpdate(card.id, "image", uploaded.image_url);
      onUpdate(card.id, "publicId", uploaded.image_public_id || "");
      onUpdate(card.id, "fileName", file.name);
    } else {
      console.error("Unexpected response:", res.data);
      alert("Card image upload returned unexpected response");
    }
  } catch (err) {
    console.error("Error uploading card image:", err);
    alert("Card image upload failed");
  } finally {
    setUploadingIds(prev => ({ ...prev, [card.id]: false }));
  }
};


  const handleInputChange = (field, value) => {
    onUpdate(card.id, field, value);
  };

  return (
    <div className="p-4 border border-blue-200 rounded-md bg-blue-50 relative">
      <h4 className="text-lg font-semibold text-blue-800 mb-2">Card #{index + 1}</h4>
      
      <button
        type="button"
        onClick={() => onRemove(card.id)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold p-1"
        title="Remove Card"
      >
        &times;
      </button>

      {/* Title Field */}
      <label className={labelClass}>Card Title</label>
      <input
        type="text"
        placeholder=""
        value={card.title || ''}
        onChange={(e) => handleInputChange('title', e.target.value)}
        className={inputClass}
      />

      <label className={labelClass}>Image Upload</label>
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploadingIds[card.id]}
          className={inputClass + " p-1"}
        />
        {uploadingIds[card.id] && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded">
            <svg className="animate-spin h-5 w-5 text-gray-700" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}
      </div>
      
      {card.image_url && (
        <div className="mt-2 flex items-center gap-4">
          <img 
            src={card.image_url} 
            alt="Preview" 
            className="w-20 h-20 object-cover border rounded" 
          />
          <span className="text-xs text-gray-600">{card.fileName || 'Image uploaded'}</span>
        </div>
      )}

      <label className={labelClass}>Properties/Description (Multi-line)</label>
      <textarea
        placeholder="Shape and Properties: Yellow free-flowing powder... Use line breaks for new points."
        value={card.properties || ''}
        onChange={(e) => handleInputChange('properties', e.target.value)}
        className={inputClass + " min-h-[100px]"}
      />
    </div>
  );
};

export default ProductCardEditor;