import React from 'react';
import Sidebar from './Sidebar';
import ManageProducts from './ManageProducts';
import NewsDashboard from './NewsManagement/NewsDashboard';
import KnowledgeDashboard from './KnowledgePages/KnowledgeDashboard';


const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('manage-product');

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow p-8">
        {activeTab === 'manage-product' && <ManageProducts />}
        {activeTab === 'news' && <NewsDashboard/>}
        {activeTab === 'knowledge' && <KnowledgeDashboard/>}
      </main>
    </div>
  );
};

export default Dashboard;