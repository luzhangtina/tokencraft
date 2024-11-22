import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ activeForm, setActiveForm, isSidebarCollapsed, setIsSidebarCollapsed }) {
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <i className={`fas ${isSidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
      </button>
      {!isSidebarCollapsed && (
        <>
          <h2>Token Craft</h2>
          <a
            href="#"
            className={activeForm === 'AzureOAuthCerForm' ? 'active' : ''}
            onClick={() => setActiveForm('AzureOAuthCerForm')}
          >
            <i className="fas fa-award"></i> Azure OAuth
          </a>
        </>
      )}
    </div>
  );
}

export default Sidebar;
