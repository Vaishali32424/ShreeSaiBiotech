// src/components/ReviewEditor.jsx
import React from 'react';

const ReviewEditor = ({ review, index, onUpdate, onRemove }) => {
  const inputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm";
  const selectClass = "mt-1 block px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm";

  const handleInputChange = (field, value) => {
    onUpdate(review.id, field, value);
  };

  const handleRatingChange = (value) => {
    onUpdate(review.id, 'rating', parseInt(value));
  };

  return (
    <div className="p-4 border border-green-300 rounded-md bg-green-50 relative">
      <h4 className="text-lg font-semibold text-green-800 mb-3">Customer Review #{index + 1}</h4>
      
      <button
        type="button"
        onClick={() => onRemove(review.id)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold p-1"
        title="Remove Review"
      >
        &times;
      </button>

      <div className="space-y-3">
        {/* Rating Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating (Stars)</label>
          <select 
            value={review.rating} 
            onChange={(e) => handleRatingChange(e.target.value)} 
            className={selectClass}
          >
            {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} Stars</option>)}
          </select>
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Review Text</label>
          <textarea
            placeholder="Review content..."
            value={review.text}
            onChange={(e) => handleInputChange('text', e.target.value)}
            className={inputClass + " min-h-[100px]"}
          />
        </div>

        {/* Reviewer Details */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" value={review.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="e.g., Sarah Johnson" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role & Company</label>
            <input type="text" value={review.role} onChange={(e) => handleInputChange('role', e.target.value)} placeholder="e.g., R&D Manager, GreenHarvest Foods" className={inputClass} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewEditor;