// NewsDashboard.tsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NewsForm from './NewsForm'; 
import NewsList from './NewsList'; 

const NEWS_CATEGORIES = [
  { id: "companyNews", name: "Company News" },
  { id: "industryNews", name: "Industry News" },
  { id: "companyExhibition", name: "Company Exhibition" },
];

const NewsSidebar = ({ selected, onSelect }) => (
  <div className="w-64 bg-white border-r p-4 h-full">
    <h3 className="text-xl font-semibold mb-4">News Categories</h3>
    <nav className="space-y-2">
      {NEWS_CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`w-full text-left p-2 rounded-md transition-colors ${
            selected === cat.id
              ? "bg-indigo-100 text-indigo-700 font-bold"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </nav>
  </div>
);

const NewsDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(NEWS_CATEGORIES[0].id);

  return (
    <div className="flex h-screen bg-gray-100">
      <NewsSidebar selected={selectedCategory} onSelect={setSelectedCategory} />
      <div className="flex-grow overflow-y-auto">
        <Routes>
          {/* Main List View */}
          <Route 
            path="/" 
            element={<NewsList selectedCategory={selectedCategory} />} 
          />
          
          {/* Creation Route */}
          <Route 
            path="create" 
            element={<NewsForm />} 
          />
          
          {/* Edit Route */}
          <Route 
path="edit/:newsId"
            element={<NewsForm />} 
          />
        </Routes>
      </div>
    </div>
  );
};

export default NewsDashboard;