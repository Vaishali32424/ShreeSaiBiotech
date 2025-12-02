import { uploadCertificate } from "@/Services/Productscrud";
import React, { useState } from "react";

type Cert = {
  id: string | number;
  name?: string;
  image?: string | null;
  fileName?: string;
  publicId?: string;
};

type Props = {
  certificates: Cert[];
  onUpdate: (id: string | number, field: string, value: any) => void;
  onRemove: (id: string | number) => void;
};

const CertificateUploader: React.FC<Props> = ({ certificates, onUpdate, onRemove }) => {
  const [uploadingIds, setUploadingIds] = useState<Record<string | number, boolean>>({});
const handleFileChange = async (id: string | number, file: File) => {
  if (!file) return;
  onUpdate(id, "fileName", file.name);

  setUploadingIds(prev => ({ ...prev, [id]: true }));

  try {
    const fd = new FormData();
    fd.append("images", file); // backend expects "images"

    // API CALL (axios response)
    const res = await uploadCertificate(fd);

    const uploaded = res.data?.uploaded_images?.[0];

    if (uploaded?.image_url) {
      onUpdate(id, "image", uploaded.image_url);
      onUpdate(id, "publicId", uploaded.image_public_id);
    } else {
      console.error("Unexpected response:", res.data);
      alert("Unexpected upload response");
    }
  } catch (err) {
    console.error("Error uploading certificate:", err);
    alert("Certificate upload failed");
  } finally {
    setUploadingIds(prev => ({ ...prev, [id]: false }));
  }
};

  const inputClass =
    "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

  return (
    <div className="grid grid-cols-6 gap-4">
      {certificates.map(cert => (
        <div key={cert.id} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Certificate Name"
            value={cert.name || ""}
            onChange={(e) => onUpdate(cert.id, "name", e.target.value)}
            className={inputClass}
          />

          <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center mt-2 relative">
            {cert.image_url ? (
              <img src={cert.image_url} alt={cert.name} className="h-full object-contain" />
            ) : (
              <label className="cursor-pointer">
                <span className="text-sm text-gray-500">Upload</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFileChange(cert.id, f);
                  }}
                />
              </label>
            )}

            {/* Replace / Change file button */}
            <div className="absolute top-1 right-1 flex items-center gap-2">
              <label className="cursor-pointer text-xs bg-white px-2 py-1 rounded border">
                Change
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFileChange(cert.id, f);
                  }}
                />
              </label>
            </div>

            {uploadingIds[cert.id] && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                <svg className="animate-spin h-6 w-6 text-gray-700" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
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
