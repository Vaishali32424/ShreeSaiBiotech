import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'manage-product', label: 'Products' },
    { id: 'news', label: 'News' },
    { id: 'knowledge', label: 'Knowledge' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-4">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === item.id ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;