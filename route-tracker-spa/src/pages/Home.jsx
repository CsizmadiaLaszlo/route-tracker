import {AuthenticatedTemplate, UnauthenticatedTemplate} from '@azure/msal-react';
import {useMsal} from '@azure/msal-react';
import {useEffect} from "react";
import {loginRequest} from "../authConfig.js";
import {themeChange} from 'theme-change'

export const Home = () => {
    const {instance} = useMsal();
    const activeAccount = instance.getActiveAccount();

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

    return (
        <>
            <AuthenticatedTemplate>
                {activeAccount ? (
                    <center>
                        <button className="btn btn-primary" data-set-theme="corporate">
                            Change to corporate
                        </button>
                        <button className="btn btn-primary" data-set-theme="business">
                            Change to business
                        </button>
                    </center>
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