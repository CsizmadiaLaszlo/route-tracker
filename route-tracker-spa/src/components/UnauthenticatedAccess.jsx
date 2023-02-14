import {loginRequest} from "../authConfig.js";
import {useMsal} from "@azure/msal-react";
import {Button, Hero} from "react-daisyui";
import Container from "./Container.jsx";

const UnauthenticatedAccess = () => {
    const { instance } = useMsal()

    const handleLoginPopup = () => {
        instance
            .loginPopup({
                ...loginRequest,
                redirectUri: '/',
            })
            .catch((error) => console.log(error));
    };

    return (
        <Container>
            <Hero>
                <Hero.Content>
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">
                        You must login in order to use the website.
                    </p>
                    <Button children={"Login"} shape={"circle"} onClick={handleLoginPopup}/>
                </Hero.Content>
            </Hero>
        </Container>
    )
}

export default UnauthenticatedAccess;