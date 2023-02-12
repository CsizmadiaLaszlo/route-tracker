import {AuthenticatedTemplate, UnauthenticatedTemplate} from '@azure/msal-react';
// import {NavigationBar} from './NavigationBar';
import {Outlet} from "react-router-dom";
// import {Container} from "react-bootstrap";
import {NavigationBar, NavigationBarItem} from "./NavigationBar.jsx";

export const PageLayout = (props) => {
    return (
        <>
            <AuthenticatedTemplate>
                {/*<NavigationBar/>*/}
                <NavigationBar title={"RouteTracker"}>
                    <NavigationBarItem title={"Home"} navTo={"/"}/>
                    <NavigationBarItem/>
                    <NavigationBarItem/>
                </NavigationBar>
                <br/>
                <h5>
                    <center>RouteTracker testing</center>
                </h5>
                {/*<Container>*/}
                {/*    <Outlet/>*/}
                {/*</Container>*/}
                <div>
                    <Outlet/>
                </div>
                {/*<AuthenticatedTemplate>*/}
                {/*    <footer>*/}
                {/*        <center>*/}
                {/*            How did we do?*/}
                {/*            <a*/}
                {/*                href="https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR73pcsbpbxNJuZCMKN0lURpUMlRHSkc5U1NLUkxFNEtVN0dEOTFNQkdTWiQlQCN0PWcu"*/}
                {/*                target="_blank"*/}
                {/*                rel="noreferrer"*/}
                {/*            >*/}
                {/*                {' '}*/}
                {/*                Share your experience!*/}
                {/*            </a>*/}
                {/*        </center>*/}
                {/*    </footer>*/}
                {/*</AuthenticatedTemplate>*/}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Outlet/>
            </UnauthenticatedTemplate>
        </>

    );
};
