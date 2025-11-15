// KnowledgePages/KnowledgeDetail.tsx

import React from 'react';
import { useParams } from 'react-router-dom';

const KnowledgeDetail = () => {
    const { slug } = useParams();

    // 💡 यहाँ आप slug का उपयोग करके API से विशिष्ट ज्ञान लेख (knowledge article) का डेटा Fetch करेंगे।

    return (
        <div className="flex-1 p-8 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-blue-700 mb-4">Knowledge Article: {slug}</h1>
            <p className='text-gray-600 mb-6 border-b pb-4'>
              
            </p>
            {/* ... Full article content will go here ... */}
            
        </div>
    );
};

export default KnowledgeDetail;