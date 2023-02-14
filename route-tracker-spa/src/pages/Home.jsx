import {AuthenticatedTemplate, UnauthenticatedTemplate} from '@azure/msal-react';
import {useMsal} from '@azure/msal-react';
import {useEffect} from "react";
import {loginRequest} from "../authConfig.js";
import {themeChange} from 'theme-change'

export const Home = () => {

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])

    return (
        <>
            <center>
                <button className="btn btn-primary" data-set-theme="corporate">
                    Change to corporate
                </button>
                <button className="btn btn-primary" data-set-theme="business">
                    Change to business
                </button>
            </center>
        </>
    );
};