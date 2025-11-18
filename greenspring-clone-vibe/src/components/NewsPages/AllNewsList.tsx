import React from 'react';
import { Link } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css"; 



const AllNewsList = ({newsList}) => {
    
    if (newsList.length === 0) {
        return <div className="p-8 text-center text-xl text-gray-500">No news articles found in this category.</div>
    }
const getSnippet = (htmlString: string, wordLimit: number = 50) => {
  if (!htmlString) return '';
  const plainText = htmlString.replace(/<[^>]*>/g, '');
  const words = plainText.trim().split(/\s+/);
  if (words?.length > wordLimit) {
    return words?.slice(0, wordLimit)?.join(' ') + '...';
  }

  return plainText;
};
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800 border-b border-green-600 pb-2">Latest News & Updates</h1>

            <div className="space-y-6"> 
                {newsList?.map((article) => (
                    <div 
                        key={article.id} 
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group flex flex-col md:flex-row"
                    >
                        
                        <div className='md:w-1/4 w-full h-48 md:h-auto overflow-hidden flex-shrink-0'>
                            <Link to={`/news/${article.id}`}>
                                <img
                                    src={article.image_url}
                                    alt={article.news_title}
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
                            
                            <Link to={`/news/${article.id}`}>
                                <h2 className="text-xl font-bold text-gray-800 mt-2 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
                                    {article.news_title}
                                </h2>
                            </Link>
                            
                          
                                   <p className="text-sm text-gray-600 my-2 line-clamp-2">
  {getSnippet(article.long_description, 50)}
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

export default AllNewsList;