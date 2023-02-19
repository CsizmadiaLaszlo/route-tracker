import React from 'react'
import ReactDOM from 'react-dom';
import App from './App'
import {PublicClientApplication, EventType} from '@azure/msal-browser';
import {msalConfig} from "./authConfig.js";
import './styles/index.css';
import './i18n';
import fetchWithToken from "./utils/fetchWithToken.js";

export const msalInstance = new PublicClientApplication(msalConfig);


// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
        msalInstance.setActiveAccount(event.payload.account);

        const newUser = event.payload.idTokenClaims.newUser === true
        if (newUser) {
            fetchWithToken(msalInstance, "POST", "new-user", null, event.payload.accessToken).then();
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App instance={msalInstance}/>
    </React.StrictMode>,
)
