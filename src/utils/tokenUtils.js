import { KJUR, KEYUTIL } from 'jsrsasign';
import {readFileAsBinary, readFileAsText} from './fileUtils'

export default async function generateAzureOAuthTokenWithSignedCertificate(clientId, tenantId, audience, certificateFile, privateKeyFile) {
    const certBytes = await readFileAsBinary(certificateFile);
    const thumbprint = await computeThumbprint(certBytes);
    const privateKey = await readFileAsText(privateKeyFile);
    const clientAssertion = await generateClientAssertion(clientId, tenantId, thumbprint, privateKey);
    const token = await fetchAzureOAuthTokenWithClientAssertion(clientId, tenantId, clientAssertion, audience);
    return token;
}

async function computeThumbprint(certBytes) {
    try {
      const hashBuffer = await crypto.subtle.digest('SHA-1', certBytes);
      const hashArray = new Uint8Array(hashBuffer);
      const base64Thumbprint = btoa(String.fromCharCode(...hashArray))
        .replace(/\+/g, '-') // Replace '+' with '-'
        .replace(/\//g, '_') // Replace '/' with '_'
        .replace(/=+$/, ''); // Remove padding '='
      return base64Thumbprint;
    } catch (error) {
      console.error('Error computing thumbprint:', error);
      throw error;
    }
}

async function generateClientAssertion(clientId, tenantId, thumbprint, privateKey) {
    const header = {
      alg: 'RS256',
      kid: thumbprint,
    };
  
    const payload = {
      aud: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      iss: clientId,
      sub: clientId,
      jti: generateUUID(),
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000) - 100,
    };
  
    const rsaKey = KEYUTIL.getKey(privateKey);
    const signedJWT = KJUR.jws.JWS.sign('RS256', header, payload, rsaKey);
    return signedJWT;
}
  
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
}

async function fetchAzureOAuthTokenWithClientAssertion(clientId, tenantId, clientAssertion, audience) {
    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const params = new URLSearchParams({
      client_id: clientId,
      client_assertion: clientAssertion,
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      grant_type: 'client_credentials',
      scope: `${audience}/.default`,
    });
  
    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
  
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error Response:', errorText);
            throw new Error(`Failed to fetch token: ${response.statusText}`);
        } 
  
        const data = await response.json();
        console.log('Token Response:', data);
        return data.access_token;
    } catch (error) {
        throw new Error(`Failed to fetch token: ${error}`);
    }
}
  