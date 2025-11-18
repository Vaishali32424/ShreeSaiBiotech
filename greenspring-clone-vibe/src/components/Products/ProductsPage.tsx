import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // 💡 useLocation imported
import ProductDetail from "./ProductDetail";
import ProductGrid from "./ProductGrid";
import PageBanner from "../PageBanner";
import Header from "../Header";
import Footer from "../Footer";
// 💡 Importing API functions from the services file
import { 
    getAllCategories, 
    getProductsByCategory,
    getProductsBySearch,
    // Assuming you have this function in Productscrud
} from '@/Services/Productscrud'; 
import HotProductsSidebar from "../LandingPage/HotProductsSidebar";

// TypeScript Interfaces for clarity (adjust if your API response is different)
interface Product {
    id: any; // Use number or string based on your API
    name: string;
    // Add other relevant product fields used in ProductGrid
}
interface Category {
    id: number;
    name: string;
}
interface ProductsData {
    [categoryName: string]: Product[];
}


const ProductsPage = () => {
    // 💡 Hooks for URL and Search Query
    const location = useLocation(); 
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get('search'); // 💡 Read 'search' parameter from URL

    const [productsData, setProductsData] = useState<ProductsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const [categoryNames, setCategoryNames] = useState<string[]>([]);
    
    // 💡 State to track if we are in search mode
    // Note: Since we check searchQuery inside useEffect, this state isn't strictly necessary 
    // but helps for clearer rendering logic.
    const [isSearchMode, setIsSearchMode] = useState(false); 

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            
            // ----------------------------------------------------
            // 💡 CASE 1: SEARCH MODE (URL has ?search=query)
            // ----------------------------------------------------
            if (searchQuery) {
                console.log(`Fetching products for search: ${searchQuery}`);
                setIsSearchMode(true);
                try {
                    const searchResult = await getProductsBySearch<{ data: Product[] }>(searchQuery);
                    
                    const resultsKey = `Search Results for "${searchQuery}"`;
                    const searchProducts = searchResult.data || [];

                    const newProductsData: ProductsData = {
                        [resultsKey]: searchProducts
                    };

                    setProductsData(newProductsData);
                    setCategoryNames(searchProducts.length > 0 ? [resultsKey] : []); 

                } catch (err) {
                    console.error("Error fetching search results:", err);
                    setError(`Failed to load search results for "${searchQuery}".`);
                    setProductsData(null);
                    setCategoryNames([]);
                } finally {
                    setLoading(false);
                }
            } 
            // ----------------------------------------------------
            // 💡 CASE 2: NORMAL CATEGORY BROWZING MODE
            // ----------------------------------------------------
            else {
                console.log("Fetching all categorized products.");
                setIsSearchMode(false);
                
                // Existing logic to fetch all categories and their products
                try {
                    // 1. Get all categories
                    const categoriesResult = await getAllCategories<{ data: Category[] }>();
                    const categoriesList = categoriesResult.data || [];

                    // 2. Fetch products for all categories concurrently
                    const productPromises = categoriesList.map(category => 
                        getProductsByCategory<{ data: Product[] }>(category.id)
                            .then(res => ({ 
                                categoryName: category.name, 
                                products: res.data || [] 
                            }))
                            .catch(err => {
                                console.error(`Failed to fetch products for category ${category.name}:`, err);
                                return { categoryName: category.name, products: [] }; 
                            })
                    );

                    const allProducts = await Promise.all(productPromises);

                    // 3. Transform data into the required structure: { [categoryName]: Product[] }
                    const newProductsData: ProductsData = allProducts.reduce((acc, item) => {
                        if (item.products.length > 0) {
                            acc[item.categoryName] = item.products;
                        }
                        return acc;
                    }, {} as ProductsData);

                    setProductsData(newProductsData);
                    setCategoryNames(Object.keys(newProductsData)); 
                    
                } catch (err) {
                    console.error("Error fetching initial product data:", err);
                    setError("Failed to load products and categories.");
                } finally {
                    setLoading(false);
                }
            }
        };

        // 💡 location.search बदलने पर फ़ेच को री-ट्रिगर करें
        fetchProducts();
    }, [location.search]); // Depend on location.search to handle search mode toggling

    
    // Determine the title for the PageBanner
    const bannerTitle = isSearchMode 
        ? (searchQuery ? `Search Results for "${searchQuery}"` : "Products Search")
        : "Products";
        
    // Sidebar needs to be aware of the search mode
    const sidebarCategories = isSearchMode ? (searchQuery ? [`Search Results for "${searchQuery}"`] : []) : categoryNames;

    if (loading) {
        return (
            <>
                <Header />
                <div className="text-center py-20">
                    <p className="text-xl text-green-700">Loading product data...</p>
                </div>
                <Footer />
            </>
        );
    }
    
    // If we are in search mode and found no results
    if (isSearchMode && productsData && Object.values(productsData).every(arr => arr.length === 0)) {
        return (
            <>
                <Header />
                <PageBanner
                    title={bannerTitle}
                    breadcrumb={"Products"}
                    backgroundImage="https://www.greenspringshop.com/uploads/201818070/ImgScroll/ba201809191706523221844.jpg?size=2000x362"
                />
                <div className="text-center py-20 text-gray-700">
                    <p className="text-xl">No products found matching "{searchQuery}".</p>
                </div>
                <Footer />
            </>
        );
    }


    return (
        <>
            <Header />
            <PageBanner
                title={bannerTitle} // Use the dynamic title
                breadcrumb={"Products"}
                backgroundImage="https://www.greenspringshop.com/uploads/201818070/ImgScroll/ba201809191706523221844.jpg?size=2000x362"
            />
            
            <section className="px-20">
                <div className="flex gap-8 py-10">
                    <aside className="w-64">
                        {/* Hide Sidebar if in Search Mode and no data is present, or show simplified view */}
                        {(!isSearchMode || (isSearchMode && categoryNames.length > 0)) && (
                            <div className=" bg-green-600 rounded-xl shadow-sm p-4">
                                {/* 💡 Sidebar needs the list of category names (categoryNames/sidebarCategories)
                                     to display links correctly, which link to /products/category/:categoryId */}
                                <Sidebar 
                                    categories={productsData} 
                                    categoryNames={categoryNames} 
                                    isSearchMode={isSearchMode}
                                    searchTerm={searchQuery}
                                /> 
                            </div>
                        )}
                        <HotProductsSidebar />
                    </aside>

                    <div className="flex-1">
                        {/* Display Error Message */}
                        {error && <div className="text-center py-10 text-red-500">{error}</div>}
                        
                        {/* Routing for Product Display */}
                        <Routes>
                            <Route
                                // Handles both root path (all categories) and search mode
                                path="/"
                                element={
                                    <ProductGrid
                                        productsData={productsData}
                                        categories={categoryNames} 
                                        isSearchMode={isSearchMode}
                                        searchTerm={searchQuery}
                                    />
                                }
                            />
                            <Route
                                // Handles category specific views (e.g., /products/category/stevia)
                                path="category/:categoryId"
                                element={
                                    <ProductGrid
                                        productsData={productsData}
                                        categories={categoryNames}
                                        isSearchMode={isSearchMode} // Pass search mode context
                                        searchTerm={searchQuery}
                                    />
                                }
                            />
                            {/* ProductDetail route remains the same */}
                            <Route
                                path="product/:productId"
                                element={<ProductDetail productsData={productsData} />}
                            />
                        </Routes>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ProductsPage;