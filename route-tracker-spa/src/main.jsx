import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {PublicClientApplication, EventType} from '@azure/msal-browser';

import './styles/index.css';
import {msalConfig} from "./authConfig.js";
import {registerNewUser} from "./utils/apiCalls.js";
import './i18n';

export const msalInstance = new PublicClientApplication(msalConfig);


// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
    if (
        (event.eventType === EventType.LOGIN_SUCCESS ||
            event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
            event.eventType === EventType.SSO_SILENT_SUCCESS) &&
        event.payload.account
    ) {
        msalInstance.setActiveAccount(event.payload.account);

        const newUser = event.payload.idTokenClaims.newUser === true
        if (newUser) {
            registerNewUser(event.payload.accessToken).then();
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App instance={msalInstance}/>
    </React.StrictMode>,
)
