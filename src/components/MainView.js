import React from 'react';
import AzureOAuthCerForm from './AzureOAuthCerForm';
import './MainView.css';

function MainView({ activeForm, isSidebarCollapsed }) {
  const isAzureOAuthForm = activeForm === 'AzureOAuthCerForm';

  return (
    <div className={`main-view ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <header className="main-view-header">
        {isAzureOAuthForm && <h1>Azure OAuth with Signed Certificate</h1>}
        {isAzureOAuthForm && <p>Generate Azure OAuth tokens using a signed certificate and private key</p>}
      </header>
      <div className="main-view-body">
        {isAzureOAuthForm && <AzureOAuthCerForm />}
      </div>
    </div>
  );
}

export default MainView;
