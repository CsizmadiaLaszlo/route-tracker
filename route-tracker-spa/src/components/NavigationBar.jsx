import {useMsal} from "@azure/msal-react";
import {Button, Divider, Dropdown, Navbar} from "react-daisyui";
import ThemeSwitch from "./ThemeSwitch.jsx";
import LanguageSwitch from "./LanguageSwitch.jsx";
import {BiMenuAltLeft} from "react-icons/bi";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";


export const NavigationBar = () => {
    const {instance} = useMsal();
    const {t} = useTranslation();
    const navigate = useNavigate();

    const handleLogoutPopup = () => {
        instance.logoutPopup({
            mainWindowRedirectUri: '/', // redirects the top level app after logout
        }).then();
    };

    return (
        <div className="pb-10 flex w-full component-preview items-center justify-center gap-2 font-sans">
            <Navbar className={"shadow-xl rounded-box bg-base-300"}>
                <Navbar.Start>
                    <Dropdown hover>
                        <Button color="ghost" shape="circle" tabIndex={0}>
                            <BiMenuAltLeft/>
                        </Button>
                        <Dropdown.Menu tabIndex={0} className="menu-compact w-52 rounded-box bg-base-300">
                            <Dropdown.Item onClick={() => navigate("/")}>
                                {t('navigationMenu.homepage')}
                            </Dropdown.Item>
                            <Dropdown.Item>
                                {t('navigationMenu.statistics')}
                            </Dropdown.Item>
                            <Divider></Divider>
                            <Dropdown.Item onClick={() => navigate("/settings")}>
                                {t('navigationMenu.settings')}
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleLogoutPopup}>
                                {t('navigationMenu.logout')}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Start>
                <Navbar.Center>
                    <Button onClick={() => navigate("/")} color="ghost" className="normal-case text-xl">
                        Route Tracker
                    </Button>
                </Navbar.Center>
                <Navbar.End className="navbar-end">
                    <LanguageSwitch/>
                    <ThemeSwitch/>
                </Navbar.End>
            </Navbar>
        </div>
    )
}