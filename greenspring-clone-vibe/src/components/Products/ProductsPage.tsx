import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import ProductGrid from "./ProductGrid";
import PageBanner from "../PageBanner";
import Header from "../Header";
import Footer from "../Footer";
// 💡 Importing API functions from the services file
import { getAllCategories, getProductsByCategory } from '@/Services/Productscrud'; 
import HotProductsSidebar from "../LandingPage/HotProductsSidebar";

// TypeScript Interfaces for clarity (adjust if your API response is different)
interface Product {
  id: any; // Use number or string based on your API
  name: string;
  // ... other product fields
}
interface Category {
  id: number;
  name: string;
}
interface ProductsData {
  [categoryName: string]: Product[];
}


const ProductsPage = () => {
  const [productsData, setProductsData] = useState<ProductsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [categoryNames, setCategoryNames] = useState<string[]>([]); // Array of names for ProductGrid

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Get all categories
        // Assuming the response structure is { data: Category[] }
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
    };

    fetchAllProducts();
  }, []); // Run only once on component mount
console.log(productsData)
  return (
    <>
      <Header />
  <PageBanner
          title={"Products"}
          breadcrumb={"Products"}
          backgroundImage="https://www.greenspringshop.com/uploads/201818070/ImgScroll/ba201809191706523221844.jpg?size=2000x362"
        />
      
              <section className="px-20">
      <div className="flex gap-8 py-10">
        <aside className="w-64">
          <div className=" bg-green-600 rounded-xl shadow-sm p-4">
          <Sidebar categories={productsData} /> 
          </div>
          <HotProductsSidebar />
        </aside>

        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <ProductGrid
                  productsData={productsData}
                  categories={categoryNames} // Use the array of names
                />
              }
            />
            <Route
              path="category/:categoryId"
              element={
                <ProductGrid
                  productsData={productsData}
                  categories={categoryNames}
                />
              }
            />
            {/* The ProductDetail route is kept for the ProductsPage's internal routing, 
                but all product links are updated to point to the dedicated display page. */}
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