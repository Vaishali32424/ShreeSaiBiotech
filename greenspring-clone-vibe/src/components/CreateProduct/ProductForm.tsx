import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RichTextEditor from "./RichTextEditor";
import ProductCardEditor from "./ProductCardEditor";
import FAQEditor from "./FAQEditor";
import ReviewEditor from "./ReviewEditor";
import ImageUploader from "./ImageUploader";
import CertificateUploader from "./CertificateUploader"; // ADDED
import {
  createCategory,
  createNewProduct,
  getAllCategories,
  getProductsData,
  updateProduct,
} from "@/Services/Productscrud";
import { toast } from "../ui/use-toast";
import ShortDetailsTableEditor from "./ShortDetailsTableEditor";

const ProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(productId);

  const [newCategory, setNewCategory] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [name, setName] = useState("Coenzyme Q10 Powder");
  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState("");

  const [gridLayout, setGridLayout] = useState("3x3");
  const [productCards, setProductCards] = useState([]);
  const [footerText, setFooterText] = useState("");

  // const [shortDetails, setShortDetails] = useState([]);
const [shortDetails, setShortDetails] = useState<
  { id: string; key: string; value: string }[]
>([]);
  const [contentSections, setContentSections] = useState([]);
  const [customerReviews, setCustomerReviews] = useState([]);
  const [faqItems, setFaqItems] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);
const generateUniqueId = () => `row-${Date.now()}-${Math.random()}`;

// useEffect(() => {
//     if (productId) {
//         if (productId) {
            
//             if (productData.short_details && productData.short_details.table_description) {
//                 const htmlString = productData.short_details.table_description;
//                 const newDetails = parseHtmlTableToDetails(htmlString); // 💡 New function call
//                 setShortDetails(newDetails);
//             } else {
//                 setShortDetails([]);
//             }
//         }
//     }
// }, [productId]);
  useEffect(() => {
    if (isEditMode && productId) {
      const fetchProductData = async () => {
        try {
          const result = await getProductsData(productId);
          const product = result.data;
          setName(product.name);
          setCategory(product.category.id);
          setImageBase64(product.image_url);
       if (product.short_details && product.short_details.table_description) {
            const htmlString = product.short_details.table_description;
            const newDetails = parseHtmlTableToDetails(htmlString);
            setShortDetails(newDetails);
          } else {
            // Fallback: अगर API में पुरानी/सादी key-value जोड़ी हो (यह पुराने error को भी ठीक करता है)
             setShortDetails(
              Object.entries(product.short_details || {}).map(([key, value]) => ({
                id: generateUniqueId(), // Use helper to generate unique ID
                key,
                value: String(value),
              }))
            );
          }
          const sections = product.content_sections;
          setContentSections(sections.content_sections || []);
          setProductCards(sections.product_cards_data?.cards || []);
          setGridLayout(sections.product_cards_data?.grid_layout || "3x3");
          setCertificates(sections.certificates || []);
          setCustomerReviews(sections.customer_reviews || []);
          setFaqItems(sections.faq_items || []);
          setFooterText(sections.footer_text || "");
        } catch (error) {
          console.error("Error fetching product data:", error);
          alert("Failed to load product data for editing.");
        }
      };
      fetchProductData();
    }
  }, [productId, isEditMode]);
const convertDetailsToHtmlTable = (details: DetailItem[]): string => {
    if (!details || details.length === 0) return "";

    const rows = details.map(item => {
        // Ensure keys/values are safe for HTML output
        const key = item.key.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const value = item.value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        return `<tr><td class="fw6">${key}</td><td>${value}</td></tr>`;
    }).join('');

    return `<table class="tbl tble25"><tbody>${rows}</tbody></table>`;
};


/**
 * 💡 Helper to parse the saved HTML table string back into a Key/Value array.
 * This is used for pre-filling the editor in Edit Mode.
 */
