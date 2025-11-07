// CreateProduct.zip/CreateProduct/CertificateUploader.tsx
import React from 'react';

const CertificateUploader = ({ certificates, onUpdate, onRemove }) => {
  const handleFileChange = (id, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onUpdate(id, 'image', reader.result);
      onUpdate(id, 'fileName', file.name);
    };
    reader.readAsDataURL(file);
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

  return (
    <div className="grid grid-cols-6 gap-4">
      {certificates.map(cert => (
        <div key={cert.id} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Certificate Name"
            value={cert.name}
            onChange={(e) => onUpdate(cert.id, 'name', e.target.value)}
            className={inputClass}
          />
          <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center mt-2">
            {cert.image ? (
              <img src={cert.image} alt={cert.name} className="h-full object-contain" />
            ) : (
              <label className="cursor-pointer">
                <span className="text-sm text-gray-500">Upload</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(cert.id, e.target.files[0])}
                />
              </label>
            )}
          </div>
          <button
            type="button"
            onClick={() => onRemove(cert.id)}
            className="text-red-500 hover:text-red-700 font-bold mt-2"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default CertificateUploader;