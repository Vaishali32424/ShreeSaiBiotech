// KnowledgePages/AllKnowledge.tsx

import React from 'react'
import Header from '../Header'
import PageBanner from '../PageBanner'
import Footer from '../Footer'

// import HotProductsSidebar from '../LandingPage/HotProductsSidebar' // यदि आप इसे रखना चाहें तो आयात करें
import { Route, Routes } from 'react-router-dom'
import AllKnowledgeList from './AllKnowledgeList'
import KnowledgeDetail from './KnowledgeDetail'
import KnowledgeSidebar from './NewsSidebar'
import HotProductsSidebar from '../LandingPage/HotProductsSidebar'

const AllKnowledge = () => {
    
    return (
        <>
            <Header />
            <PageBanner
                title={"Knowledge & Insights"} // Title updated
                breadcrumb={"Knowledge"}
                backgroundImage="/assets/Knowledge.webp" 
            />
            
            <section className='px-20 '>
                <div className="flex gap-8 py-10">
                    
                    <aside className="w-64 bg-gray-50 rounded-xl shadow-sm p-4 h-fit space-y-8"> 
                        
                        <KnowledgeSidebar /> 
                        
                        <HotProductsSidebar /> 
                    </aside>
                    
                    <div className='flex-1'>
                        <Routes>
                            <Route 
                                path="/" 
                                element={<AllKnowledgeList />} 
                            />
                        
                            <Route 
                                path="detail/:slug" 
                                element={<KnowledgeDetail />} 
                            />
                        </Routes>
                    </div>
                </div>
            </section>
            
            <Footer />
        </>
    )
}

export default AllKnowledge