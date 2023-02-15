import {useTranslation} from 'react-i18next';
import {useMsal} from "@azure/msal-react";
import {Button, Hero} from "react-daisyui";

import {loginRequest} from "../authConfig.js";
import Container from "./Container.jsx";
import {languages} from "../i18n.js";

const UnauthenticatedAccess = () => {
    const {instance} = useMsal()
    const {t, i18n} = useTranslation();

    const handleLoginPopup = () => {
        instance
            .loginPopup({
                ...loginRequest,
                redirectUri: '/',
            })
            .catch((error) => console.log(error));
    };

    const handleLanguageChange = (lng) => {
        i18n.changeLanguage(lng).then()
    }

    return (
        <Container>
            <Hero>
                <Hero.Content className="text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">
                            {t('login.welcome')}
                        </h1>
                        <p className="py-6">
                            {t('login.info')}
                        </p>

                        <Button children={t('login.button')} onClick={handleLoginPopup}/>
                        <div>
                            {Object.keys(languages).map((lng) => (
                                <button key={lng} className={"ml-2"} style={{
                                    fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal'
                                }} type="submit" onClick={() => handleLanguageChange(lng)}>
                                    {languages[lng].nativeName}
                                </button>
                            ))}
                        </div>
                    </div>

                </Hero.Content>
            </Hero>
        </Container>
    )
}

export default UnauthenticatedAccess;