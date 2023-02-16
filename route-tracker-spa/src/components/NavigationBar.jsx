import {useMsal} from "@azure/msal-react";
import {Button, Divider, Dropdown, Navbar} from "react-daisyui";
import ThemeSwitch from "./ThemeSwitch.jsx";
import LanguageSwitch from "./LanguageSwitch.jsx";
import {BiMenuAltLeft} from "react-icons/bi";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";


export const NavigationBar = () => {
    const {instance} = useMsal();
    const {t} = useTranslation();

    const handleLogoutPopup = () => {
        instance.logoutPopup({
            mainWindowRedirectUri: '/', // redirects the top level app after logout
        }).then();
    };

    return (
        <div className="pb-10 flex w-full component-preview items-center justify-center gap-2 font-sans">
            <Navbar className={"shadow-xl rounded-box bg-base-300"}>
                <Navbar.Start>
                    <Dropdown  hover>
                        <Button color="ghost" shape="circle" tabIndex={0}>
                            <BiMenuAltLeft/>
                        </Button>
                        <Dropdown.Menu tabIndex={0} className="menu-compact w-52 rounded-box bg-base-300">
                            <Link to={`/`}>
                                <Dropdown.Item>{t('navigationMenu.homepage')}</Dropdown.Item>
                            </Link>
                            <Dropdown.Item>{t('navigationMenu.statistics')}</Dropdown.Item>
                            <Divider></Divider>
                            <Link to={`/settings`}>
                                <Dropdown.Item>{t('navigationMenu.settings')}</Dropdown.Item>
                            </Link>
                            <Dropdown.Item onClick={handleLogoutPopup}>{t('navigationMenu.logout')}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Start>
                <Navbar.Center>
                    <Link to={`/`}>
                        <Button color="ghost" className="normal-case text-xl">
                            Route Tracker
                        </Button>
                    </Link>

                </Navbar.Center>
                <Navbar.End className="navbar-end">
                    <LanguageSwitch/>
                    <ThemeSwitch/>
                </Navbar.End>
            </Navbar>
        </div>
    )
}