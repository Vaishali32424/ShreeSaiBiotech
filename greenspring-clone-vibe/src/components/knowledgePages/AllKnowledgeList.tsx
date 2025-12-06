// KnowledgePages/AllKnowledgeList.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css"; 
import { getAllKnowledge } from '@/Services/KnowledgeCrud';



const AllKnowledgeList = () => {
    const [knowledgeList, setKnowledgeList] = useState([]);

  useEffect(() => {
    const fetchKnowledge = async () => {
      try {
        const response = await getAllKnowledge();  
        const data = response?.data || response || [];

        setKnowledgeList(data);

      } catch (error) {
        console.error("Error fetching knowledge articles:", error);
      }
    };

    fetchKnowledge();
  }, []);
const getSnippet = (htmlString: string, wordLimit: number = 50) => {
  if (!htmlString) return '';

  const plainText = htmlString.replace(/<[^>]*>/g, '');
  const words = plainText.trim().split(/\s+/);

  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return plainText;
};

    return (
        <div className="p-4 bg-white rounded-xl ">
            <h1 className="text-3xl font-bold text-gray-800  pb-2">All Knowledge Articles</h1>
            
          
                <div className="space-y-6"> 
                            {knowledgeList?.map((article) => (
                                <div 
                                    key={article.id} 
                                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group flex flex-col md:flex-row"
                                >
                                    
                                    <div className='md:w-1/4 w-full h-48 md:h-auto overflow-hidden flex-shrink-0'>
                                        <Link to={`/knowledge/${article.id}`}>
                                            <img
                                                src={article.image_url}
                                                alt={article.knowledge_title}
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
                                        
                                        <Link to={`/knowledge/${article.id}`}>
                                            <h2 className="text-xl font-bold text-gray-800 mt-2 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
                                                {article.knowledge_title}
                                            </h2>
                                        </Link>
                                        
                                        <p className="text-gray-600 mb-4 line-clamp-3">
  {getSnippet(article?.long_description, 30)}
                                        </p>
                                        
                 <div className="mt-auto">
                <Link 
                    to={`detail/${article.id}`} 
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