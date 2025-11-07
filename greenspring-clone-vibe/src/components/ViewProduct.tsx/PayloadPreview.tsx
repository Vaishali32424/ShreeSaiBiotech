// src/components/PayloadPreview.jsx

import React, { useState } from 'react';
import ProductDisplay from './ProductDisplay'; 
// सुनिश्चित करें कि ProductDisplay में गार्ड क्लॉज़ (if (!productData) return null;) है।

const defaultPayload = {
  "name": "Abelmoschus Esculentus Extract Powder",
  "image_url": "https://via.placeholder.com/800x400?text=Okra+Extract+Product+Image",
  "short_details": {
    "Purity": "98.0-101.0% (USP43/EP/BP)",
    "INCI": "Ubiquinone"
  },
  "content_sections": {
    "Products Description": "<p>Our Coenzyme Q10 (CoQ10) Powder is a premium...</p><p>Our Abelmoschus Esculentus Extract Powder (okra extract) is a 100% natural, food-grade extract derived from the pods of <em>Abelmoschus esculentus</em> (okra)...</p>",
    "Product Specifications": "<table style=\"width:100%\"><tbody><tr><th colspan=\"1\" rowspan=\"1\"><p>Parameter</p></th><td colspan=\"1\" rowspan=\"1\"><p>Specification</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\"><p>Source</p></td><td colspan=\"1\" rowspan=\"1\"><p><em>Abelmoschus esculentus</em></p></td></tr></tbody></table><p></p>",
    "Product Applications": "<p>Our Abelmoschus Esculentus Extract Powder offers multifunctional benefits across 6 key industries...</p><ul><li><p>Plant-Based Milks: Added at 0.5-1.0% as a natural thickener.</p></li><li><p>Prebiotic Formulas: Used at 10-20% in capsules/powders.</p></li></ul><p></p>"
  },
  "product_cards_data": {
    "grid_layout": "2x3",
    "cards": [
      { 
        "title": "Raw Material QC", 
        "properties": "Maturity (10-12cm length)\nPesticide residues (≤0.01ppm)", 
        "image_base64": null, "image_filename": "" 
      },
      { 
        "title": "Extraction & Purification QC", 
        "properties": "Monitor extraction parameters\nExtract testing: mucilage content (≥35%)", 
        "image_base64": null, "image_filename": "" 
      },
      { 
        "title": "Final Product QC", 
        "properties": "Mucilage: 30-40% (carbazole method)\nSolubility (≥90%)", 
        "image_base64": null, "image_filename": "" 
      }
    ]
  },
  "customer_reviews": [
    {
      "id": 1,
      "rating": 5,
      "text": "We replaced xanthan gum with 0.8% Abelmoschus Esculentus Extract in our oat milk. It solved our separation issues.",
      "name": "Sarah Johnson",
      "role": "R&D Manager, GreenHarvest Foods"
    }
  ],
  "faq_items": [
    {
      "id": 1,
      "question": "What is Abelmoschus Esculentus Extract Powder?",
      "answer": "It's a natural extract derived from okra (Abelmoschus esculentus) pods, standardized for mucilage, polysaccharides, and antioxidants."
    }
  ]
};


const PayloadPreview = () => {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(defaultPayload, null, 2));
  const [productData, setProductData] = useState(defaultPayload);
  const [error, setError] = useState(null);

  const handleJsonChange = (e) => {
    const input = e.target.value;
    setJsonInput(input);
    
    try {
      const parsedData = JSON.parse(input);
      setProductData(parsedData);
      setError(null);
    } catch (err) {
      setError("❌ Invalid JSON format. Please check syntax (e.g., missing comma, extra quotes).");
      setProductData(null); 
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50">
      
      {/* --- JSON Input Area --- */}
      <div className="mb-8 p-6 bg-white shadow-lg rounded-lg border border-indigo-200">
        <h1 className="text-2xl font-bold mb-4 text-indigo-700">JSON Payload: Live Input</h1>
        <label htmlFor="json-input" className="block text-md font-medium text-gray-700 mb-2">
          अपना प्रोडक्ट JSON पेलोड यहाँ पेस्ट करें और नीचे रेंडरिंग देखें:
        </label>
        <textarea
          id="json-input"
          value={jsonInput}
          onChange={handleJsonChange}
          className="w-full p-4 border border-gray-300 rounded-md font-mono text-sm resize-y min-h-[350px] focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Paste your JSON object..."
        />
        {error && <p className="mt-2 text-red-600 font-medium">{error}</p>}
      </div>

      <hr className="my-10 border-4 border-dashed border-gray-300" />
      
      {/* --- Live Display Area --- */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">✨ लाइव प्रोडक्ट पेज रेंडरिंग</h2>
      
      <div className="bg-white p-6 shadow-2xl rounded-xl">
        {productData ? (
          // ProductData को ProductDisplay को पास करें
          <ProductDisplay productData={productData} />
        ) : (
          <p className="text-center text-xl text-red-500 p-10">
            कृपया वैध JSON दर्ज करें।
          </p>
        )}
      </div>
    </div>
  );
};

export default PayloadPreview;