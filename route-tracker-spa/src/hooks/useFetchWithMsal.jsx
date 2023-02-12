import {
    useEffect,
    useState,
} from 'react';

import {useMsal} from "@azure/msal-react";
import {loginRequest} from "../authConfig.js";

const useFetchWithMsal = async (method, endpoint, data = null) => {
    const {instance, accounts} = useMsal();
    const [accessToken, setAccessToken] = useState(null);


    useEffect(() => {
        acquireTokenSilentFromCache()
        // 👆 false parameter is required for react project
    }, [])

    /**
     * Silently acquires an access token
     * */
    const acquireTokenSilentFromCache = () => {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };
        instance.acquireTokenSilent(request).then((response) => {
            setAccessToken(response.accessToken);
        });
    }

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append("Authorization", bearer);

    let options = {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : null,
    };

    return await fetch(`api/${endpoint}`, options).then(r => r.json());


    // const execute = async (method, endpoint, data = null) => {
    //     if (msalError) {
    //         setError(msalError);
    //         return;
    //     }
    //
    //     if (result) {
    //         try {
    //             let response = null;
    //
    //             const headers = new Headers();
    //             const bearer = `Bearer ${result.accessToken}`;
    //             headers.append("Authorization", bearer);
    //
    //             if (data) headers.append('Content-Type', 'application/json');
    //
    //             let options = {
    //                 method: method,
    //                 headers: headers,
    //                 body: data ? JSON.stringify(data) : null,
    //             };
    //
    //             setIsLoading(true);
    //
    //             response = await (await fetch(endpoint, options)).json();
    //             setData(response);
    //
    //             setIsLoading(false);
    //             return response;
    //         } catch (e) {
    //             setError(e);
    //             setIsLoading(false);
    //             throw e;
    //         }
    //     }
    // };
    //
    // return {
    //     isLoading,
    //     error,
    //     data,
    //     execute: useCallback(execute, [result, msalError]), // to avoid infinite calls when inside a `useEffect`
    // };
};

export default useFetchWithMsal;