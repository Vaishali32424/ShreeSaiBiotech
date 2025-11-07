import React, { useState } from 'react';

const ProductCardEditor = ({ card, index, onUpdate, onRemove }) => {
  const [customerReviews, setCustomerReviews] = useState([]);
const [faqItems, setFaqItems] = useState([]);

// New State for Grid Layout Choice (for productCards)
const [gridLayout, setGridLayout] = useState('3x3');
  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700 mt-3";
// --- Customer Review Handlers ---



// --- FAQ Handlers ---


  // इमेज को बेस64 में बदलने का फंक्शन
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // इमेज डेटा को Base64 स्ट्रिंग के रूप में स्टेट में सेव करें
        onUpdate(card.id, 'image', reader.result);
        onUpdate(card.id, 'fileName', file.name); // फ़ाइल का नाम भी सेव करें
      };
      reader.readAsDataURL(file);
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
        placeholder="e.g., GREEN SPRING® Coenzyme Q10 98%-101% powder"
        value={card.title || ''}
        onChange={(e) => handleInputChange('title', e.target.value)}
        className={inputClass}
      />

      <label className={labelClass}>Image Upload</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className={inputClass + " p-1"}
      />
      {card.image && (
        <div className="mt-2 flex items-center gap-4">
          <img 
            src={card.image} 
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