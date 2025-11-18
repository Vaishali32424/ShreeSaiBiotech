// src/components/Products/RelatedProducts.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getProductsByCategory } from '@/Services/Productscrud'; // Import the service function

// 💡 Helper Component for the Angled Title Bar (Copied for self-sufficiency)
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

interface RelatedProduct {
    id: number;
    name: string;
    image_url: string; // Assuming your category product list has an image URL or similar field
}

const ProductItemCard = ({ product }: { product: RelatedProduct }) => {
    // Basic image logic (you may need to adapt this to match your actual image structure)
    const getProductImage = (name: string) => {
        const cleanName = name.replace(/<\/?[^>]+(>|$)/g, "").trim();
        // Placeholder path - adjust this to match your site's actual product image path logic
        return product.image_url || `https://via.placeholder.com/100x100.png?text=${encodeURIComponent(cleanName)}`;
    };

    return (
        <Link 
            to={`/products/product/${product.id}`} 
            className="flex items-center gap-4 p-2 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
            onClick={() => window.scrollTo(0, 0)} 
        >
            <div className="w-16 h-16 flex-shrink-0 border rounded overflow-hidden">
                <img 
                    src={getProductImage(product.name)} 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                />
            </div>
            <div className="text-sm font-medium text-gray-700 hover:text-green-700 flex-1">
                {product.name}
            </div>
        </Link>
    );
};


const RelatedProducts = ({ categoryId, currentProductId }) => {
    const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRelatedProducts = useCallback(async () => {
        if (!categoryId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const result = await getProductsByCategory<{ data: RelatedProduct[] }>(categoryId);

            const filteredProducts = result?.data?.filter(
                (p: RelatedProduct) => String(p.id) !== currentProductId
            );
            
            setRelatedProducts(filteredProducts.slice(0, 6)); 

        } catch (err) {
            console.error("Error fetching related products:", err);
            setError("Failed to load related products.");
        } finally {
            setLoading(false);
        }
    }, [categoryId, currentProductId]);

    useEffect(() => {
        fetchRelatedProducts();
    }, [fetchRelatedProducts]);

    if (loading) {
        return (
            <div className="mt-8">
                <SectionTitleBar title="You Might Also Like" />
                <p className="text-center py-4 text-gray-500">No related products found.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-8">
                <SectionTitleBar title="You Might Also Like" />
                <div className="text-center py-4 text-red-500">Error: {error}</div>
            </div>
        );
    }

    if (relatedProducts.length === 0) {
        return null; // Don't render the section if there are no other products
    }

    // Render the related products in a two-column layout like the image
    return (
        <div className="mt-8">
            <p className='text-3xl font-bold text-green-700'>You Might Also Like</p>
            {/* <SectionTitleBar title="You Might Also Like" /> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {relatedProducts.map((product) => (
                    <ProductItemCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default RelatedProducts;