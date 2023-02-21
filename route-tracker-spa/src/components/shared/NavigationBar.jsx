import {useMsal} from "@azure/msal-react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {Button, Divider, Dropdown, Navbar} from "react-daisyui";
import {BiMenuAltLeft} from "react-icons/bi";
import LanguageSwitch from "./LanguageSwitch.jsx";
import ThemeSwitch from "./ThemeSwitch.jsx";


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
        <div className="pb-2 flex w-full component-preview items-center justify-center gap-1 font-sans">
            <Navbar className={"shadow-xl rounded-box bg-base-300"}>
                <Navbar.Start>
                    <Dropdown hover>
                        <Button color="ghost" shape="circle" tabIndex={0}>
                            <BiMenuAltLeft/>
                        </Button>
                        <Dropdown.Menu tabIndex={0} className="menu-compact w-52 rounded-box bg-base-300">
                            <Dropdown.Item className="hover-bordered" onClick={() => navigate("/")}>
                                {t('navigationMenu.homepage')}
                            </Dropdown.Item>
                            <Dropdown.Item className="hover-bordered">
                                {t('navigationMenu.statistics')}
                            </Dropdown.Item>
                            <Divider></Divider>
                            <Dropdown.Item className="hover-bordered" onClick={() => navigate("/settings")}>
                                {t('navigationMenu.settings')}
                            </Dropdown.Item>
                            <Dropdown.Item className="hover-bordered" onClick={handleLogoutPopup}>
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