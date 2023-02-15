import {AuthenticatedTemplate, UnauthenticatedTemplate} from '@azure/msal-react';
import {Outlet} from "react-router-dom";
import {NavigationBar} from "./NavigationBar.jsx";
import Container from "./Container.jsx";

export const PageLayout = () => {
    return (
        <Container>
            <NavigationBar/>
            <Outlet/>
        </Container>

    );
};
