import {AuthenticatedTemplate, UnauthenticatedTemplate} from '@azure/msal-react';
import {Outlet} from "react-router-dom";
import {NavigationBar} from "./NavigationBar.jsx";

export const PageLayout = () => {
    return (
        <>
            <AuthenticatedTemplate>
                <NavigationBar/>
                <br/>
                <h5>
                    <center>RouteTracker testing</center>
                </h5>
                <div>
                    <Outlet/>
                </div>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Outlet/>
            </UnauthenticatedTemplate>
        </>

    );
};
