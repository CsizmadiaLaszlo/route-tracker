import {loginRequest} from "../authConfig.js";

/**
 * Sends an authenticated HTTP request using the fetch API.
 *
 * @async
 * @function fetchWithToken
 *
 * @param {Object} instance - An object representing the MSAL instance.
 * @param {string} method - A string representing the HTTP method of the request (e.g. "GET", "POST", "PUT").
 * @param {string} endpoint - A string representing the endpoint URL to send the request to.
 * @param {Object|null} [data=null] - An object representing the data to send with the request, in JSON format.
 * @param {string|null} [accessToken=null] - A string representing the access token to use for authentication if the MSAL instance can't be accessed.
 *
 * @returns {Promise} A Promise that resolves to the JSON response of the request.
 *
 * @example
 * // Example usage:
 * const response = await fetchWithToken(msalInstance, 'GET', 'users', null, null);
 */

const fetchWithToken = async (instance, method, endpoint, data = null, accessToken = null) => {
    const getAccessTokenSilenty = async () => {
        const request = {
            ...loginRequest,
            account: instance.getActiveAccount()
        };
        return (await instance.acquireTokenSilent(request)).accessToken;
    }

    if (!accessToken) accessToken = await getAccessTokenSilenty();

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);
    if (data) headers.append('Content-Type', 'application/json');

    let options = {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : null,
    };

    return await fetch(`api/${endpoint}`, options).then(r => r.json())
}

export default fetchWithToken;