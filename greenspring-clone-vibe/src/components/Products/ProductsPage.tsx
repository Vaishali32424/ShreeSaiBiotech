import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import ProductGrid from "./ProductGrid";
import PageBanner from "../PageBanner";
import Header from "../Header";
import Footer from "../Footer";

const ProductsPage = () => {
  const [productsData, setProductsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProductsData(data);
        setCategories(Object.keys(data));
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

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
        <aside className="w-64 bg-green-600 rounded-xl shadow-sm p-4">
<Sidebar categories={productsData} />
        </aside>

        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <ProductGrid
                  productsData={productsData}
                  categories={categories}
                />
              }
            />
            <Route
              path="category/:categoryId"
              element={
                <ProductGrid
                  productsData={productsData}
                  categories={categories}
                />
              }
            />
            <Route
              path="product/:productId"
              element={<ProductDetail productsData={productsData}  />}
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
