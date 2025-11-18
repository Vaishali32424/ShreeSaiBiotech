// src/components/Products/ProductDetail.tsx

import { useParams, useNavigate, Link } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast } from "../ui/use-toast";
import { getProductsByCategory, getProductsData } from '@/Services/Productscrud'; 
import ProductCardRenderer from "../ViewProduct.tsx/ProductCardRenderer";
// 💡 MODAL IMPORT
import PhoneNumberModal from "./PhoneNumberModal"; 
import RelatedProducts from "./RelatedProducts";
interface RelatedProduct {
    id: string;
    name: string;
}

// --- SectionTitleBar (Helper Component) ---
const SectionTitleBar = ({ title }) => (
    <div className="flex items-center w-full my-4">
        <div
            className="text-white font-semibold capitalize text-base px-4 py-2"
            style={{
                backgroundColor: "#006e39",
                clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0% 100%)",
                fontFamily: "Arial, sans-serif",
            }}
        >
            {title}{" "}
        </div>
        <div
            className="flex-grow"
            style={{
                borderTop: "2px solid #006e39",
                height: "2px",
                marginLeft: "-2px",
            }}
        ></div>
    </div>
);
// --- End of SectionTitleBar ---


export default function ProductDetail({ productsData }) {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [currentUrl, setCurrentUrl] = useState("");
    
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 💡 State for Phone Number Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPurpose, setModalPurpose] = useState<'buy' | 'chat' | null>(null);
const [relatedProductsList, setRelatedProductsList] = useState<ProductListItem[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.href);
        }

        if (productId) {
            const fetchProductData = async () => {
                setLoading(true);
                setError(null);
                try {
                    const result = await getProductsData(productId); 
                    setProductData(result.data);
                    const catId = result.data?.category?.id;
                    if (catId) {
                        await fetchRelatedProducts(catId);
                    }
                } catch (err) {
                    console.error("Error fetching product data:", err);
                    setError("Failed to load product data. Check the console for details.");
                } finally {
                    setLoading(false);
                }
            };
            fetchProductData();
        } else {
            setLoading(false);
            setError("Product ID is missing in the URL.");
        }
  
    }, [productId]); 
    const fetchRelatedProducts = async (categoryId: string) => {
        try {
            // Your API call as requested
            const result = await getProductsByCategory<{ data: RelatedProduct[] }>(categoryId);
            setRelatedProductsList(result.data);
        } catch (err) {
            console.error("Error fetching related products:", err);
            // Optionally set an error state here, but navigation can still fail gracefully.
        }
    }
    
    // ... (Error and Loading checks remain the same) ...

    if (loading) {
        return <div className="text-center p-20 text-xl font-medium">Loading product details...</div>;
    }
    
    if (error) {
        return <div className="text-center p-20 text-red-600 font-bold text-xl">{error}</div>;
    }
    
    if (!productData || !productData.content_sections) {
        return <div className="text-center p-20 text-gray-500 text-xl">Product not found or data is incomplete. (ID: {productId})</div>;
    }

    // --- Modal Handlers (New) ---
    const handleOpenModal = (purpose: 'buy' | 'chat') => {
        setModalPurpose(purpose);
        setIsModalOpen(true);
    };

    const handleModalSubmit = (phoneNumber: string) => {
        setIsModalOpen(false);
        const purposeText = modalPurpose === 'buy' ? 'purchase' : 'chat';
        
        // 💡 Here you would typically call an API to save the lead/request.
        console.log(`Lead captured for ${purposeText}: ${phoneNumber} for product ${productData.name}`);

        toast({
            title: `Request Submitted! ✅`,
            description: `Thank you. We will contact you shortly on ${phoneNumber} regarding your ${purposeText} request.`,
            duration: 5000,
        });
    };
    // --- End Modal Handlers ---

    
    // --- Data & Logic Destructuring (Remains the same) ---
    const { 
        name, 
        short_details, 
        content_sections,
        category
    } = productData;
    // ... (rest of data destructuring and logic remains the same) ...
    const categoryName = category.name || "Unknown";
        const categoryId = category.id || null ;

    const {
        product_cards_data, 
        customer_reviews,    
        faq_items,
        certificates,
        footer_text,
        contentSections: rich_content_sections, 
        paragraph_description,                
        description: main_description, 
    } = content_sections;

    const tableHtml = short_details?.table_description || null;
    const proseClass = "prose max-w-none text-gray-700 leading-relaxed"; 

    let contentToRender = [];
    if (rich_content_sections && rich_content_sections.length > 0) {
        contentToRender = rich_content_sections;
    } else if (main_description) {
        contentToRender.push({ 
            id: 'main-desc', 
            title: 'Products Description', 
            content: main_description 
        });
    }
