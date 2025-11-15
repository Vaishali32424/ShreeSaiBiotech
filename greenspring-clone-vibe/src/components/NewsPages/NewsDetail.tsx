// NewsPages/NewsDetail.tsx (नई फ़ाइल बनाएँ)
import React from 'react';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
    const { slug } = useParams();

    return (
        <div className="flex-1 p-8 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-green-700 mb-4">News Detail: {slug}</h1>
           
        </div>
    );
};

export default NewsDetail;