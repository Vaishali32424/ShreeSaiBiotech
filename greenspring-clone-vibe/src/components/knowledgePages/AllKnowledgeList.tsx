// KnowledgePages/AllKnowledgeList.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css"; 

const mockKnowledge = [
    {
        id: 1,
        title: "The Science Behind Curcumin: Bioavailability and Absorption",
        summary: "Dive deep into how Curcumin is absorbed by the body, the role of piperine, and the science behind maximizing its health benefits.",
        date: "2024-11-15",
        image: "/assets/knowledge/curcumin_science.jpg", 
        slug: "curcumin-bioavailability"
    },
    {
        id: 2,
        title: "Nutraceutical Trends 2025: Focus on Mental Wellness",
        summary: "An expert analysis of the upcoming market trends in the nutraceutical space, highlighting ingredients for cognitive function and stress management.",
        date: "2024-11-01",
        image: "/assets/knowledge/nutra_trends.jpg", 
        slug: "nutraceutical-trends-2025"
    },
    // ... add more knowledge articles here
];

const AllKnowledgeList = () => {
    return (
        <div className="p-4 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">All Knowledge Articles</h1>
            
          
                <div className="space-y-6"> 
                            {mockKnowledge.map((article) => (
                                <div 
                                    key={article.id} 
                                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group flex flex-col md:flex-row"
                                >
                                    
                                    <div className='md:w-1/4 w-full h-48 md:h-auto overflow-hidden flex-shrink-0'>
                                        <Link to={`/news/${article.slug}`}>
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        </Link>
                                    </div>
            
                                    <div className="p-4 md:p-6 flex-1 flex flex-col justify-start text-left"> {/* 💡 p-2 की जगह p-4/p-6 और text-left सुनिश्चित करें */}
                                        
                                        {/* Date & Category */}
                                        <div className="mb-2">
                                            {/* 💡 Date with icon */}
                                            <span className="text-sm text-gray-500 flex items-center mb-1">
                                                <i className="far fa-calendar-alt mr-2 text-green-600"></i> {article.date}
                                            </span>
            
                                        
                                        </div>
                                        
                                        <Link to={`/news/${article.slug}`}>
                                            <h2 className="text-xl font-bold text-gray-800 mt-2 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
                                                {article.title}
                                            </h2>
                                        </Link>
                                        
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {article.summary}
                                        </p>
                                        
                 <div className="mt-auto">
                <Link 
                    to={`detail/${article.slug}`} 
                    className="inline-flex items-center text-green-700 font-semibold hover:text-green-800 transition-colors"
                >
                    Read More <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </Link>
            </div>
                                    </div>
                                </div>
                            ))}
                        </div>
        </div>
    );
}

export default AllKnowledgeList;