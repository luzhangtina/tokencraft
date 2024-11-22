import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainView from './components/MainView';

function App() {
  const [activeForm, setActiveForm] = useState('AzureOAuthCerForm');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="app">
      <Sidebar 
        activeForm={activeForm} 
        setActiveForm={setActiveForm} 
        isSidebarCollapsed={isSidebarCollapsed} 
        setIsSidebarCollapsed={setIsSidebarCollapsed} 
      />
      <MainView activeForm={activeForm} isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
}

export default App;
