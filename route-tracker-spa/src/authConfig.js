/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * User flows and custom policies for the B2C application
 */
export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_susi',
        forgotPassword: 'B2C_1_reset_v3',
        editProfile: 'B2C_1_edit_profile_v2',
    },
    authorities: {
        signUpSignIn: {
            authority: 'https://routetracker.b2clogin.com/routetracker.onmicrosoft.com/B2C_1_susi',
        },
        forgotPassword: {
            authority: 'https://routetracker.b2clogin.com/routetracker.onmicrosoft.com/B2C_1_reset_v3',
        },
        editProfile: {
            authority: 'https://routetracker.b2clogin.com/routetracker.onmicrosoft.com/b2c_1_edit_profile_v2',
        },
    },
    authorityDomain: 'routetracker.b2clogin.com',
};


/**
 * Configuration object to be passed to MSAL instance on creation.
 */
export const msalConfig = {
    auth: {
        clientId: 'a9620104-0444-4475-ba9d-2b92ec362f84',
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: '/',
        postLogoutRedirectUri: '/',
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

/**
 * Endpoints and scopes when obtaining an access token for protected web APIs. For more information.
 */
export const protectedResources = {
    apiTodoList: {
        endpoint: 'https://localhost:5001/api/hello',
        scopes: {
            read: ['https://routetracker.onmicrosoft.com/tasks-api/tasks.read'],
            write: ['https://routetracker.onmicrosoft.com/tasks-api/tasks.write'],
        },
    },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [...protectedResources.apiTodoList.scopes.read, ...protectedResources.apiTodoList.scopes.write],
};
