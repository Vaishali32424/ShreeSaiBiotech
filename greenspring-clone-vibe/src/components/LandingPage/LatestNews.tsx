import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllNews } from '@/Services/NewsCrud'; // 💡 getAllNews API फ़ंक्शन आयात करें
import { Link } from "react-router-dom"; // 💡 Link कंपोनेंट आयात करें

// 💡 News Item Interface (बेहतर टाइप सुरक्षा के लिए)
interface NewsItem {
    id: number;
    news_title: string;
    date: string;
    image_url: string;
    long_description: string; // मान लें कि long_description है
}

const LatestNews = () => {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchLatestNews = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllNews(); 
        
            let allNews = response.data || response; 
            const latestSixNews = allNews
                ?.sort((a: NewsItem, b: NewsItem) => new Date(b.date).getTime() - new Date(a.date).getTime())
                ?.slice(0, 6);
                
            setNewsItems(latestSixNews);

        } catch (err) {
            console.error("Error fetching latest news:", err);
            setError("Failed to load latest news items.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLatestNews();
    }, []); 
    const getSnippet = (htmlString: string, wordLimit: number = 50) => {
  if (!htmlString) return '';
  const plainText = htmlString.replace(/<[^>]*>/g, '');
  const words = plainText.trim().split(/\s+/);
  if (words?.length > wordLimit) {
    return words?.slice(0, wordLimit)?.join(' ') + '...';
  }

  return plainText;
};
    
    // 💡 लोडिंग और त्रुटि की स्थिति को संभालना
    if (loading) {
        return (
            <section className="py-16 bg-white text-center">
                <p className="text-xl text-green-700">Loading latest news...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16 bg-white text-center">
                <p className="text-xl text-red-500">Error: {error}</p>
            </section>
        );
    }

    if (newsItems.length === 0) {
        return (
            <section className="py-16 bg-white text-center">
                <p className="text-xl text-gray-500">No news items found.</p>
            </section>
        );
    }


    return (
        <section className="py-16 bg-white" id="latest-news">
            <div className="max-w-7xl mx-auto px-4 relative">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">Latest News</h2>
                </div>

                <Swiper
                    modules={[Navigation, A11y]}
                    spaceBetween={24}
                    slidesPerView={1}
                    navigation={{
                        nextEl: ".swiper-button-next-custom",
                        prevEl: ".swiper-button-prev-custom",
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {/* 💡 API से प्राप्त डेटा को मैप करें */}
                    {newsItems.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 h-full flex flex-col">
                                
                                {/* 💡 Link to News Detail Page */}
                                <Link to={`/news/detail/${item.id}`}> 
                                    <img
                                        src={item.image_url} // 💡 API फ़ील्ड: image_url
                                        alt={item.news_title} // 💡 API फ़ील्ड: news_title
                                        className="w-full h-48 object-cover"
                                        loading="lazy"
                                    />
                                </Link>
                                
                                <div className="p-4 flex flex-col flex-1">
                                    <p className="text-sm text-gray-500 mb-1">
                                        {/* 💡 दिनांक को फॉर्मेट करें */}
                                        {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}
                                    </p>
                                    
                                    <Link
                                        to={`/news/detail/${item.id}`}
                                        className="block font-semibold text-gray-800 hover:text-green-600 mb-2 line-clamp-2"
                                    >
                                        {item.news_title}
                                    </Link>
                                    
                                    <p className="text-sm text-gray-600 line-clamp-3 flex-1">
  {getSnippet(item.long_description, 10)}
                                    </p>
                                    
                                    <div>
                                        {/* 💡 Link to News Detail Page */}
                                        <Link to={`/news/detail/${item.id}`}>
                                            <button
                                                className="text-green-600 hover:bg-green-700 hover:text-white px-2 py-1 rounded-lg text-md font-medium mt-3 inline-block"
                                            > 
                                                read more &gt;
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <div className="swiper-button-prev-custom absolute -left-10 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-green-600 text-green-600 cursor-pointer hover:bg-green-600 hover:text-white transition">
                    <ArrowLeft />
                </div>
                <div className="swiper-button-next-custom absolute -right-10 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-green-600 text-green-600 cursor-pointer hover:bg-green-600 hover:text-white transition">
                    <ArrowRight/>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;