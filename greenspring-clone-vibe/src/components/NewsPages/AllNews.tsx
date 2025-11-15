import React from 'react'
import Header from '../Header'
import PageBanner from '../PageBanner'
import Footer from '../Footer'
import CultureAndContact from '../WhyChooseUs/WhyChooseUs/CultureAndContact'
import AllNewsList from './AllNewsList'
import NewsSidebar from './NewsSidebar' 
import { Route, Routes } from 'react-router-dom'
import NewsDetail from './NewsDetail'
import HotProductsSidebar from '../LandingPage/HotProductsSidebar'

const AllNews = () => {
    const categories = [
        {
            name: "Company News",
            href: "/news",
        },
        {
            name: "Industry News",
            href: "/news/industry-news",
        },
        {
            name: "Exibition Information",
            href: "/news/exibition-information",
        },
    ];
    
    return (
        <>
            <Header />
            <PageBanner
                title={"News"}
                breadcrumb={"News"}
                backgroundImage="/assets/News.webp"
            />
            
            <section className='px-20 mt-10'>
                <div className="flex gap-8 py-10">
                    <aside className="w-64 bg-gray-50 rounded-xl shadow-sm p-4 h-fit">
                        <NewsSidebar categories={categories} />
                        
                        <HotProductsSidebar /> 
                    </aside>
                    
                    {/* Main Content Area - यहाँ Routes Render होंगे */}
                    <div className='flex-1'>
                        <Routes>
                            {/* 1. News List (Default Route - /news) */}
                            <Route 
                                path="/" 
                                element={<AllNewsList />} 
                            />
                            
                            {/* 2. News List (Category Routes - /news/industry-news) */}
                            {/* 💡 यह सुनिश्चित करता है कि कैटेगरी URL भी AllNewsList को लोड करे */}
                            <Route 
                                path=":categorySlug" 
                                element={<AllNewsList />} 
                            />
                            
                            {/* 3. News Detail Page (Read More पर क्लिक करने पर) */}
                            {/* 💡 News Detail के लिए रूट को /news/detail/:slug जैसा विशिष्ट नाम दें */}
                            <Route 
                                path="detail/:slug" // उदाहरण: /news/detail/iso-9001-certification
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

export default AllNews