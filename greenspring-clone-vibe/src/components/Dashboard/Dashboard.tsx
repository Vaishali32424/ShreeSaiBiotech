import React from 'react';
import Sidebar from './Sidebar';
import ManageProducts from './ManageProducts';
import NewsDashboard from './NewsManagement/NewsDashboard';
import KnowledgeDashboard from './KnowledgePages/KnowledgeDashboard';
import PhoneNumberList from './PhoneNumberList';


const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('manage-product');

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow p-8">
        {activeTab === 'manage-product' && <ManageProducts />}
        {activeTab === 'news' && <NewsDashboard/>}
        {activeTab === 'knowledge' && <KnowledgeDashboard/>}
        {activeTab === 'number' && <PhoneNumberList/>}
      </main>
    </div>
  );
};

export default Dashboard;