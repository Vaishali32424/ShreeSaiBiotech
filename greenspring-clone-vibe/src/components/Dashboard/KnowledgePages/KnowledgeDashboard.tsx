// KnowledgeDashboard.tsx (Simple Router Wrapper)
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import KnowledgeList from './KnowledgeList'; 
import KnowledgeForm from './KnowledgeForm'; 

const KnowledgeDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* Main List View: /dashboard/knowledge */}
        <Route 
          path="/" 
          element={<KnowledgeList />} 
        />
        
        {/* Creation Route: /dashboard/knowledge/create */}
        <Route 
          path="create" 
          element={<KnowledgeForm />} 
        />
        
        {/* Edit Route: /dashboard/knowledge/edit/:pageId */}
        <Route 
          path="edit/:pageId" 
          element={<KnowledgeForm />} 
        />
      </Routes>
    </div>
  );
};

export default KnowledgeDashboard;