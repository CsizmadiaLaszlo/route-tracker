import {AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate} from '@azure/msal-react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {PageLayout} from './components/shared/PageLayout.jsx';
import {Home} from './pages/Home';
import UnauthenticatedAccess from "./components/shared/UnauthenticatedAccess.jsx";
import Settings from "./pages/Settings.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PageLayout/>,
        children: [
            {index: true, element: <Home/>},
            {
                path: "/settings",
                element: <Settings/>,
            },
        ]
    },
]);

const App = ({instance}) => {

    return (
        <MsalProvider instance={instance}>
            <AuthenticatedTemplate>
                <RouterProvider router={router}/>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <UnauthenticatedAccess/>
            </UnauthenticatedTemplate>
        </MsalProvider>
    );
}
export default App;
