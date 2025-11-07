import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import ProductCardEditor from "./ProductCardEditor";
import FAQEditor from "./FAQEditor";
import ReviewEditor from "./ReviewEditor";
import ImageUploader from "./ImageUploader";
import CertificateUploader from "./CertificateUploader"; // ADDED

const ProductForm = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState(["Supplements", "Pharma", "Food"]);
  const [newCategory, setNewCategory] = useState("");

  const [name, setName] = useState("Coenzyme Q10 Powder");
  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState("");

  const [gridLayout, setGridLayout] = useState("3x3");
  const [productCards, setProductCards] = useState([]);
  const [footerText, setFooterText] = useState("");

  const [shortDetails, setShortDetails] = useState([
    { id: 1, key: "Purity", value: "98.0-101.0% (USP43/EP/BP)" },
  ]);
  const handleCopy = () => {
    navigator.clipboard.writeText(payload);
    alert("Copied to clipboard!");
  };

  const [contentSections, setContentSections] = useState([
    {
      id: 1,
      title: "Products Description",
      content: "",
    },
  ]);
  const [sectionTitles, setSectionTitles] = useState({
    productDescription: "Product Description",
    customerReviews: "Customer Reviews",
    faq: "FAQ",
  });

  const [customerReviews, setCustomerReviews] = useState([]);
  const [faqItems, setFaqItems] = useState([]);
  const [payload, setPayload] = useState(null);
  
  // NEW STATE: Certificates
  const [certificates, setCertificates] = useState([]); 

  // 💡 Note: removeCustomerReview and removeFaqItem are used in JSX but not defined here.
  // Assuming they exist or using placeholders for now if needed in a functional component:
  // const removeCustomerReview = id => setCustomerReviews(prev => prev.filter(r => r.id !== id));
  // const removeFaqItem = id => setFaqItems(prev => prev.filter(f => f.id !== id));


  // 💡 --- Short Details ---
  const handleDetailChange = (id, field, value) => {
    setShortDetails(prev =>
      prev.map(d => (d.id === id ? { ...d, [field]: value } : d))
    );
  };
  const addShortDetail = () => {
    setShortDetails(prev => [...prev, { id: Date.now(), key: "", value: "" }]);
  };
  const removeShortDetail = id => {
    setShortDetails(prev => prev.filter(d => d.id !== id));
  };

  // 💡 --- Content Sections (Dynamic Description) ---
  const addContentSection = () => {
    setContentSections(prev => [
      ...prev,
      { id: Date.now(), title: "", content: "" },
    ]);
  };

  const handleSectionTitleChange = (id, newTitle) => {
    setContentSections(prev =>
      prev.map(s => (s.id === id ? { ...s, title: newTitle } : s))
    );
  };

  const handleSectionContentChange = (id, newContent) => {
    setContentSections(prev =>
      prev.map(s => (s.id === id ? { ...s, content: newContent } : s))
    );
  };

  const removeContentSection = id => {
    setContentSections(prev => prev.filter(s => s.id !== id));
  };

  // 💡 --- Product Cards ---
  const addProductCard = () => {
    setProductCards(prev => [
      ...prev,
      { id: Date.now(), image: null, fileName: "", title: "", properties: "" },
    ]);
  };
  const updateProductCard = (id, field, value) => {
    setProductCards(prev =>
      prev.map(card => (card.id === id ? { ...card, [field]: value } : card))
    );
  };
  const removeProductCard = id => {
    setProductCards(prev => prev.filter(card => card.id !== id));
  };

  // 💡 --- Certificates Handlers (NEW) ---
  const handleCertUpdate = (id, field, value) => {
    setCertificates(prev =>
      prev.map(cert => (cert.id === id ? { ...cert, [field]: value } : cert))
    );
  };
  const addCertificate = () => {
    setCertificates(prev => [
      ...prev,
      { id: Date.now(), name: "", image: null, fileName: "" },
    ]);
  };
  const removeCertificate = id => {
    setCertificates(prev => prev.filter(cert => cert.id !== id));
  };


  // 💡 --- Image Upload ---
  const handleImageUpload = file => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
    setImageFile(file);
  };

  // 💡 --- Final Submit (Payload Update) ---
  const handleSubmit = e => {
    e.preventDefault();
    const finalPayload = {
      category: category || newCategory,
      name,
      main_image: imageBase64,
      short_details: shortDetails.reduce((acc, d) => {
        if (d.key) acc[d.key] = d.value;
        return acc;
      }, {}),
      content_sections: contentSections.reduce((acc, s) => {
        if (s.title) acc[s.title] = s.content;
        return acc;
      }, {}),
      product_cards_data: {
        grid_layout: gridLayout,
        cards: productCards.map(card => ({
          title: card.title,
          properties: card.properties,
          image_base64: card.image,
          image_filename: card.fileName,
        })),
      },
      // NEW PAYLOAD SECTION: Certificates
      certificates: certificates.map(cert => ({
        name: cert.name,
        image_base64: cert.image,
        image_filename: cert.fileName,
      })),
      customer_reviews: customerReviews,
      faq_items: faqItems,
      footer_text: footerText,
    };

    console.log("Final Payload:", finalPayload);
    setPayload(JSON.stringify(finalPayload, null, 2));
  };

  const inputClass =
    "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* --- Category Field --- */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Choose or Add Category</h2>
          <div className="flex items-center gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass + " w-1/2"}
            >
              <option value="">-- Select Existing Category --</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Or Add New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className={inputClass + " w-1/2"}
            />
          </div>
        </div>

          {/* --- Basic Info --- */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <label className={labelClass}>Product Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className={inputClass}
          />

          <label className={labelClass + " mt-4"}>Main Product Image</label>
          <ImageUploader onUpload={handleImageUpload} preview={imageBase64} />
        </div>

        {/* --- Short Details --- */}
        <div className="p-4 bg-white shadow-md rounded-lg"> 
          <h2 className="text-xl font-semibold text-gray-800 mb-4"> Short Details </h2> 
          <div className="space-y-3"> 
            {shortDetails.map(detail => ( 
              <div key={detail.id} className="flex items-center gap-2"> 
                <input type="text" placeholder="Key (e.g., Purity)" value={detail.key} onChange={e => handleDetailChange(detail.id, "key", e.target.value) } className={inputClass + " w-1/3"} /> 
                <input type="text" placeholder="Value" value={detail.value} onChange={e => handleDetailChange(detail.id, "value", e.target.value) } className={inputClass + " w-2/3"} /> 
                <button type="button" onClick={() => removeShortDetail(detail.id)} className="text-red-500 hover:text-red-700 font-bold" > X </button> 
              </div> 
            ))} 
          </div> 
          <button type="button" onClick={addShortDetail} className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600" > + Add Detail </button> 
        </div>

        {/* --- Certificates Section (NEW) --- */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Certificates Uploader (1x6 Grid)
          </h2>
          <CertificateUploader 
            certificates={certificates}
            onUpdate={handleCertUpdate}
            onRemove={removeCertificate}
          />
          <button
            type="button"
            onClick={addCertificate}
            className="mt-4 px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-md hover:bg-indigo-600"
          >
            + Add Certificate
          </button>
        </div>


        {/* --- Content Sections (Dynamic Description) --- */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Content Sections
          </h2>
          <div className="space-y-6">
            {contentSections.map(section => (
              <div
                key={section.id}
                className="p-4 border border-gray-200 rounded-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <label className={labelClass}>
                    Section Title 
                  </label>
                  <button
                    type="button"
                    onClick={() => removeContentSection(section.id)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Section Title (e.g., Products Description)"
                  value={section.title}
                  onChange={e =>
                    handleSectionTitleChange(section.id, e.target.value)
                  }
                  className={inputClass + " mb-4"}
                />
               <RichTextEditor
                initialContent={section.content}
                onChange={(content) => handleSectionContentChange(section.id, content)}
               />

              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addContentSection}
            className="mt-4 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600"
          >
            + Add New Section
          </button>
        </div>

        {/* --- Product Cards Grid --- */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Image Cards / Grids</h2>

          <label className={labelClass}>Select Layout</label>
          <select
            value={gridLayout}
            onChange={(e) => setGridLayout(e.target.value)}
            className={inputClass + " w-auto mb-4"}
          >
            <option value="1x1">1x1 (Single Big Image)</option>
            <option value="2x3">2x3 (2 items per row)</option>
            <option value="3x3">3x3 (3 per row)</option>
            <option value="gallery">Gallery Layout (Only Images)</option>
          </select>

          {productCards.map((card, index) => (
            <ProductCardEditor
              key={card.id}
              card={card}
              index={index}
              onUpdate={updateProductCard}
              onRemove={removeProductCard}
            />
          ))}
          <button
            type="button"
            onClick={addProductCard}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:-bg-purple-700"
          >
            + Add Product Card
          </button>
        </div>

        {/* --- Customer Reviews --- */}
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{sectionTitles.customerReviews}</h2>
          {/* Note: updateProductCard is likely incorrect here, should be a review-specific handler */}
          {customerReviews.map((review, i) => (
            <ReviewEditor key={review.id} review={review} onUpdate={updateProductCard} index={i} onRemove={() => {}} /> 
          ))}
          <button
            type="button"
            onClick={() =>
              setCustomerReviews(prev => [
                ...prev,
                { id: Date.now(), rating: 5, text: "", name: "", role: "" },
              ])
            }
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Add Review
          </button>
        </div>

        {/* --- FAQ Section --- */}
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{sectionTitles.faq}</h2>
          {/* Note: updateProductCard is likely incorrect here, should be an FAQ-specific handler */}
          {faqItems.map((item, i) => (
            <FAQEditor key={item.id} faq={item} onUpdate={updateProductCard} index={i} onRemove={() => {}}  />
          ))}
          <button
            type="button"
            onClick={() =>
              setFaqItems(prev => [
                ...prev,
                { id: Date.now(), question: "", answer: "" },
              ])
            }
            className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            + Add FAQ Item
          </button>
        </div>

        {/* --- Footer Text --- */}
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Footer Text</h2>
          <textarea
            placeholder="Enter footer text..."
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            rows={3}
          />
        </div>

        {/* --- Submit --- */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white text-lg font-bold rounded-md hover:bg-indigo-700"
        >
          Create Product Payload
        </button>
      </form>

      {payload && (
       <div className="mt-8 p-4 bg-gray-900 text-white rounded-md relative">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded"
      >
        Copy
      </button>

      {/* Payload content */}
      <pre className="text-sm whitespace-pre-wrap break-all">{payload}</pre>
    </div>
      )}
    </div>
  );
};

export default ProductForm;