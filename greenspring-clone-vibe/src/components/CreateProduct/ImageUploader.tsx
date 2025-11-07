import React from "react";

export default function ImageUploader({ onUpload, preview }) {
  return (
    <div className="flex flex-col items-start gap-3">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onUpload(e.target.files[0])}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-2 w-40 h-40 object-cover rounded-md border"
        />
      )}
    </div>
  );
}
