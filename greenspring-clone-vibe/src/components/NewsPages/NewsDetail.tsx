// NewsPages/NewsDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsByNewsId } from '@/Services/NewsCrud'; // मान लीजिए कि यह API फ़ंक्शन है
import { CalendarIcon, EyeIcon, MessageSquareIcon } from 'lucide-react'; // Lucide icons का उपयोग कर रहे हैं
import { toast } from '../ui/use-toast';

// NewsDetail Component के लिए TypeScript Interface (वैकल्पिक, लेकिन अच्छा अभ्यास)
interface NewsItem {
    id: number;
    news_category: string;
    news_title: string;
    date: string;
    image_url: string;
    long_description: string;
}

const NewsDetail = () => {

    const { slug } = useParams<{ slug: string }>(); 
        const [currentUrl, setCurrentUrl] = useState("");

    const [newsDetail, setNewsDetail] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const fetchNewsDetail = async (newsSlug: string) => {
        setLoading(true);
        setError(null);
        try {
            const id = parseInt(newsSlug, 10);
            
            if (isNaN(id)) {
                setError("Invalid news ID provided.");
                setLoading(false);
                return;
            }
                        const response = await getNewsByNewsId(id); 
                        setNewsDetail(response.data); // या response.data, आपके API response के अनुसार
        } catch (err) {
            console.error("Error fetching news detail:", err);
            setError("Failed to load news content. Please try again.");
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
        if (slug) {
            fetchNewsDetail(slug);
        }
                if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
        
        window.scrollTo(0, 0); 
    }, [slug]);

    if (loading) {
        return (
            <div className="flex-1 p-8 bg-white rounded-xl shadow-lg flex items-center justify-center h-96">
                <p className="text-xl text-green-600">Loading news detail...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 p-8 bg-white rounded-xl shadow-lg">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    if (!newsDetail) {
        return (
            <div className="flex-1 p-8 bg-white rounded-xl shadow-lg">
                <p className="text-gray-600 text-lg">News item not found.</p>
            </div>
        );
    }

    // डेट को फॉर्मेट करें (उदाहरण के लिए 'Oct 23, 2025')
    const formattedDate = new Date(newsDetail.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    });
    
    // UI को uploaded image और JSON response के आधार पर रेंडर करें
    return (
        <div className="flex-1 p-8 bg-white rounded-xl shadow-lg">
            
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {newsDetail.news_title}
            </h1>

            {/* Meta Info (Date, View, Message) - Image UI के समान */}
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6 border-b pb-4">
                {/* Date */}
                <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1 text-green-600" />
                    <span>{formattedDate}</span> {/* JSON में date: "2025-11-18" है */}
                </div>
                
                {/* View (Example placeholder, assuming 'View: 129') */}
                <div className="flex items-center">
                    <EyeIcon className="w-4 h-4 mr-1 text-green-600" />
                    <span>{newsDetail.initial_views}</span> 
                </div>

             
            </div>
  {newsDetail.image_url && (
                <div className="my-8">
                    <img 
                        src={newsDetail.image_url} 
                        alt={newsDetail.news_title} 
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                </div>
            )}
            <div 
                className="prose max-w-none text-gray-700 leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: newsDetail.long_description }} 
            />
                <div className="flex mt-2  flex-wrap ">
                   

                        {/* ... (Social Share Links remain the same) ... */}
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 cursor-pointer hover:text-blue-700 text-2xl">
                            <i className="fab fa-facebook-square"></i>
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(name)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 cursor-pointer hover:text-blue-500 text-2xl">
                            <i className="fab fa-x-twitter"></i>
                        </a>
                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 cursor-pointer hover:text-blue-800 text-2xl">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${name} - ${currentUrl}`)}`} target="_blank" rel="noopener noreferrer" className="text-green-600 cursor-pointer hover:text-green-700 text-2xl">
                            <i className="fab fa-whatsapp-square"></i>
                        </a>
                        <a onClick={() => { navigator.clipboard.writeText(currentUrl); toast({ title: "Product link copied to clipboard! ✅", description: "You can now paste the link anywhere to share this product!", }); }} className="text-gray-500 cursor-pointer hover:text-gray-700 text-2xl">
                            <i className="fa-solid fa-clipboard"></i> 
                        </a>
                    </div>

        
        </div>
    );
};

export default NewsDetail;