const currentIndex = relatedProductsList.findIndex(p => String(p.id) === productId);
    const prevProduct = currentIndex > 0 ? relatedProductsList[currentIndex - 1] : null;
    const nextProduct = currentIndex < relatedProductsList.length - 1 ? relatedProductsList[currentIndex + 1] : null;

    // A helper for navigation link text
    const getLinkText = (product: ProductListItem | null, isNext: boolean) => {
        if (!product) return isNext ? "Next" : "Prev";
        const cleanName = product.name.replace(/<\/?[^>]+(>|$)/g, "").trim();
        // The image shows 'Marigold Extract' in the next link text.
        // I will return just the name as per your request's embedded code.
        return cleanName; 
    }
    const getProductImage = (name) => {
        // ... (Image logic) ...
        if (!name) {
            return "https://via.placeholder.com/400x300.png?text=No+Image";
        }
        const cleanName = name.replace(/<\/?[^>]+(>|$)/g, "").trim();
        return `/assets/All_product_images/${encodeURIComponent(
            categoryName
        )}/${encodeURIComponent(cleanName)}.png`;
    };


const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const src = img.src;
    const placeholder =
        "https://via.placeholder.com/400x300.png?text=No+Image";

    if (src.endsWith(".png")) {
        img.src = src.replace(".png", ".jpg");
    } else if (src.endsWith(".jpg")) {
        img.src = src.replace(".jpg", ".jpeg");
    } else if (src.endsWith(".jpeg")) {
        img.src = src.replace(".jpeg", ".webp");
    } else if (src.endsWith(".webp")) {
        img.src = src.replace(".webp", ".avif");
    } 
    // 🚨 REMOVED THE LINE THAT CAUSED THE LOOP: 
    // else if (src.endsWith(".avif")) img.src = src.replace(".avif", ".jpg"); 
    else { 
        // If it gets here, it means all attempts failed, including the '.avif' one.
        img.src = placeholder;
    }

    // This line is essential to prevent the function from running infinitely on the placeholder
    img.onerror = null;
};
    // --- End Image Handlers ---


    return (
        <div className="bg-white shadow p-6 rounded-lg">
            
            {/* --- Back Button & Next/Previous Navigation --- */}
            <div className="flex justify-between items-center mb-4">
                {/* ... (Navigation code remains the same) ... */}
                <button
                    onClick={() => navigate(`/products/category/${encodeURIComponent(categoryName)}`)}
                    className="text-sm text-gray-600 font-semibold hover:underline"
                >
                    ← Back to {categoryName}
                </button>
                
            
            </div>
            
            {/* --- Product Header Section (Image/Specs) --- */}
            <div className="flex flex-col md:flex-row gap-8">
                <img
                    src={getProductImage(name)}
                    alt={name}
                    className="w-64 h-64 object-cover rounded"
                    loading="lazy"
                    onError={handleImageError}
                />

                <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-3">{name}</h1>

                    {tableHtml && (
                        <div
                            className="prose"
                            dangerouslySetInnerHTML={{ __html: tableHtml }}
                        />
                    )}

                    {paragraph_description && (
                        <p className="text-gray-700 leading-relaxed mt-4">
                            {paragraph_description}
                        </p>
                    )}

                    {/* 💡 --- Buy Now / Chat Buttons (Modified to use Modal) --- */}
                    <div className="flex items-center flex-wrap gap-2 mt-2">
                        <Button onClick={() => handleOpenModal('buy')}>Buy Now</Button>
                        <Button variant="outline" onClick={() => handleOpenModal('chat')}>Chat With Us</Button>

                        {/* ... (Social Share Links remain the same) ... */}
                        <span className="font-medium text-gray-700 ml-4">Share:</span>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 cursor-pointer hover:text-blue-700 text-2xl">
                            <i className="fab fa-facebook-square"></i>
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(name)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 cursor-pointer hover:text-blue-500 text-2xl">
                            <i className="fab fa-x-twitter"></i>
                        </a>
                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 cursor-pointer hover:text-blue-800 text-2xl">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${name} - ${currentUrl}`)}`} target="_blank" rel="noopener noreferrer" className="text-green-600 cursor-pointer hover:text-green-700 text-2xl">
                            <i className="fab fa-whatsapp-square"></i>
                        </a>
                        <a onClick={() => { navigator.clipboard.writeText(currentUrl); toast({ title: "Product link copied to clipboard! ✅", description: "You can now paste the link anywhere to share this product!", }); }} className="text-gray-500 cursor-pointer hover:text-gray-700 text-2xl">
                            <i className="fa-solid fa-clipboard"></i> 
                        </a>
                    </div>
                    {/* 💡 --- End Buy Now / Chat Buttons --- */}

                </div>
            </div>

            {/* 💡 --- Dynamic Content Sections (Remains the same) --- */}
            <div className="mt-10">

                {/* Dynamic Content Sections */}
                {contentToRender.map((section, index) => (
                    <section key={section.id || index} className="mb-6">
                        {/* Green angled bar for description */}
                        {section.id === 'main-desc' ? (
                            <div className="flex items-center w-full">
                                <div
                                    className="text-white font-semibold text-base px-4 py-2"
                                    style={{
                                        backgroundColor: "#006e39",
                                        clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0% 100%)",
                                        fontFamily: "Arial, sans-serif",
                                    }}
                                >
                                    Products Description
                                </div>
                                <div
                                    className="flex-grow"
                                    style={{
                                        borderTop: "2px solid #006e39",
                                        height: "2px",
                                        marginLeft: "-2px",
                                    }}
                                ></div>
                            </div>
                        ) : (
                            // SectionTitleBar for other rich sections
                            <SectionTitleBar title={section.title} />
                        )}
                        <div 
                            className={`${proseClass} mt-4`} 
                            dangerouslySetInnerHTML={{ __html: section.content }} 
                        />
                        <hr className="my-6 border-t-2 border-gray-100" />
                    </section>
                ))}

                {product_cards_data && product_cards_data.cards && product_cards_data.cards.length > 0 && (
                    <section className="mb-6">
                        <SectionTitleBar title="Key Features & Specifications" />
                        <ProductCardRenderer cardData={product_cards_data} />
                        <hr className="my-6 border-t-2 border-gray-100" />
                    </section>
                )}
                {/* ... (Certificates, Reviews, FAQ sections remain the same) ... */}
                {/* --- Certificates Section --- */}
                {certificates && certificates.length > 0 && (
                    <section className="mb-6 p-6 bg-yellow-50 rounded-lg">
                        <SectionTitleBar title="Certifications" />
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                            {certificates.map((cert, index) => (
                                <div key={cert.id || index} className="flex flex-col items-center p-2 border rounded-md bg-white shadow-sm">
                                    {cert.image_base64 && (
                                        <img
                                            src={cert.image_base64}
                                            alt={cert.name || "Certificate"}
                                            className="w-full h-20 object-contain mb-2"
                                        />
                                    )}
                                    <p className="text-xs font-semibold text-center text-gray-700">{cert.name}</p>
                                </div>
                            ))}
                        </div>
                        <hr className="my-6 border-t-2 border-gray-100" />
                    </section>
                )}

                {customer_reviews && customer_reviews.length > 0 && (
                    <section className="mb-6 p-6 bg-green-50 rounded-lg">
                        <SectionTitleBar title="Customer Reviews" />
                        <div className="grid md:grid-cols-3 gap-6">
                            {customer_reviews.map((review, index) => (
                                <div key={review.id || index} className="p-4 bg-white rounded-lg shadow-md border-t-4 border-green-600">
                                    <div className="text-yellow-500 mb-2">
                                        {'⭐'.repeat(review.rating)}
                                    </div>
                                    <p className="italic text-gray-700 mb-3">"{review.text}"</p>
                                    <p className="font-semibold text-green-800">{review.name}</p>
                                    <p className="text-sm text-gray-500">{review.role}</p>
                                </div>
                            ))}
                        </div>
                        <hr className="my-6 border-t-2 border-gray-100" />
                    </section>
                )}

                {/* --- FAQ Section --- */}
                {faq_items && faq_items.length > 0 && (
                    <section className="mb-6">
                        <SectionTitleBar title="FAQ" />
                        <div className="space-y-0 border-t border-gray-300">
                            {faq_items.map((faq, index) => (
                                <details key={faq.id || index} className="group border-b border-gray-300 py-3">
                                    <summary className="flex items-center cursor-pointer text-base font-semibold text-gray-800">
                                        <span className="text-green-600 mr-2 group-open:rotate-90 transition-transform">▶</span>
                                        {faq.question}
                                    </summary>
                                    <p className="mt-2 pl-6 text-gray-600">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </section>
                )}

                {/* --- Footer Text --- */}
                {footer_text && (
                    <div className="mt-8 p-4 text-left text-sm text-gray-600 italic">
                        {footer_text}
                    </div>
                )}

            
            </div>
 <div className="flex gap-0 justify-between border border-gray-300 rounded-md overflow-hidden w-full">
    
    {/* 1. PREV Button Link */}
    <Link
        to={prevProduct ? `/products/product/${prevProduct.id}` : '#'}
        onClick={(e) => !prevProduct && e.preventDefault()}
        className={`text-sm font-medium px-4 py-2 transition-colors flex items-center ${prevProduct ? 'text-gray-800 hover:bg-gray-100' : 'text-gray-400 cursor-not-allowed bg-gray-50'}`}
    >
        Prev
    </Link>

    {/* 2. PREV Product Name (This cell needs the border-x on the main separation side) */}
    <div className={`flex-1 text-sm font-semibold px-4 py-2 border-r ${prevProduct ? 'text-green-700' : 'text-gray-500 italic'}`}>
        {prevProduct ? getLinkText(prevProduct, false) : "No Information"}
    </div>
    
    {/* 3. NEXT Product Name (This cell needs the border-x on the main separation side) */}
    <div className={`flex-1 text-sm font-semibold px-4 py-2 border-l ${nextProduct ? 'text-green-700' : 'text-gray-500 italic'}`}>
        {nextProduct ? getLinkText(nextProduct, true) : "No Information"}
    </div>
    
    {/* 4. NEXT Button Link */}
    <Link
        to={nextProduct ? `/products/product/${nextProduct.id}` : '#'}
        onClick={(e) => !nextProduct && e.preventDefault()}
        className={`text-sm font-medium px-4 py-2 transition-colors flex items-center ${nextProduct ? 'text-gray-800 hover:bg-gray-100' : 'text-gray-400 cursor-not-allowed bg-gray-50'}`}
    >
        Next
    </Link>
</div>
<RelatedProducts categoryId={categoryId} currentProductId={productId} />

            {/* 💡 --- Phone Number Modal (New) --- */}
            <PhoneNumberModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                productName={name}
            />
            {/* 💡 --- End Phone Number Modal --- */}

        </div>
    );
}