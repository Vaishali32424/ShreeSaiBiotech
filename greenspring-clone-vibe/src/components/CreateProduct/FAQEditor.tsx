// src/components/FAQEditor.jsx
import React from 'react';

const FAQEditor = ({ faq, index, onUpdate, onRemove }) => {
  const inputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm";
  
  const handleInputChange = (field, value) => {
    onUpdate(faq.id, field, value);
  };

  return (
    <div className="p-3 border border-gray-400 rounded-md bg-white relative">
      <h4 className="text-md font-semibold text-gray-800 mb-2">FAQ Item #{index + 1}</h4>
      
      <button
        type="button"
        onClick={() => onRemove(faq.id)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-lg"
        title="Remove FAQ"
      >
        &times;
      </button>

      <div className="space-y-2">
        {/* Question */}
        <div>
          <label className="block text-xs font-medium text-gray-700">Question</label>
          <input
            type="text"
            placeholder="e.g., What is Abelmoschus Esculentus Extract Powder?"
            value={faq.question}
            onChange={(e) => handleInputChange('question', e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Answer */}
        <div>
          <label className="block text-xs font-medium text-gray-700">Answer</label>
          <textarea
            placeholder="Detailed answer..."
            value={faq.answer}
            onChange={(e) => handleInputChange('answer', e.target.value)}
            className={inputClass + " min-h-[50px]"}
          />
        </div>
      </div>
    </div>
  );
};

export default FAQEditor;