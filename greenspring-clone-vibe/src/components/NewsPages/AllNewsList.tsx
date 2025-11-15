import React from 'react';
import { Link } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css"; 

const mockNews = [
    {
        id: 1,
        title: "ShreeSaiBiotech A 9001 Certification for Quality Excellence",
        summary: "We are proud to announce that ShreeSaiBiotech has been awarded the prestigious ISO 9001:2015 certification, reflecting our commitment to quality management systems.",
        date: "2024-10-25",
        category: "Company News",
        image: "/assets/farming.jpg", 
        slug: "iso-9001-certification"
    },
    {
        id: 5,
        title: "Sustainable Sourcing: Our Commitment to Ethical Practices",
        summary: "A deep dive into our supply chain ethics and how we ensure sustainable and responsible sourcing of all our raw materials.",
        date: "2024-08-20",
        category: "Company News",
        image: "https://via.placeholder.com/300x200.png?text=Sustainability",
        slug: "sustainable-sourcing"
    },
];

const AllNewsList = () => {
    const newsArticles = mockNews; 
    
    if (newsArticles.length === 0) {
        return <div className="p-8 text-center text-xl text-gray-500">No news articles found in this category.</div>
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800 border-b border-green-600 pb-2">Latest News & Updates</h1>

            <div className="space-y-6"> 
                {newsArticles.map((article) => (
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

export default AllNewsList;