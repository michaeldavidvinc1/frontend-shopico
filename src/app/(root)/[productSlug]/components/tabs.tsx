"use client";

import React, { useState } from 'react';
import Reviews from './review';

interface TabData {
  id: string;
  label: string;
  component: React.ReactNode; // Diubah dari React.ComponentType<any> menjadi React.ReactNode
}

interface TabsProps {
  tabs: TabData[];
  defaultActiveTab?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultActiveTab || tabs[0].id);

  return (
    <div className="w-full mt-8">
      <div className="">
        <nav className="flex -mb-px justify-center items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-6 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
              }`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab === tab.id ? 'block' : 'hidden'}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
          >
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
};

// Contoh penggunaan
const TabsExample: React.FC = () => {
  const exampleTabs: TabData[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      component: <Reviews />
    },
    {
      id: 'users',
      label: 'Pengguna',
      component: <Reviews />
    },
  ];

  return <Tabs tabs={exampleTabs} defaultActiveTab="dashboard" />;
};

export default TabsExample;