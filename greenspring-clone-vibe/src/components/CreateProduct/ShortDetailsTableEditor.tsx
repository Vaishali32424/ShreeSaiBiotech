// ShortDetailsTableEditor.tsx (Add this component to your project)

import React from 'react';
import { Plus, Trash } from 'lucide-react';

// Short Details Item structure
interface DetailItem {
  id: string;
  key: string;
  value: string;
}

interface ShortDetailsTableEditorProps {
  details: DetailItem[];
  setDetails: React.Dispatch<React.SetStateAction<DetailItem[]>>;
}

// Helper to generate unique ID
const generateUniqueId = () => `row-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

const ShortDetailsTableEditor: React.FC<ShortDetailsTableEditorProps> = ({
  details,
  setDetails,
}) => {
  const handleAddRow = () => {
    setDetails([...details, { id: generateUniqueId(), key: '', value: '' }]);
  };

  const handleRemoveRow = (id: string) => {
    setDetails(details.filter((detail) => detail.id !== id));
  };

  const handleUpdateRow = (id: string, field: 'key' | 'value', value: string) => {
    setDetails(
      details.map((detail) =>
        detail.id === id ? { ...detail, [field]: value } : detail
      )
    );
  };

  const inputClass = "w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500";
  const buttonClass = "p-2 rounded-full transition-colors";

  return (
    <div className="space-y-3">
      {details.map((detail) => (
        <div key={detail.id} className="flex items-center gap-3  ">
          {/* Key (Description) Input */}
          <input
            type="text"
            placeholder="Key (e.g., Brand, Packaging Size)"
            value={detail.key}
            onChange={(e) => handleUpdateRow(detail.id, 'key', e.target.value)}
            className={inputClass + " font-semibold w-2/5"}
          />
          {/* Value Input */}
          <input
            type="text"
            placeholder="Value (e.g., Pharmaceutical, HDPE Drum)"
            value={detail.value}
            onChange={(e) => handleUpdateRow(detail.id, 'value', e.target.value)}
            className={inputClass + " w-3/5"}
          />
          {/* Remove Button */}
          <button
            type="button"
            onClick={() => handleRemoveRow(detail.id)}
            className={`${buttonClass} bg-red-500 text-white hover:bg-red-600`}
            title="Remove Row"
          >
            <Trash size={18} />
          </button>
        </div>
      ))}
      
      {/* Add Row Button */}
      <button
        type="button"
        onClick={handleAddRow}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        <Plus size={18} /> Add Specification Row
      </button>
    </div>
  );
};

export default ShortDetailsTableEditor;