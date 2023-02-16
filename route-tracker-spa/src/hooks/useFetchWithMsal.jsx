import {
    useState,
    useCallback, useEffect,
} from 'react';

import {useMsal} from "@azure/msal-react";
import {loginRequest} from "../authConfig.js";

const useFetchWithMsal = () => {
    const {instance, accounts} = useMsal();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [accessToken, setAccessToken] = useState(null)

    useEffect(() => {
        acquireTokenSilentFromCache();
    })

    const acquireTokenSilentFromCache = () => {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };
        instance.acquireTokenSilent(request).then((response) => {
            setAccessToken(response.accessToken);
        });
    }

    /**
     * Execute a fetch request with the given options
     * @param {string} method: GET, POST, PUT, DELETE
     * @param {String} endpoint: The endpoint to call
     * @param {Object} data: The data to send to the endpoint, if any
     * @returns JSON response
     */
    const execute = async (method, endpoint, data = null) => {

        if (accessToken) {
            try {
                let response = null;

                const headers = new Headers();
                const bearer = `Bearer ${accessToken}`;
                headers.append("Authorization", bearer);

                if (data) headers.append('Content-Type', 'application/json');

                let options = {
                    method: method,
                    headers: headers,
                    body: data ? JSON.stringify(data) : null,
                };

                setIsLoading(true);

                response = await (await fetch(`api/${endpoint}`, options)).json();
                setData(response);

                setIsLoading(false);
                return response;
            } catch (e) {
                setError(e);
                setIsLoading(false);
                throw e;
            }
        }
    };

    return {
        isLoading,
        error,
        data,
        execute: useCallback(execute, [accessToken]), // to avoid infinite calls when inside a `useEffect`
    };
};

export default useFetchWithMsal;