const parseHtmlTableToDetails = (htmlString: string): DetailItem[] => {
    if (!htmlString) return [];
    
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const rows = doc.querySelectorAll('.tbl tbody tr');
        
        const details: DetailItem[] = [];
        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            if (cells.length === 2) {
                details.push({
                    id: generateUniqueId(),
                    key: cells[0].textContent?.trim() || '',
                    value: cells[1].textContent?.trim() || '',
                });
            }
        });
        return details;
    } catch (e) {
        console.error("Error parsing HTML table for Short Details:", e);
        return [];
    }
};
  const fetchCategories = async () => {
    try {
      const result = await getAllCategories<{id: string, name: string}[]>();
      setCategories(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddNewCategory = async () => {
    if (!newCategory.trim()) {
      alert("Please enter a category name.");
      return;
    }
    try {
      const result = await createCategory<{id: string, name: string}>({ name: newCategory });
      setNewCategory("");
      await fetchCategories();
      setCategory(result.data.id); // Select the new category
      alert(`Category "${result.data.name}" created successfully!`);
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category.");
    }
  };
  const [sectionTitles, setSectionTitles] = useState({
    productDescription: "Product Description",
    customerReviews: "Customer Reviews",
    faq: "FAQ",
  });


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
const updateCustomerReview = (id, field, value) => {
    setCustomerReviews(prev =>
      prev.map(review => (review.id === id ? { ...review, [field]: value } : review))
    );
  };
  const removeCustomerReview = id => {
    setCustomerReviews(prev => prev.filter(r => r.id !== id));
  };

  // 💡 --- FAQ Handlers (NEW) ---
  const updateFaqItem = (id, field, value) => {
    setFaqItems(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };
  const removeFaqItem = id => {
    setFaqItems(prev => prev.filter(f => f.id !== id));
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
const createSlug = (text) => {
  return text.toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCat = categories.find((c) => c.id === category);
const tableHtml = convertDetailsToHtmlTable(shortDetails); // 💡 New function call
    const apiPayload = {
      name: name,
      image_url: imageBase64,
     short_details: {
            table_description: tableHtml, // 💡 HTML string ko save karen
        },
      content_sections: {
        product_cards_data: {
          grid_layout: gridLayout,
          cards: productCards.map((card) => ({
            title: card.title,
            properties: card.properties,
            image_base64: card.image,
            image_filename: card.fileName,
          })),
        },
        certificates: certificates.map((cert) => ({
          name: cert.name,
          image_base64: cert.image,
          image_filename: cert.fileName,
        })),
        customer_reviews: customerReviews,
        faq_items: faqItems,
        footer_text: footerText,
      },
category: {
        // name: category, 
        name: selectedCat ? selectedCat.name : category,// `category` state holds the selected category ID
      },
    };

    if (!isEditMode) {
      apiPayload.id = createSlug(name);
    }

    try {
      if (isEditMode) {
        await updateProduct(productId, apiPayload);
        toast({ title: "Success✅", description: "Product updated successfully!" });
      } else {
        await createNewProduct(apiPayload);
        toast({ title: "Success✅", description: `Product "${name}" created successfully!` });
      }
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "❌ Error submitting product data:",
        error.message || error
      );
      alert(`Submission failed. Please check console for details.`);
    }
  };

  const inputClass =
    "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">
        {isEditMode ? "Edit Product" : "Add New Product"}
      </h1>
      <form  onSubmit={handleSubmit} className="space-y-8">
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
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <div className="w-1/2 flex gap-2">
              <input
                type="text"
                placeholder="Or Add New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className={inputClass + " w-full"}
              />
              <button
                type="button"
                onClick={handleAddNewCategory}
                className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600"
              >
                Add
              </button>
            </div>
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

          {/* <label className={labelClass + " mt-4"}>Main Product Image</label>
          <ImageUploader onUpload={handleImageUpload} preview={imageBase64} /> */}
        </div>

        {/* --- Short Details --- */}
       <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">
            Product Specifications Table (Short Details)
          </h2>
          <p className="text-sm text-gray-500 mb-4">
          </p>
          <ShortDetailsTableEditor
            details={shortDetails}
            setDetails={setShortDetails}
          />
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
            <ReviewEditor key={review.id} review={review} onUpdate={updateCustomerReview} index={i} onRemove={() => removeCustomerReview(review.id)} /> 
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
            <FAQEditor key={item.id} faq={item} onUpdate={updateFaqItem} index={i} onRemove={() => removeFaqItem(item.id)}/> // ⬅️ FIX 2: Using the correct remove handler />
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
          {isEditMode ? "Update Product" : "Add this product"}
        </button>
      </form>

      {/* {payload && (
       <div className="mt-8 p-4 bg-gray-900 text-white rounded-md relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded"
      >
        Copy
      </button>

      <pre className="text-sm whitespace-pre-wrap break-all">{payload}</pre>
    </div>
      )} */}
    </div>
  );
};

export default ProductForm;