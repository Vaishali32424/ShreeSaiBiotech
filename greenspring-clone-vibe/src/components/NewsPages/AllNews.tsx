import React, { useEffect, useState } from 'react'
import Header from '../Header'
import PageBanner from '../PageBanner'
import Footer from '../Footer'
import CultureAndContact from '../WhyChooseUs/WhyChooseUs/CultureAndContact'
import AllNewsList from './AllNewsList'
import NewsSidebar from './NewsSidebar' 
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import NewsDetail from './NewsDetail'
import HotProductsSidebar from '../LandingPage/HotProductsSidebar'
import { getAllNews, getNewsByCategory } from '@/Services/NewsCrud'
import PhoneNumberSidebar from '../Products/PhoneNumberSidebar'

const AllNews = () => {
    // ... categories array
   const categories = [
  { name: "Company News", href: "/news/company-news", slug: "company-news" },
  { name: "Industry News", href: "/news/industry-news", slug: "industry-news" },
  { name: "Exibition Information", href: "/news/company-exhibition", slug: "company-exhibition" },
];

        const [loading, setLoading] = useState(false);

    const [newsList, setNewsList] = useState([]); 
    
    const location = useLocation();
    const { categorySlug } = useParams(); 
                     
 const determineCategory = () => {
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentSlug = pathSegments[1] || "";
  
  return categories.find(cat => cat.slug === currentSlug) || categories[0];
};

     const fetchNews = async (selectedCategorySlug) => {
  setLoading(true);
  try {
    let result;
    const backendSlug = selectedCategorySlug.replace(/-/g, "_"); 

    if (!selectedCategorySlug) {
      result = await getAllNews(); 
    } else {
      result = await getNewsByCategory(backendSlug);
    }

    setNewsList(result.data);
  } catch (error) {
    console.error("Error fetching news:", error);
  } finally {
    setLoading(false);
  }
};

    
   
 useEffect(() => {
  const currentCategory = determineCategory();

  if (!location.pathname.includes('/detail/')) {
    fetchNews(currentCategory.slug);
  }
}, [location.pathname]);


    return (
        <>
            <Header />
            <PageBanner
                title={"News"}
                breadcrumb={"News"}
                backgroundImage="/assets/News.webp"
            />
            
            <section className='px-20 m'>
                <div className="flex gap-8 py-10">
                    <aside className="w-64 bg-gray-50 rounded-xl shadow-sm p-4 h-fit">
                        {/* NewsSidebar को currentCategory पास करें ताकि वह active state दिखा सके */}
                        <NewsSidebar newsList={newsList} /> 
                        <HotProductsSidebar /> 
                                                <PhoneNumberSidebar/>
                    </aside>
                    
                    <div className='flex-1'>
                        <Routes>

                            <Route 
                                path="/" 
                                element={<AllNewsList newsList={newsList} loading={loading} />} 
                            />
                            <Route 
                                path=":categorySlug" 
                                element={<AllNewsList newsList={newsList} loading={loading} />} 
                            />
                            
                            {/* 3. News Detail Page */}
                            <Route 
                                path="detail/:slug" 
                                element={<NewsDetail />} 
                            />
                        </Routes>
                    </div>
                </div>
            </section>
            
            <Footer />
        </>
    )
}

export default AllNews;