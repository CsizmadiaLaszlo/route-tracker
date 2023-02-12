import {AuthenticatedTemplate, UnauthenticatedTemplate} from '@azure/msal-react';
import {useMsal} from '@azure/msal-react';
// import {Button, Container, Dropdown} from 'react-bootstrap';
import {useEffect, useState} from "react";
import {authorizedApiCall, normalApiCall} from "../apiCalls.js";
import {loginRequest} from "../authConfig.js";
import { themeChange } from 'theme-change'

/***
 * Component to detail ID token claims with a description for each claim. For more details on ID token claims, please check the following links:
 * ID token Claims: https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens#claims-in-an-id-token
 * Optional Claims:  https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-optional-claims#v10-and-v20-optional-claims-set
 */
export const Home = () => {
    const {instance, accounts, inProgress} = useMsal();
    const activeAccount = instance.getActiveAccount();
    const [normal, setNormal] = useState(null);
    const [authorized, setAuthorized] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    function RequestAccessToken() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };
        instance.acqu
        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            setAccessToken(response.accessToken);
            console.log("--------------------------accessToken-----------------------------------");
            console.log(response);
            console.log("--------------------------accessToken-----------------------------------");
        });
    }

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])

    const handleLoginPopup = () => {
        instance
            .loginPopup({
                ...loginRequest,
                redirectUri: '/',
            })
            .catch((error) => console.log(error));
    };

    // useEffect(() => {
    //     normalApiCall().then(setNormal);
    // }, [])
    //
    // useEffect(() => {
    //     authorizedApiCall(accessToken).then(setAuthorized);
    // }, [accessToken])



    return (
        <>
            <AuthenticatedTemplate>
                {activeAccount ? (
                    <>
                        {/*<center>*/}
                        {/*    <h1>Public call</h1>*/}
                        {/*    <h2>Response: {normal}</h2>*/}
                        {/*</center>*/}
                        {/*<center>*/}
                        {/*    <h1>Secure call</h1>*/}
                        {/*    <h2>Response: {authorized}</h2>*/}
                        {/*</center>*/}
                        <>
                            {accessToken ?
                                <center>
                                    <p>Access Token Acquired!</p>
                                    <p>{accessToken}</p>
                                </center>
                                :
                                <center>
                                    <button className="btn btn-primary" onClick={RequestAccessToken}>
                                        Request Access Token
                                    </button>

                                </center>
                            }
                            <button className="btn btn-primary" data-set-theme="dark" >
                                Change to dark
                            </button>
                            <button className="btn btn-primary" data-set-theme="light" >
                                Change to light
                            </button>
                            <button className="btn btn-primary" data-set-theme="dark" data-act-class="ACTIVECLASS"></button>
                            <button className="btn btn-primary" data-set-theme="light" data-act-class="ACTIVECLASS"></button>
                        </>
                    </>
                ) : null}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <>
                    <center>
                        <h1>You need to login first</h1>
                        <button className="btn btn-primary" onClick={handleLoginPopup}>
                            Login
                        </button>
                    </center>
                </>
            </UnauthenticatedTemplate>
        </>
    );
};