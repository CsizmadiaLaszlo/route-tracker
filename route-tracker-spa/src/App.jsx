import {MsalProvider} from '@azure/msal-react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {PageLayout} from './components/PageLayout';
import {Home} from './pages/Home';

const router = createBrowserRouter([
    {
        path: "/",
        element: <PageLayout/>,
        children: [
            {index: true, element: <Home/>}
        ]
    },
]);

const App = ({instance}) => {

    return (
        <MsalProvider instance={instance}>
            <RouterProvider router={router}/>
        </MsalProvider>
    );
}
export default App;
