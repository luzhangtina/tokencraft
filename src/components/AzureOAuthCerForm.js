import React, { useState } from 'react';
import generateAzureOAuthTokenWithSignedCertificate from '../utils/tokenUtils';
import './FormStyle.css';

function AzureOAuthCerForm() {
  const [certificateFileName, setCertificateFileName] = useState('No file selected');
  const [privateKeyFileName, setPrivateKeyFileName] = useState('No file selected');
  const [generatedToken, setGeneratedToken] = useState('');

  const handleFileSelect = (e, setFileName) => {
    setFileName(e.target.files[0]?.name || 'No file selected');
  };

  const generateToken = async () => {
    const clientId = document.getElementById('client-id').value;
    const tenantId = document.getElementById('tenant-id').value;
    const audience = document.getElementById('audience-id').value;
    const certificateFile = document.getElementById('certificate-file').files[0];
    const privateKeyFile = document.getElementById('private-key-file').files[0];

    if (!clientId || !tenantId || !audience || !certificateFile || !privateKeyFile) {
      alert('Please fill in all fields and upload required files.');
      return;
    }
    try {
      const token = await generateAzureOAuthTokenWithSignedCertificate(clientId, tenantId, audience, certificateFile, privateKeyFile);
      setGeneratedToken(token);
    } catch (error) {
      alert('Failed to generate token!');
      return;
    }
  };

  return (
    <div id="form-azure-oauth-cer">
      <div className="form-group">
        <label htmlFor="client-id">Client ID</label>
        <input type="text" id="client-id" placeholder="Enter Client ID" required />
      </div>
      <div className="form-group">
        <label htmlFor="tenant-id">Tenant ID</label>
        <input type="text" id="tenant-id" placeholder="Enter Tenant ID" required />
      </div>
      <div className="form-group">
        <label htmlFor="audience-id">Audience ID</label>
        <input type="text" id="audience-id" placeholder="Enter Audience ID" required />
      </div>
      <div className="form-group">
        <label htmlFor="certificate">Certificate</label>
        <div className="file-input-wrapper">
          <label htmlFor="certificate-file">Select Certificate</label>
          <input
            type="file"
            id="certificate-file"
            accept=".cer"
            required
            onChange={(e) => handleFileSelect(e, setCertificateFileName)}
          />
          <span className="file-name">{certificateFileName}</span>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="private-key">Private Key</label>
        <div className="file-input-wrapper">
          <label htmlFor="private-key-file">Select Private Key</label>
          <input
            type="file"
            id="private-key-file"
            accept=".key"
            required
            onChange={(e) => handleFileSelect(e, setPrivateKeyFileName)}
          />
          <span className="file-name">{privateKeyFileName}</span>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="generated-token-azure-ad-oauth-signed-cer">Generated Token</label>
        <textarea id="generated-token-azure-ad-oauth-signed-cer" rows="4" readOnly value={generatedToken}></textarea>
      </div>
      <div className="form-group">
        <button onClick={generateToken} id="generate-azure-ad-oauth-signed-cer">
          Generate Token
        </button>
      </div>
    </div>
  );
}

export default AzureOAuthCerForm;
