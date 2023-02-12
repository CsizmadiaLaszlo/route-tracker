import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {msalConfig} from "./authConfig.js";
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { BrowserRouter } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import useFetchWithMsal from "./hooks/useFetchWithMsal.jsx";

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
        // console.log("Msal event callback NEW USER-------------------------------------------------------");
        const newUser = event.payload.idTokenClaims.newUser === true
        if (true){
            // useFetchWithMsal("POST", "new-user").then();

            const headers = new Headers();
            const bearer = `Bearer ${event.payload.accessToken}`;
            headers.append("Authorization", bearer);

            let options = {
                method: "POST",
                headers: headers,
                // body: null,
            };

            fetch(`api/new-user`, options).then();
        }
        // console.log(newUser)
        // console.log("Msal event callback NEW USER-------------------------------------------------------");
        // const cache = msalInstance.getTokenCache();
        // console.log(cache)

    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App instance={msalInstance} />
    </React.StrictMode>,
)
