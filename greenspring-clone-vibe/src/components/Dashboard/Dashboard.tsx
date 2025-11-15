import React from 'react';
import Sidebar from './Sidebar';
import ManageProducts from './ManageProducts';


const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('manage-product');

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow p-8">
        {activeTab === 'manage-product' && <ManageProducts />}
        {activeTab === 'news' && <div>News Management</div>}
        {activeTab === 'knowledge' && <div>Knowledge Pages Management</div>}
      </main>
    </div>
  );
};

export default Dashboard;