import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App'
import {PublicClientApplication} from '@azure/msal-browser';
import {msalConfig} from "./authConfig.js";
import './styles/index.css';
import './i18n';
import msalSetup from "./msal.js";

export const msalInstance = new PublicClientApplication(msalConfig);
msalSetup(msalInstance);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App instance={msalInstance}/>
    </React.StrictMode>,
)
